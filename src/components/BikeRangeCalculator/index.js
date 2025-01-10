import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Container,
  Input,
  AdvancedSettingsContainer,
  Label,
  Notice,
  ToggleButton,
} from "./styles";
import { parseGPX } from "./utils/parseGpx";
import { calculateBikeRange } from "./utils/calculateRange";
import { mapAngleToWindDirection } from "./utils/mapWindDirectionToAngle";
import { SpeedSlider } from "./components/fields/SpeedSlider";
import { BikeWeightInput } from "./components/fields/BikeWeightInput";
import { RiderWeightInput } from "./components/fields/RiderWeightInput";
import { StartTimeInput } from "./components/fields/StartTimeInput";
import { BatteryCapacityInput } from "./components/fields/BatteryCapacityInput";
import { WindSpeedSlider } from "./components/fields/WindSpeedSlider";
import { WindDirectionSlider } from "./components/fields/WindDirectionSlider";
import { TrailerWeightInput } from "./components/fields/TrailerWeightInput";
import { DogWeightInput } from "./components/fields/DogWeightInput";
import { TrailerDimensionsInput } from "./components/fields/TrailerDimensionsInput";
import { ChargingWarning } from "./components/ChargingWarning";
import { PedalingTimeSlider } from "./components/fields/PedalingTimeSlider";
import { MaxMotorPowerSlider } from "./components/fields/MaxMotorPowerSlider";

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
  const [pedalingTime, setPedalingTime] = useState(0);
  const [trailerWeight, setTrailerWeight] = useState(10);
  const [dogWeight, setDogWeight] = useState(15);
  const [maxMotorPower, setMaxMotorPower] = useState(1500);

  console.log(maxMotorPower)

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
        pedalingTime,
        maxMotorPower,
        {
          weight: trailerWeight,
          dogWeight,
          length: trailerDimensions.length,
          width: trailerDimensions.width,
          height: trailerDimensions.height,
        }
      ),
    [
      maxMotorPower,
      pedalingTime,
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
    pedalingTime,
    speed,
    maxMotorPower,  
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

            <SpeedSlider speed={speed} setSpeed={setSpeed} />
            <BikeWeightInput bikeWeight={bikeWeight} setBikeWeight={setBikeWeight} />
            <RiderWeightInput riderWeight={riderWeight} setRiderWeight={setRiderWeight} />
            <PedalingTimeSlider pedalingTime={pedalingTime} setPedalingTime={setPedalingTime} />
            <StartTimeInput startTime={startTime} setStartTime={setStartTime} />
            <MaxMotorPowerSlider setMaxMotorPower={setMaxMotorPower} maxMotorPower={maxMotorPower} />
            <BatteryCapacityInput batteryCapacity={batteryCapacity} setBatteryCapacity={setBatteryCapacity} />

            <ToggleButton
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            >
              🚧 Advanced settings
            </ToggleButton>
          </div>

          {showAdvancedSettings && (
            <AdvancedSettingsContainer>
              <h3>Advanced Settings</h3>
              <WindSpeedSlider windSpeed={windSpeed} setWindSpeed={setWindSpeed} />
              <WindDirectionSlider windDirection={windDirection} setWindDirection={setWindDirection} />
              <TrailerWeightInput trailerWeight={trailerWeight} setTrailerWeight={setTrailerWeight} />
              <DogWeightInput dogWeight={dogWeight} setDogWeight={setDogWeight} />
              <TrailerDimensionsInput trailerDimensions={trailerDimensions} setTrailerDimensions={setTrailerDimensions} />
            </AdvancedSettingsContainer>
          )}
        </section>

        {results.totalDistance !== '-' && <ChargingWarning
          results={results}
          rangeData={rangeData}
          kmAndWhChartData={kmAndWhChartData}
        />}
      </Card>
    </Container>
  );
};
