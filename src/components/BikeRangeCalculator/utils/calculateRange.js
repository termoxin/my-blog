const BATTERY_VOLTAGE = 48; // Typical e-bike voltage in volts
const BASE_ROLLING_RESISTANCE = 0.006; // Default rolling resistance
const GRAVITY = 9.81; // Gravity in m/s^2
const AIR_DENSITY = 1.225; // kg/m^3
const DRAG_COEFFICIENT = 0.9;
const FRONTAL_AREA = 0.6; // m^2
const CHARGER_AMPS = 5; // Charger amperage
const CHARGER_RATE = CHARGER_AMPS * BATTERY_VOLTAGE; // Charging rate in Watts

// Rolling resistance adjustments based on tire types and pressures
const TIRE_TYPE_ROLLING_RESISTANCE = {
    road: 0.004,
    hybrid: 0.005,
    mountain: 0.008,
};

const PRESSURE_ADJUSTMENT = (pressure) => {
    if (pressure >= 5) return -0.001; // Higher pressure reduces rolling resistance
    if (pressure <= 2) return 0.002; // Lower pressure increases rolling resistance
    return 0; // Neutral adjustment for moderate pressure
};

export const calculateBikeRange = (
    batteryCapacity,
    distances,
    elevations,
    speed,
    windSpeed,
    bikeWeight,
    riderWeight,
    startTime,
    tireType = "hybrid", // Default to hybrid tires
    tirePressure = 3 // Default to 3 bars
) => () => {
    const batteryCapacityWh = batteryCapacity * BATTERY_VOLTAGE; // Convert Ah to Wh

    if (!distances.length || !elevations.length) return;

    let totalConsumption = 0; // Wh

    // Calculate adjusted rolling resistance based on tire type and pressure
    const rollingResistance =
        TIRE_TYPE_ROLLING_RESISTANCE[tireType] +
        PRESSURE_ADJUSTMENT(tirePressure);

    distances.forEach((distance, i) => {
        if (i === 0) return;

        const distanceSegment = (distances[i] - distances[i - 1]) * 1000; // Segment length in meters
        const elevationChange = elevations[i] - elevations[i - 1]; // Elevation change in meters
        const speedMetersPerSec = speed / 3.6;
        const adjustedSpeed = (speed + windSpeed * 3.6) / 3.6;

        const rollingPower = rollingResistance * (bikeWeight + riderWeight) * GRAVITY * speedMetersPerSec;
        const dragPower = 0.5 * AIR_DENSITY * DRAG_COEFFICIENT * FRONTAL_AREA * adjustedSpeed ** 3;
        const elevationPower = elevationChange > 0
            ? (elevationChange * (bikeWeight + riderWeight) * GRAVITY) / (distanceSegment / speedMetersPerSec)
            : 0; // No power for descents (or add recovery here if needed)

        const segmentPower = rollingPower + dragPower + elevationPower;
        const segmentConsumption = (segmentPower * (distanceSegment / speedMetersPerSec)) / 3600; // Convert to Wh

        totalConsumption += segmentConsumption;
    });

    const averageConsumption = totalConsumption / distances[distances.length - 1]; // Wh/km
    const estimatedRange = batteryCapacityWh / averageConsumption; // km

    // Calculate when charging is needed
    const chargePoint = distances.find(distance => distance > estimatedRange) || null;
    const chargeWarning = chargePoint !== null;

    let remainingEnergy = 0;
    let chargeTimeRequired = 0;

    if (chargeWarning) {
        // Remaining energy needed beyond the estimated range
        remainingEnergy = Math.max(totalConsumption - batteryCapacityWh, 0);

        // Charging time (hours)
        chargeTimeRequired = remainingEnergy / CHARGER_RATE;
    }

    const finishTime = calculateFinishTime(startTime, distances, speed);

    return {
        averageConsumption: averageConsumption.toFixed(2),
        estimatedRange: estimatedRange.toFixed(2),
        finishTime,
        chargeWarning: chargeWarning
            ? {
                    chargeKm: chargePoint ? chargePoint.toFixed(2) : null,
                    chargeTime: chargeTimeRequired.toFixed(2),
                }
            : null,
    };
};

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
