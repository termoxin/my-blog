import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Container,
  Input,
  Label,
  Notice,
} from "./styles";
import { parseGPX } from "./utils/parseGpx";
import { calculateBikeRange, planRouteWithStops } from "./utils/calculateRange";
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
import { RangeInformation } from "./components/ChargingWarning";
import { PedalingTimeSlider } from "./components/fields/PedalingTimeSlider";
import { MaxMotorPowerSlider } from "./components/fields/MaxMotorPowerSlider";
import { Timeline } from "./components/TripTimeline";
import { Tab, TabContent, TabContainer} from "../Tabs/styles";
import { RECOMMENDED_REST_EVERY_MIN, RECOMMENDED_REST_MIN } from "./constants";

export const EBikeRangeCalculator = () => {
  const defaultValues = {
    speed: 20,
    windSpeed: 0,
    bikeWeight: 28,
    riderWeight: 65,
    startTime: "",
    distances: [],
    directions: [],
    elevations: [],
    windDirection: 0,
    batteryCapacity: 25,
    pedalingTime: 0,
    trailerWeight: 10,
    dogWeight: 15,
    maxMotorPower: 1500,
  };

  const [speed, setSpeed] = useState(defaultValues.speed);
  const [windSpeed, setWindSpeed] = useState(defaultValues.windSpeed);
  const [bikeWeight, setBikeWeight] = useState(defaultValues.bikeWeight);
  const [riderWeight, setRiderWeight] = useState(defaultValues.riderWeight);
  const [startTime, setStartTime] = useState(defaultValues.startTime);
  const [distances, setDistances] = useState(defaultValues.distances);
  const [directions, setDirections] = useState(defaultValues.directions);
  const [elevations, setElevations] = useState(defaultValues.elevations);
  const [windDirection, setWindDirection] = useState(defaultValues.windDirection);
  const [batteryCapacity, setBatteryCapacity] = useState(defaultValues.batteryCapacity);
  const [pedalingTime, setPedalingTime] = useState(defaultValues.pedalingTime);
  const [trailerWeight, setTrailerWeight] = useState(defaultValues.trailerWeight);
  const [dogWeight, setDogWeight] = useState(defaultValues.dogWeight);
  const [maxMotorPower, setMaxMotorPower] = useState(defaultValues.maxMotorPower);
  const [plan, setPlan] = useState(null);
  const [trailerDimensions, setTrailerDimensions] = useState({
    length: 0.8,
    width: 0.5,
    height: 0.5,
  });
  const [results, setResults] = useState({
    totalDistance: "-",
    elevationGain: "-",
    averageConsumption: "-",
    estimatedRange: "-",
    finishTime: "-",
    chargeWarning: null,
  });
  const [activeTab, setActiveTab] = useState("Basic");

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

  useEffect(() => {
    if(startTime) {
      setPlan(
        planRouteWithStops(startTime, RECOMMENDED_REST_MIN, RECOMMENDED_REST_EVERY_MIN, distances, speed)
      )
    }
  }, [startTime, distances, speed]);

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

  const memoizedWindData = useMemo(
    () => generateWindData(windSpeed, windDirection),
    [windSpeed, windDirection]
  );

  const windData = memoizedWindData;

  const memoizedRangeData = useMemo(() => {
    return calculateBikeRange(
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
    );
  }, [
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
  ]);

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
    windData,
    trailerWeight,
    dogWeight,
    trailerDimensions,
    windSpeed,
    bikeWeight,
    riderWeight,
    distances,
    elevations,
    startTime,
    batteryCapacity
  ]);

  const kmAndWhChartData = rangeData?.segmentsConsumption.reduce((acc, segment, index) => {
    const chunkIndex = Math.floor(index / 10);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = { x: 0, y: 0, z: 0, batteryVoltage: 0, count: 0 };
    }
    
    acc[chunkIndex].x += Number(segment.km);
    acc[chunkIndex].y += Number(segment.power);
    acc[chunkIndex].z += Number(segment.slope);
    acc[chunkIndex].batteryVoltage += Number(segment.batteryVoltage);
    acc[chunkIndex].count += 1;
    return acc;
  }, []).map(chunk => ({
    x: +(chunk.x / chunk.count).toFixed(2),
    y: +(chunk.y / chunk.count).toFixed(2),
    z: +(chunk.z / chunk.count).toFixed(2),
    batteryVoltage: +(chunk.batteryVoltage / chunk.count).toFixed(2),
  }));

  const onBikeDataReceived = (bikeData) => {
    if (bikeData.ampHours) {
      setBatteryCapacity(Number(bikeData.ampHours));
    }

    if (bikeData.watts) {
      setMaxMotorPower(Number(bikeData.watts));
    }

    if(bikeData.kilograms) {
      setBikeWeight(Number(bikeData.kilograms));
    }
  }


  useEffect(() => {
    if (startTime) {
      setPlan(
        planRouteWithStops(startTime, 15, 120, distances, speed)
      );
    }
  }, [startTime, distances, speed]);

  return (
    <Container>
      <Card>
        <Notice>
          Create a GPX file for your route{" "}
          <a
            href="https://www.justgoride.co.uk/routes/create"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </Notice>

        <TabContainer>
          <Tab active={activeTab === "Basic"} onClick={() => setActiveTab("Basic")}>
            Basic Settings
          </Tab>
          <Tab active={activeTab === "Advanced"} onClick={() => setActiveTab("Advanced")}>
            Advanced Settings
          </Tab>
          {distances.length > 0 && (
            <Tab active={activeTab === "RangeInformation"} onClick={() => setActiveTab("RangeInformation")}>
              Range Information
            </Tab>
          )}
          {plan && (
            <Tab active={activeTab === "Timeline"} onClick={() => setActiveTab("Timeline")}>
              Trip Timeline
            </Tab>
          )}
        </TabContainer>

        <TabContent hidden={activeTab !== "Basic"}>
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
          <BatteryCapacityInput batteryCapacity={batteryCapacity} setBatteryCapacity={setBatteryCapacity} />
        </TabContent>

        <TabContent hidden={activeTab !== "Advanced"}>
          <MaxMotorPowerSlider setMaxMotorPower={setMaxMotorPower} maxMotorPower={maxMotorPower} />
          <WindSpeedSlider windSpeed={windSpeed} setWindSpeed={setWindSpeed} />
          <WindDirectionSlider windDirection={windDirection} setWindDirection={setWindDirection} />
          <TrailerWeightInput trailerWeight={trailerWeight} setTrailerWeight={setTrailerWeight} />
          <DogWeightInput dogWeight={dogWeight} setDogWeight={setDogWeight} />
          <TrailerDimensionsInput trailerDimensions={trailerDimensions} setTrailerDimensions={setTrailerDimensions} />
        </TabContent>

        <TabContent hidden={activeTab !== "RangeInformation"}>
          {results.totalDistance !== "-" && (
            <RangeInformation 
              rangeData={rangeData} 
              kmAndWhChartData={kmAndWhChartData} 
              results={results} 
            />
          )}
        </TabContent>

        <TabContent hidden={activeTab !== "Timeline"}>
          {plan && (
            <Timeline data={plan} estimatedRange={results.estimatedRange} averageConsumption={rangeData.averageConsumption} />
          )}
        </TabContent>
      </Card>
    </Container>
  );
};
