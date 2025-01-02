import React from "react";
import { Label, Slider } from "../../styles";

export const WindSpeedSlider = ({ windSpeed, setWindSpeed }) => (
  <div>
    <Label htmlFor="wind-slider">
      🌬️ Wind Speed: <span>{windSpeed}</span> m/s
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
