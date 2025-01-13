import React from "react";
import styled from "styled-components";
import { MIN_BATTERY_VOLTAGE } from "../constants";

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

export const Timeline = ({ data, segmentsConsumption }) => {

  const getSegmentVoltage = (distance) => {
    const closestSegment = segmentsConsumption.find((segment) => Math.abs(segment.km - distance) <= 1);
    if (closestSegment) {
      return closestSegment;
    }
    return segmentsConsumption.find((segment) => Math.abs(segment.km - distance) <= 2);
  };

  return (
    <TimelineContainer>
      {data.length && <Header>Trip Planner</Header>}
      {data.map((item, index) => {
        const isStop = index % 2 === 1; // Burger stop every 2nd item

        const segmentVoltage = getSegmentVoltage(item.distance).batteryVoltage

        return (
          <TimelineItem key={index} isStop={isStop}>
            <TimeMarker isStop={isStop} />
            <TimelineContent>
              <TimelineHeader>
                Time: {item.time} - Distance: {item.distance} km
              </TimelineHeader>
              <TimelineText>
                Possible Recharging: {item.possibleRecharging} Wh
              </TimelineText>
              {MIN_BATTERY_VOLTAGE <= segmentVoltage && <TimelineText>Battery Voltage: {segmentVoltage} V</TimelineText>}
              {isStop && (
                <>
                  <TimelineText>🍔 Burger Stop!</TimelineText>
                 
                </>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineContainer>
  );
};
