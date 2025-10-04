import React from "react";
import { Label, Slider } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const SolarPowerSlider = ({ solarPower, setSolarPower }) => (
  <div>
    <Label htmlFor="solar-power-slider">
      ☀️ Solar Panel Power: <span>{solarPower} W</span>
      <FieldTooltip type={FIELD_TYPES.SOLAR_POWER} />
    </Label>
    <Slider
      id="solar-power-slider"
      type="range"
      min="0"
      max="1000"
      step="10"
      value={solarPower}
      onChange={(e) => setSolarPower(Number(e.target.value))} />
  </div>
);

