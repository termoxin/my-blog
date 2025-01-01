import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Container,
  Input,
  AdvancedSettingsContainer,
  Label,
  Notice,
  Results,
  Slider,
  ToggleButton,
  Warning,
} from "./styles";
import { parseGPX } from "./utils/parseGpx";
import { calculateBikeRange } from "./utils/calculateRange";
import { KmAndWhChart } from "./components/KmAndWhChart";
import { mapAngleToWindDirection } from "./utils/mapWindDirectionToAngle";
import { Tooltip } from "react-tooltip";

export const EBikeRangeCalculator = () => {
  const [speed, setSpeed] = useState(20);
  const [windSpeed, setWindSpeed] = useState(0);
  const [bikeWeight, setBikeWeight] = useState(28);
  const [riderWeight, setRiderWeight] = useState(65);
  const [startTime, setStartTime] = useState("");
  const [distances, setDistances] = useState([]);
  const [directions, setDirections] = useState([]);
  const [elevations, setElevations] = useState([]);
  const [windDirection, setWindDirection] = useState(0);
  const [batteryCapacity, setBatteryCapacity] = useState(25);
  const [trailerWeight, setTrailerWeight] = useState(10);
  const [dogWeight, setDogWeight] = useState(15);
  const [trailerDimensions, setTrailerDimensions] = useState({
    length: 0.8,
    width: 0.5,
    height: 0.5,
  });
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [results, setResults] = useState({
    totalDistance: "-",
    elevationGain: "-",
    averageConsumption: "-",
    estimatedRange: "-",
    finishTime: "-",
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
          elevationGain,
          directions,
        } = parseGPX(e.target.result);

        setDirections(directions);
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

  const generateWindData = (windSpeed, windDirection) => {
    const windData = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0") + ":00";
      windData.push({
        time: hour,
        speed: windSpeed,
        direction: mapAngleToWindDirection(windDirection),
      });
    }
    return windData;
  };

  const memoizedGenerateWindData = useCallback(
    () => generateWindData(windSpeed, windDirection),
    [windSpeed, windDirection]
  );
  const windData = memoizedGenerateWindData();

  const memoizedRangeData = useMemo(
    () =>
      calculateBikeRange(
        batteryCapacity,
        distances,
        elevations,
        speed,
        bikeWeight,
        riderWeight,
        startTime,
        windData,
        directions,
        {
          weight: trailerWeight,
          dogWeight,
          length: trailerDimensions.length,
          width: trailerDimensions.width,
          height: trailerDimensions.height,
        }
      ),
    [
      batteryCapacity,
      trailerWeight,
      dogWeight,
      trailerDimensions,
      distances,
      elevations,
      speed,
      bikeWeight,
      riderWeight,
      startTime,
      windData,
      directions,
      trailerWeight,
      dogWeight,
      trailerDimensions,
    ]
  );

  const rangeData = memoizedRangeData;

  useEffect(() => {
    setResults((prev) => ({
      totalDistance: prev.totalDistance,
      elevationGain: prev.elevationGain,
      ...rangeData,
    }));
  }, [
    speed,
    memoizedGenerateWindData,
    trailerWeight,
    dogWeight,
    trailerDimensions,
    windSpeed,
    bikeWeight,
    riderWeight,
    distances,
    elevations,
    startTime,
    batteryCapacity,
  ]);

    const kmAndWhChartData = rangeData?.segmentsConsumption.reduce((acc, segment, index) => {
        const chunkIndex = Math.floor(index / 10);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = { x: 0, y: 0, z: 0, count: 0 };
        }
        acc[chunkIndex].x += Number(segment.km);
        acc[chunkIndex].y += Number(segment.power);
        acc[chunkIndex].z += Number(segment.slope);
        acc[chunkIndex].count += 1;
        return acc;
    }, []).map(chunk => ({
        x: +(chunk.x / chunk.count).toFixed(2),
        y: +(chunk.y / chunk.count).toFixed(2),
        z: +(chunk.z / chunk.count).toFixed(2),
    }));


  return (
    <Container>
      <Card>
        <Notice>
          You can create a GPX file for your route{" "}
          <a
            href="https://www.justgoride.co.uk/routes/create"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          📄.
        </Notice>

        {/* General Settings Section */}
        <section>
          <h2>General Settings</h2>
          <div>
            <Label htmlFor="gpx-upload">📂 Upload GPX File:</Label>
            <Input
              type="file"
              id="gpx-upload"
              accept=".gpx"
              onChange={handleFileUpload}
            />

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

            <ToggleButton
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            >
              🚧 Advanced settings
            </ToggleButton>
          </div>

          {/* Advanced Settings Section */}
          {showAdvancedSettings && (
            <AdvancedSettingsContainer>
              <h3>Advanced Settings</h3>

              <Label htmlFor="wind-slider">
                🌬️ Wind Speed: <span>{windSpeed}</span> m/s
              </Label>
              <Slider
                id="wind-slider"
                type="range"
                min="0"
                max="20"
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
              />

              <Label htmlFor="wind-direction-slider">
                🌍 Wind Direction:{" "}
                <span>{mapAngleToWindDirection(windDirection)}</span>°
              </Label>
              <Slider
                id="wind-direction-slider"
                type="range"
                min="0"
                max="315"
                step="45"
                value={windDirection}
                onChange={(e) => setWindDirection(Number(e.target.value))}
              />

              <Label htmlFor="trailer-weight">
                🚛 Trailer Weight (consider luggage) (kg):
              </Label>
              <Input
                type="number"
                id="trailer-weight"
                value={trailerWeight}
                onChange={(e) => setTrailerWeight(Number(e.target.value))}
              />

              <Label htmlFor="dog-weight">🐕 Dog Weight (kg):</Label>
              <Input
                type="number"
                id="dog-weight"
                value={dogWeight}
                onChange={(e) => setDogWeight(Number(e.target.value))}
              />

              <Label htmlFor="trailer-dimensions">
              <a data-tooltip-id="my-tooltip" data-tooltip-content="Enter the trailer's length, width, and height in meters.">
              📐 Trailer Dimensions (m):
                </a>
                <Tooltip id="my-tooltip">
                    📐 Trailer Dimensions (m):
                </Tooltip>
              </Label>
              <div style={{ display: "flex", gap: "10px" }}>
                <Input
                  type="number"
                  placeholder="Length"
                  value={trailerDimensions.length}
                  onChange={(e) =>
                    setTrailerDimensions({
                      ...trailerDimensions,
                      length: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Width"
                  value={trailerDimensions.width}
                  onChange={(e) =>
                    setTrailerDimensions({
                      ...trailerDimensions,
                      width: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={trailerDimensions.height}
                  onChange={(e) =>
                    setTrailerDimensions({
                      ...trailerDimensions,
                      height: e.target.value,
                    })
                  }
                />
              </div>
            </AdvancedSettingsContainer>
          )}
        </section>

        {/* Results Section */}
        <Results>
          <p>📏 Total Distance: {results.totalDistance} km</p>
          <p>🏔️ Total Elevation Gain: {results.elevationGain} m</p>
          <p>🔋 Average Consumption: {results.averageConsumption} Wh/km</p>
          <p>🛣️ Estimated Range: {results.estimatedRange} km</p>
          <p>⌛ Expected Finish Time: {results.finishTime}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {results.chargeWarning && (
            <Warning>
                <p className="warning-header">⚠️ Oops! You might need a recharge!</p>
                <p>
                It looks like you'll need to recharge your battery at{" "}
                {results.chargeWarning.chargeKm} km to continue your ride.
                </p>
                <p>
                <strong>Suggested Action:</strong> Consider planning a stop for a quick
                charge or take a break to recharge your energy too! 🚴🔋
                </p>
                <div className="suggestion">
                Estimated charging time: {results.chargeWarning.chargeTime} hours with a
                5A charger.
                </div>
            </Warning>
            )}
          {rangeData?.segmentsConsumption.length && (
            <KmAndWhChart chargeKm={results?.chargeWarning?.chargeKm} data={kmAndWhChartData} />
          )}
          </div>
        </Results>
      </Card>
    </Container>
  );
};
