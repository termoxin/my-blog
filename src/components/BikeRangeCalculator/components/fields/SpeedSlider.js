import React from "react";
import { Label, Slider } from "../../styles";

export const SpeedSlider = ({ speed, setSpeed }) => (
  <div>
    <Label htmlFor="speed-slider">
      🚴‍♂️ Speed: <span>{speed}</span> km/h
    </Label>
    <Slider
      id="speed-slider"
      type="range"
      min="10"
      max="50"
      step="1"
      value={speed}
      onChange={(e) => setSpeed(Number(e.target.value))} />
  </div>
);
