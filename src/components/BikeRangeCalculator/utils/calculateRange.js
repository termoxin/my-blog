import { mapWindDirectionToAngle } from "./mapWindDirectionToAngle";

const BATTERY_VOLTAGE = 48; // Typical e-bike voltage in volts
const BIKE_ROLLING_RESISTANCE = 0.006; // Coefficient for bike tires
const TRAILER_ROLLING_RESISTANCE = 0.008; // Slightly higher for smaller trailer wheels
const G = 9.81; // Gravity in m/s^2
const AIR_DENSITY = 1.225; // kg/m^3
const DRAG_COEFFICIENT = 0.9;
const FRONTAL_AREA = 0.6; // m^2
const CHARGER_AMPS = 5; // Charger amperage
const CHARGER_RATE = CHARGER_AMPS * BATTERY_VOLTAGE; // Charging rate in Watts

export const calculateBikeRange = (
    batteryCapacity,
    distances,
    elevations,
    speed,
    bikeWeight,
    riderWeight,
    startTime,
    windData,
    movementAngles,
    trailerData = {}
) => {
    const batteryCapacityWh = batteryCapacity * BATTERY_VOLTAGE; // Convert Ah to Wh
    if (!distances.length || !elevations.length) return;

    const {
        weight: trailerWeight = 0,
        dogWeight = 0,
        length = 0,
        width = 0,
        height = 0,
    } = trailerData;

    const totalWeight = bikeWeight + riderWeight + trailerWeight + dogWeight;
    const trailerFrontalArea = length * height; // Simplified calculation for trailer frontal area
    const trailerWheelLoad = (trailerWeight + dogWeight) / 2; // Per wheel load for trailer

    let totalConsumption = 0;
    let segmentsConsumption = [];

    distances.forEach((distance, i) => {
        if (i === 0) return;

        const distanceSegment = (distances[i] - distances[i - 1]) * 1000; // Segment length in meters
        const elevationChange = elevations[i] - elevations[i - 1]; // Elevation change in meters
        const speedMetersPerSec = speed / 3.6;

        const segmentTime = calculateSegmentTime(startTime, distances, i, speed); // Calculate time for the segment
        const wind = getWindDataForTime(segmentTime, windData); // Match wind data to segment time

        const windSpeedKmh = wind.speed; // Wind speed in km/h
        const windDirection = wind.direction; // Wind direction
        const movementAngle = movementAngles[i] || 0; // Angle of movement for the segment
        const relativeWindSpeedKmh = calculateEffectiveWindSpeed(
            windSpeedKmh,
            windDirection,
            movementAngle
        );
        const adjustedSpeed = (speed + relativeWindSpeedKmh) / 3.6; // Convert to m/s

        // Adjust rolling resistance for bike and trailer
        const bikeRollingPower = BIKE_ROLLING_RESISTANCE * (bikeWeight + riderWeight) * G * speedMetersPerSec;
        const trailerRollingPower = TRAILER_ROLLING_RESISTANCE * trailerWheelLoad * 2 * G * speedMetersPerSec; // Two wheels

        // Adjust drag power to include trailer frontal area
        const adjustedFrontalArea = FRONTAL_AREA + trailerFrontalArea;
        const dragPower =
            0.5 * AIR_DENSITY * DRAG_COEFFICIENT * adjustedFrontalArea * adjustedSpeed ** 3;

        // Elevation power remains the same, based on total weight
        const elevationPower =
            elevationChange > 0
                ? (elevationChange * totalWeight * G) / (distanceSegment / speedMetersPerSec)
                : 0;

        const segmentPower = bikeRollingPower + trailerRollingPower + dragPower + elevationPower;
        const segmentConsumption = (segmentPower * (distanceSegment / speedMetersPerSec)) / 3600; // Convert to Wh

        segmentsConsumption.push({
            km: distance.toFixed(2),
            power: segmentPower.toFixed(2),
            slope: ((elevationChange / distanceSegment) * 100).toFixed(2),
            wind: wind.direction,
            windSpeed: wind.speed,
            movementAngle, // Add movement angle to the output
        });

        totalConsumption += segmentConsumption;
    });

    const averageConsumption = totalConsumption / distances[distances.length - 1]; // Wh/km
    const estimatedRange = batteryCapacityWh / averageConsumption; // km

    const chargePoint = distances.find((distance) => distance > estimatedRange) || null;
    const chargeWarning = chargePoint !== null;

    let remainingEnergy = 0;
    let chargeTimeRequired = 0;

    if (chargeWarning) {
        remainingEnergy = Math.max(totalConsumption - batteryCapacityWh, 0);
        chargeTimeRequired = remainingEnergy / CHARGER_RATE;
    }

    const finishTime = calculateFinishTime(startTime, distances, speed);

    const MAX_CHARGE_TIME = batteryCapacity / CHARGER_AMPS; 

    return {
        segmentsConsumption,
        averageConsumption: averageConsumption.toFixed(2),
        estimatedRange: estimatedRange.toFixed(2),
        finishTime,
        chargeWarning: chargeWarning
            ? {
                  chargeKm: chargePoint ? chargePoint.toFixed(2) : null,
                  chargeTime: Math.min(chargeTimeRequired, MAX_CHARGE_TIME).toFixed(2),
              }
            : null,
    };
};

const calculateEffectiveWindSpeed = (windSpeed, windDirection, movementAngle) => {
    const windAngle = mapWindDirectionToAngle(windDirection);
    const relativeAngle = Math.abs(windAngle - movementAngle); // Adjust wind based on movement direction
    let effectiveWindSpeed = windSpeed * Math.cos((relativeAngle * Math.PI) / 180); // Adjust wind speed

    if (effectiveWindSpeed > 0) {
        effectiveWindSpeed = -effectiveWindSpeed;
    } else if (effectiveWindSpeed < 0) {
        effectiveWindSpeed = Math.abs(effectiveWindSpeed);
    }

    return effectiveWindSpeed;
};

// Utility: Get wind data for a specific time
const getWindDataForTime = (segmentTime, windData) => {
    const [segmentHour] = segmentTime.split(':').map(Number);
    return windData.reduce((closest, wind) => {
        const [windHour] = wind.time.split(':').map(Number);
        return Math.abs(windHour - segmentHour) < Math.abs(closest.time - segmentHour) ? wind : closest;
    }, windData[0]);
};

// Utility: Calculate segment time
const calculateSegmentTime = (startTime, distances, segmentIndex, speed) => {
    const elapsedTime = distances.slice(1, segmentIndex + 1).reduce((time, distance) => {
        return time + distance / speed;
    }, 0); // Total elapsed time in hours
    const [hours, minutes] = startTime.split(':').map(Number);
    const segmentTime = new Date();
    segmentTime.setHours(hours);
    segmentTime.setMinutes(minutes + elapsedTime * 60);
    return `${segmentTime.getHours()}:${segmentTime.getMinutes()}`;
};

// Utility: Calculate finish time
const calculateFinishTime = (startTime, distances, speed) => {
    if (!startTime) return '-';
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalRideTime = distances[distances.length - 1] / speed; // Hours

    const finishDate = new Date();
    finishDate.setHours(hours);
    finishDate.setMinutes(minutes + totalRideTime * 60);

    let finishHours = finishDate.getHours();
    const finishMinutes = finishDate.getMinutes();
    const period = finishHours >= 12 ? 'PM' : 'AM';

    if (finishHours > 12) finishHours -= 12;
    if (finishHours === 0) finishHours = 12;

    return `${finishHours.toString().padStart(2, '0')}:${finishMinutes
        .toString()
        .padStart(2, '0')} ${period}`;
};
