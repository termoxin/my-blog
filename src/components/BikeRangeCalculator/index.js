import React, { useState, useEffect } from 'react';
import { Card, Container, Input, Label, Notice, Results, Slider, Warning } from './styles';
import { parseGPX } from './utils/parseGpx';
import { calculateBikeRange } from './utils/calculateRange';

export const EBikeRangeCalculator = () => {
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

    const calculateRange = calculateBikeRange(batteryCapacity, distances, elevations, speed, windSpeed, bikeWeight, riderWeight, startTime);

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

