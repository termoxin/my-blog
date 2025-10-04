import React from "react";
import { Tooltip } from 'react-tooltip';
import styled from "styled-components";

export const FIELD_TYPES = {
    SPEED: "speed",
    BIKE_WEIGHT: "bikeWeight",
    RIDER_WEIGHT: "riderWeight",
    PEDALING_TIME: "pedalingTime",
    START_RIDE_TIME: "startRideTime",
    BATTERY_CAPACITY: "batteryCapacity",
    MAX_MOTOR_POWER: "maxMotorPower",
    WIND_SPEED: "windSpeed",
    WIND_DIRECTION: "windDirection",
    TRAILER_WEIGHT: "trailerWeight",
    DOG_WEIGHT: "dogWeight",
    TRAILER_DIMENSIONS: "trailerDimensions",
    UPLOAD_GPX_FILE: "uploadGpxFile",
    SOLAR_POWER: "solarPower",
    CLOUD_COVERAGE: "cloudCoverage"
};

const calculationFields = {
    [FIELD_TYPES.SPEED]: "Speed affects the range as higher speeds generally consume more battery power.",
    [FIELD_TYPES.BIKE_WEIGHT]: "The weight of the bike impacts the energy required to move it, affecting the range.",
    [FIELD_TYPES.RIDER_WEIGHT]: "The weight of the rider influences the total load on the bike, impacting battery consumption.",
    [FIELD_TYPES.PEDALING_TIME]: "Pedaling time can extend the range by reducing the reliance on the battery.",
    [FIELD_TYPES.START_RIDE_TIME]: "The time of day can affect range due to varying temperatures and wind conditions.",
    [FIELD_TYPES.BATTERY_CAPACITY]: "Battery capacity determines the total amount of energy available for the ride.",
    [FIELD_TYPES.MAX_MOTOR_POWER]: "The maximum speed of the motor can limit the top speed and affect energy consumption.",
    [FIELD_TYPES.WIND_SPEED]: "Wind speed can either aid or hinder the bike's movement, impacting the range.",
    [FIELD_TYPES.WIND_DIRECTION]: "Wind direction relative to the bike's movement can affect the effort required to ride.",
    [FIELD_TYPES.TRAILER_WEIGHT]: "Additional weight from a trailer increases the load, affecting battery usage.",
    [FIELD_TYPES.DOG_WEIGHT]: "If carrying a dog, its weight adds to the total load, impacting the range.",
    [FIELD_TYPES.TRAILER_DIMENSIONS]: "The size of the trailer can affect aerodynamics and energy consumption.",
    [FIELD_TYPES.UPLOAD_GPX_FILE]: "Uploading a GPX file allows for route analysis and more accurate range estimation.",
    [FIELD_TYPES.SOLAR_POWER]: "Solar panel power can charge the battery during the ride, extending the range. Higher wattage panels generate more power.",
    [FIELD_TYPES.CLOUD_COVERAGE]: "Cloud coverage reduces solar panel efficiency. Clear skies provide maximum power generation, while overcast conditions significantly reduce output."
};

const TooltipTrigger = styled.a`
   display: flex;
   justify-content: center;
   align-items: center;
   text-decoration: none;
   border-bottom: none !important;
   background-color:hsl(30, 91.40%, 63.50%);
   color: white;
   width: 20px;
   height: 20px;
   font-size: 14px;
   border-radius: 100%;
   cursor: pointer;

   &:hover {
    color: white;
    opacity: 0.8;
   }
`

export const FieldTooltip = ({ type }) => {
    return (
        <>
            <TooltipTrigger className={type}>?</TooltipTrigger>
            <Tooltip anchorSelect={`.${type}`} place="top">
                {calculationFields[type]}
            </Tooltip>
        </>
    );
};
