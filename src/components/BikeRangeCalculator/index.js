import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 60rem;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #4a5568;
    background-color: #f7fafc;
    transition: border-color 0.2s;

    &:focus {
        border-color: #3182ce;
        outline: none;
    }

    &::file-selector-button {
        border: 1px solid #cbd5e0;
        border-radius: 0.375rem;
        padding: 0.5rem;
        margin-right: 1rem;
        background-color: #edf2f7;
        color: #4a5568;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e2e8f0;
        }
    }
`;

const Slider = styled.input`
    width: 100%;
    margin-bottom: 1rem;
`;

const Results = styled.div`
    color: #4a5568;
`;

const Warning = styled.div`
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
`;

const Notice = styled.div`
    background-color: #e2e8f0;
    border: 1px solid #cbd5e0;
    color: #2d3748;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
`;

const EBikeRangeCalculator = () => {
    const [speed, setSpeed] = useState(20);
    const [windSpeed, setWindSpeed] = useState(0);
    const [bikeWeight, setBikeWeight] = useState(28);
    const [riderWeight, setRiderWeight] = useState(65);
    const [startTime, setStartTime] = useState('');
    const [gpxData, setGpxData] = useState(null);
    const [distances, setDistances] = useState([]);
    const [elevations, setElevations] = useState([]);
    const [batteryCapacity, setBatteryCapacity] = useState(25); // Battery capacity in Ah
    const [results, setResults] = useState({
        totalDistance: '-',
        elevationGain: '-',
        averageConsumption: '-',
        estimatedRange: '-',
        finishTime: '-',
        chargeWarning: null,
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => parseGPX(e.target.result);
            reader.readAsText(file);
        }
    };

    const parseGPX = (gpxString) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(gpxString, 'application/xml');
        const points = xml.getElementsByTagName('trkpt');

        const newDistances = [];
        const newElevations = [];
        let totalDistance = 0;

        const haversine = (lat1, lon1, lat2, lon2) => {
            const R = 6371e3; // Earth radius in meters
            const toRad = (deg) => (deg * Math.PI) / 180;
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
            return 2 * R * Math.asin(Math.sqrt(a));
        };

        let prevLat = null;
        let prevLon = null;

        for (let point of points) {
            const lat = parseFloat(point.getAttribute('lat'));
            const lon = parseFloat(point.getAttribute('lon'));
            const ele = parseFloat(point.getElementsByTagName('ele')[0].textContent);

            newElevations.push(ele);

            if (prevLat !== null && prevLon !== null) {
                const dist = haversine(prevLat, prevLon, lat, lon);
                totalDistance += dist;
                newDistances.push(totalDistance / 1000); // Convert to km
            } else {
                newDistances.push(0);
            }

            prevLat = lat;
            prevLon = lon;
        }

        const elevationGain = newElevations.reduce((acc, curr, idx, arr) => {
            if (idx > 0 && curr > arr[idx - 1]) {
                return acc + (curr - arr[idx - 1]);
            }
            return acc;
        }, 0);

        setDistances(newDistances);
        setElevations(newElevations);
        setResults((prev) => ({
            ...prev,
            totalDistance: (totalDistance / 1000).toFixed(2),
            elevationGain: elevationGain.toFixed(2),
        }));
    };

    const calculateRange = () => {
        const batteryVoltage = 48; // Typical e-bike voltage in volts
        const batteryCapacityWh = batteryCapacity * batteryVoltage; // Convert Ah to Wh
        const rollingResistance = 0.006;
        const g = 9.81; // Gravity in m/s^2
        const airDensity = 1.225; // kg/m^3
        const dragCoefficient = 0.9;
        const frontalArea = 0.6; // m^2
        const chargerAmps = 5; // Charger amperage
        const chargerRate = chargerAmps * batteryVoltage; // Charging rate in Watts

        if (!distances.length || !elevations.length) return;

        let totalConsumption = 0; // Wh

        for (let i = 1; i < distances.length; i++) {
            const distanceSegment = (distances[i] - distances[i - 1]) * 1000; // Segment length in meters
            const elevationChange = elevations[i] - elevations[i - 1]; // Elevation change in meters
            const speedMetersPerSec = speed / 3.6;
            const adjustedSpeed = (speed + windSpeed * 3.6) / 3.6;

            const rollingPower = rollingResistance * (bikeWeight + riderWeight) * g * speedMetersPerSec;
            const dragPower = 0.5 * airDensity * dragCoefficient * frontalArea * adjustedSpeed ** 3;
            const elevationPower =
                elevationChange > 0
                    ? (elevationChange * (bikeWeight + riderWeight) * g) / (distanceSegment / speedMetersPerSec)
                    : 0; // No power for descents (or add recovery here if needed)

            const segmentPower = rollingPower + dragPower + elevationPower;
            const segmentConsumption = (segmentPower * (distanceSegment / speedMetersPerSec)) / 3600; // Convert to Wh

            totalConsumption += segmentConsumption;
        }

        const averageConsumption = totalConsumption / distances[distances.length - 1]; // Wh/km
        const estimatedRange = batteryCapacityWh / averageConsumption; // km

        const chargeWarning = estimatedRange < distances[distances.length - 1];
        const remainingEnergy = (distances[distances.length - 1] - estimatedRange) * averageConsumption;
        const chargeTimeRequired = remainingEnergy / chargerRate; // in hours

        const finishTime = calculateFinishTime();

        setResults(prev => ({
            totalDistance: prev.totalDistance,
            elevationGain: prev.elevationGain,
            averageConsumption: averageConsumption.toFixed(2),
            estimatedRange: estimatedRange.toFixed(2),
            finishTime,
            chargeWarning: chargeWarning
                ? {
                        chargeKm: distances[distances.length - 1].toFixed(2),
                        chargeTime: chargeTimeRequired.toFixed(2),
                    }
                : null,
        }));
    };

    const calculateFinishTime = () => {
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

    useEffect(() => {
        calculateRange();
    }, [speed, windSpeed, bikeWeight, riderWeight, distances, elevations, startTime, batteryCapacity]);

    return (
        <Container>
            <Card>
                <Notice>
                    You can create a GPX file for your route <a href="https://www.justgoride.co.uk/routes/create" target="_blank" rel="noopener noreferrer">here</a> 📄.
                </Notice>
                
                <div style={{ display: 'flex', gap: '40px' }}>
                    <div>
                        <Label htmlFor="gpx-upload">📂 Upload GPX File:</Label>
                        <Input type="file" id="gpx-upload" accept=".gpx" onChange={handleFileUpload} />

                        <Label htmlFor="speed-slider">
                            🚴‍♂️ Speed: <span>{speed}</span> km/h
                        </Label>
                        <Slider
                            id="speed-slider"
                            type="range"
                            min="10"
                            max="50"
                            step="1"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />

                        <Label htmlFor="wind-slider">
                            🌬️ Wind Speed: <span>{windSpeed}</span> m/s
                        </Label>
                        <Slider
                            id="wind-slider"
                            type="range"
                            min="-10"
                            max="10"
                            step="1"
                            value={windSpeed}
                            onChange={(e) => setWindSpeed(Number(e.target.value))}
                        />

                        <Label htmlFor="bike-weight">🚲 Bike Weight (kg):</Label>
                        <Input
                            type="number"
                            id="bike-weight"
                            value={bikeWeight}
                            onChange={(e) => setBikeWeight(Number(e.target.value))}
                        />

                        <Label htmlFor="rider-weight">🏋️ Rider Weight (kg):</Label>
                        <Input
                            type="number"
                            id="rider-weight"
                            value={riderWeight}
                            onChange={(e) => setRiderWeight(Number(e.target.value))}
                        />

                        <Label htmlFor="start-time">⏰ Start Ride Time:</Label>
                        <Input
                            type="time"
                            id="start-time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />

                        <Label htmlFor="battery-capacity">🔋 Battery Capacity (Ah):</Label>
                        <Input
                            type="number"
                            id="battery-capacity"
                            value={batteryCapacity}
                            onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                        />
                    </div>

                    <Results>
                        <p>📏 Total Distance: {results.totalDistance} km</p>
                        <p>🏔️ Total Elevation Gain: {results.elevationGain} m</p>
                        <p>🔋 Average Consumption: {results.averageConsumption} Wh/km</p>
                        <p>🛣️ Estimated Range: {results.estimatedRange} km</p>
                        <p>⌛ Expected Finish Time: {results.finishTime}</p>
                        {results.chargeWarning && (
                            <Warning>
                                <p><strong>⚠️ Warning:</strong></p>
                                <p>
                                    You will need to charge at {results.chargeWarning.chargeKm} km to complete the route.
                                </p>
                                <p>
                                    Estimated charging time: {results.chargeWarning.chargeTime} hours with a 5A charger.
                                </p>
                            </Warning>
                        )}
                    </Results>
                </div>
            </Card>
        </Container>
    );
};

export default EBikeRangeCalculator;
