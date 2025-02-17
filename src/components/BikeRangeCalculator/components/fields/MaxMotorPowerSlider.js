import React from "react";
import { Label, Slider } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const MaxMotorPowerSlider = ({ maxMotorPower, setMaxMotorPower }) => (
    <div>
        <Label htmlFor="max-motor-power-slider">
            ⚡ Max Motor Power: <span>{maxMotorPower}W ({maxMotorPower/1000}Kw)</span>
            <FieldTooltip type={FIELD_TYPES.MAX_MOTOR_POWER} />
        </Label>
        <Slider
            id="max-motor-power-slider"
            type="range"
            min="250"
            max="8000"
            step="50"
            value={maxMotorPower}
            onChange={(e) => setMaxMotorPower(Number(e.target.value))} />
    </div>
);
