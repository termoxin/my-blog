import React from "react";
import styled from "styled-components";
import { RECOMMENDED_REST_EVERY_MIN, RECOMMENDED_REST_MIN } from "../constants";

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${(props) => (props.isStop ? "#ffefba" : "#f0f0f0")};
  border: ${(props) => (props.isStop ? "2px solid #ff9800" : "1px solid #ccc")};
  border-radius: 10px;
  padding: 15px 20px;
  margin: 10px 0;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TimeMarker = styled.div`
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.isStop ? "#ff5722" : "#2196f3")};
  border-radius: 50%;
`;

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TimelineHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const TimelineText = styled.div`
  font-size: 14px;
  color: #555;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TotalRange = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  padding: 15px 20px;
  background-color: #e0f7fa;
  border: 2px solid #00acc1;
  border-radius: 10px;
  color: #006064;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const TripTimeline = ({ data, estimatedRange, averageConsumption }) => {
  const calculateAdditionalRange = (possibleRecharging, averageConsumption) => {
    if (averageConsumption <= 0) return 0;
    return (possibleRecharging / averageConsumption).toFixed(2);
  };

  const totalRechargingWh = data.reduce((total, item) => total + (+item.possibleRecharging), 0);
  const totalRechargingKm = calculateAdditionalRange(totalRechargingWh, averageConsumption);

  const totalRangeWithRechargingDuringTrip = ((+estimatedRange) + (+totalRechargingKm)).toFixed(2);

  return (
    <TimelineContainer>
      {!!data.length && <Header>Trip Planner</Header>}
      {!data.length && <TimelineText>No trip data available. Please import longer route to see the timeline.</TimelineText>}
      <TimelineText>
        Recommended rest every <b>{RECOMMENDED_REST_EVERY_MIN}</b> minutes for <b>{RECOMMENDED_REST_MIN}</b> minutes.
      </TimelineText>
      {data.map((item, index) => {
        const isStop = index % 2 === 1; // Burger stop every 2nd item

        return (
          <TimelineItem key={index} isStop={isStop}>
            <TimeMarker isStop={isStop} />
            <TimelineContent>
              <TimelineHeader>
                Time: {item.time} - Distance: {item.distance} km
              </TimelineHeader>
              <TimelineText>
                ⚡ Possible Recharging: {item.possibleRecharging} Wh + {' '} additional {' '}
                {calculateAdditionalRange(item.possibleRecharging, averageConsumption)} km of range 
              </TimelineText>
              {isStop && (
                <>
                  <TimelineText>🍔 Burger Stop!</TimelineText>
                </>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
      <TotalRange>
        Total Range with Recharging: {totalRangeWithRechargingDuringTrip} km
      </TotalRange>
    </TimelineContainer>
  );
};
