import React from "react";
import { Label, Slider } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const WindSpeedSlider = ({ windSpeed, setWindSpeed }) => (
  <div>
    <Label htmlFor="wind-slider">
      🌬️ Wind Speed: <span>{windSpeed} m/s</span>
      <FieldTooltip type={FIELD_TYPES.WIND_SPEED} />
    </Label>
    <Slider
      id="wind-slider"
      type="range"
      min="0"
      max="20"
      step="1"
      value={windSpeed}
      onChange={(e) => setWindSpeed(Number(e.target.value))} />
  </div>
);
