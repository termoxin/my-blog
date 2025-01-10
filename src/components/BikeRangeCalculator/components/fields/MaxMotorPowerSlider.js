import React from "react";
import { Label, Slider } from "../../styles";

export const MaxMotorPowerSlider = ({ maxMotorPower, setMaxMotorPower }) => (
    <div>
        <Label htmlFor="max-motor-power-slider">
            ⚡ Max Motor Power: <span>{maxMotorPower}</span> W
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
