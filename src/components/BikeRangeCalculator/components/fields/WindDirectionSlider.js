import React from "react";
import { Label, Slider } from "../../styles";
import { mapAngleToWindDirection } from "../../utils/mapWindDirectionToAngle";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const WindDirectionSlider = ({ windDirection, setWindDirection }) => (
  <div>
    <Label htmlFor="wind-direction-slider">
      🌍 Wind Direction:{" "}
      <span>{mapAngleToWindDirection(windDirection)}</span>
      <FieldTooltip type={FIELD_TYPES.WIND_DIRECTION} />
    </Label>
    <Slider
      id="wind-direction-slider"
      type="range"
      min="0"
      max="315"
      step="45"
      value={windDirection}
      onChange={(e) => setWindDirection(Number(e.target.value))} />
  </div>
);
