import React from "react";
import { Label, Slider } from "../../styles";
import { RIDER_POWER } from "../../constants";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const PedalingTimeSlider = ({ pedalingTime, setPedalingTime }) => (
    <div>
        <Label htmlFor="pedaling-time-slider">
                💪 Pedaling time ({RIDER_POWER}Wh default, light pedaling): <span>{pedalingTime}%</span>
                <FieldTooltip type={FIELD_TYPES.PEDALING_TIME} />
        </Label>
        <Slider
            id="pedaling-time-slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={pedalingTime}
            onChange={(e) => setPedalingTime(Number(e.target.value))} />
    </div>
);
