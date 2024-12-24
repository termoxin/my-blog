import React, { useState, useEffect } from 'react';
import { Card, Container, Input, Label, Notice, Results, Slider, Warning } from './styles';
import { parseGPX } from './utils';

const EBikeRangeCalculator = () => {
    const [speed, setSpeed] = useState(20);
    const [windSpeed, setWindSpeed] = useState(0);
    const [bikeWeight, setBikeWeight] = useState(28);
    const [riderWeight, setRiderWeight] = useState(65);
    const [startTime, setStartTime] = useState('');
    const [gpxData, setGpxData] = useState(null);
    const [distances, setDistances] = useState([]);
    const [elevations, setElevations] = useState([]);
    const [batteryCapacity, setBatteryCapacity] = useState(25); 
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
            reader.onload = (e) => {
 
                const {  
                    newDistances,
                    newElevations,
                    totalDistance,
                    elevationGain 
                } = parseGPX(e.target.result)

                setDistances(newDistances);
                setElevations(newElevations);
                setResults((prev) => ({
                    ...prev,
                    totalDistance: (totalDistance / 1000).toFixed(2),
                    elevationGain: elevationGain.toFixed(2),
                }));
            };
            
            reader.readAsText(file);
        }
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
    
        // Calculate when charging is needed
        let chargePoint = null;
    
        for (let i = 0; i < distances.length; i++) {
            if (distances[i] > estimatedRange) {
                chargePoint = distances[i]; // Distance at which charging is required
                break;
            }
        }
    
        const chargeWarning = chargePoint !== null;
    
        let remainingEnergy = 0;
        let chargeTimeRequired = 0;
    
        if (chargeWarning) {
            // Remaining energy needed beyond the estimated range
            remainingEnergy = (totalConsumption - batteryCapacityWh) > 0 ? (totalConsumption - batteryCapacityWh) : 0;
    
            // Charging time (hours)
            chargeTimeRequired = remainingEnergy / chargerRate;
        }
    
        const finishTime = calculateFinishTime();
    
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
        }
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
        setResults(prev => ({ totalDistance: prev.totalDistance,
                elevationGain: prev.elevationGain,...calculateRange()}));
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
