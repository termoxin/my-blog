import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Container,
  FindEBikeKitButton,
  Input,
  Label,
  Notice,
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
import { RangeInformation } from "./components/ChargingWarning";
import { PedalingTimeSlider } from "./components/fields/PedalingTimeSlider";
import { MaxMotorPowerSlider } from "./components/fields/MaxMotorPowerSlider";
import { TripTimeline } from "./components/TripTimeline";
import { Tab, TabContent, TabContainer} from "../Tabs/styles";
import { RECOMMENDED_REST_EVERY_MIN, RECOMMENDED_REST_MIN } from "./constants";
import RouteVisualizer from "./components/RouteVisualizer";
import { planRouteWithStops } from "./utils/planRouteWithStops";
import { products } from "./products";
import { FIELD_TYPES, FieldTooltip } from "./components/FieldTooltip";
import { EbikeKitsWithPagination } from "./components/EbikeKitsWithPagination";
import { SolarPowerSlider } from "./components/fields/SolarPowerSlider";
import { CloudCoverageSlider } from "./components/fields/CloudCoverageSlider";

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
    solarPower: 0,
    cloudCoverage: 0,
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
  const [solarPower, setSolarPower] = useState(defaultValues.solarPower);
  const [cloudCoverage, setCloudCoverage] = useState(defaultValues.cloudCoverage);
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
  const [activeTab, setActiveTab] = useState("Settings");
  const [gpxString, setGpxString] = useState(null);
  const [calculateRanges, setCalculateRanges] = useState(false);

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

        setGpxString(e.target.result)

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
        planRouteWithStops(
          startTime, 
          RECOMMENDED_REST_MIN, 
          RECOMMENDED_REST_EVERY_MIN, 
          distances, 
          speed
        )
      )
    }
  }, [startTime, distances, speed])

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
      },
      {
        solarPower,
        cloudCoverage,
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
    solarPower,
    cloudCoverage,
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
    batteryCapacity,
    solarPower,
    cloudCoverage
  ]);

  const kmAndWhChartData = rangeData?.segmentsConsumption.reduce((acc, segment, index, array) => {
    const totalSegments = array.length;
    const chunkSize = Math.ceil(totalSegments / 50);
    const chunkIndex = Math.floor(index / chunkSize);

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


  const onCalculateRanges = () => {
    setCalculateRanges(true)
  }

  return (
    <>
    <Container>
      <Card>
        <Notice>
          Create a GPX file for your route{" "}
          <a
            href="https://gpx.studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </Notice>

        <TabContainer>
          <Tab active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")}>
            ⚙️ Settings
          </Tab>
          {distances.length > 0 && (
            <Tab active={activeTab === "RangeInformation"} onClick={() => setActiveTab("RangeInformation")}>
              📊 Range Information
            </Tab>
          )}
          {distances.length > 0 && (
            <Tab active={activeTab === "RouteVisualizer"} onClick={() => setActiveTab("RouteVisualizer")}>
              🗺️ Route Visualizer
            </Tab>
          )}
        </TabContainer>

        <TabContent hidden={activeTab !== "Settings"}>
          {/* Basic Settings Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
              📝 Basic Settings
            </h3>
            <Label htmlFor="gpx-upload">📂 Upload GPX File: <FieldTooltip type={FIELD_TYPES.UPLOAD_GPX} /></Label>
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
          </div>

          {/* Advanced Settings Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
              🔧 Advanced Settings
            </h3>
            <MaxMotorPowerSlider setMaxMotorPower={setMaxMotorPower} maxMotorPower={maxMotorPower} />
            <WindSpeedSlider windSpeed={windSpeed} setWindSpeed={setWindSpeed} />
            <WindDirectionSlider windDirection={windDirection} setWindDirection={setWindDirection} />
            <TrailerWeightInput trailerWeight={trailerWeight} setTrailerWeight={setTrailerWeight} />
            <DogWeightInput dogWeight={dogWeight} setDogWeight={setDogWeight} />
            <TrailerDimensionsInput trailerDimensions={trailerDimensions} setTrailerDimensions={setTrailerDimensions} />
          </div>

          {/* Solar Power Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
              ☀️ Solar Power Settings
            </h3>
            <SolarPowerSlider solarPower={solarPower} setSolarPower={setSolarPower} />
            <CloudCoverageSlider cloudCoverage={cloudCoverage} setCloudCoverage={setCloudCoverage} />
          </div>
        </TabContent>

        <TabContent hidden={activeTab !== "RangeInformation"}>
          {results.totalDistance !== "-" && (
            <RangeInformation 
              rangeData={rangeData} 
              kmAndWhChartData={kmAndWhChartData} 
              results={results}
              solarPower={solarPower}
              cloudCoverage={cloudCoverage}
            />
          )}
        </TabContent>

        <TabContent hidden={activeTab !== "RouteVisualizer"}>
          {/* Trip Timeline Section */}
          {plan && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
                ⏱️ Trip Timeline
              </h3>
              <TripTimeline data={plan} estimatedRange={results.estimatedRange} averageConsumption={rangeData.averageConsumption} />
            </div>
          )}

          {/* Route Map Section */}
          {activeTab === 'RouteVisualizer' && gpxString && typeof global.window !== 'undefined' && (
            <div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
                🗺️ Interactive Route Map
              </h3>
              <RouteVisualizer 
                plan={plan} 
                gpxString={gpxString}
                bikeWeight={bikeWeight}
                riderWeight={riderWeight}
                maxMotorPower={maxMotorPower}
                batteryCapacity={batteryCapacity}
              />
            </div>
          )}
        </TabContent>
        {gpxString && <FindEBikeKitButton onClick={onCalculateRanges}>
      Find E-Bike Kits
    </FindEBikeKitButton>}
      </Card>
     
    </Container>
    {gpxString && calculateRanges && <EbikeKitsWithPagination
      distances={distances}
      elevations={elevations}
      speed={speed}
      bikeWeight={bikeWeight}
      riderWeight={riderWeight}
      startTime={startTime}
      windData={windData}
      directions={directions}
      pedalingTime={pedalingTime}
      maxMotorPower={maxMotorPower}
      trailerWeight={trailerWeight}
      dogWeight={dogWeight}
      trailerDimensions={trailerDimensions}
      products={products} />}
    </>
  );
};
