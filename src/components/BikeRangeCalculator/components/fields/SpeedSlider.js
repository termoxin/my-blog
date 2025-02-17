import React from "react";
import { Label, Slider } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const SpeedSlider = ({ speed, setSpeed }) => (
  <div>
    <Label htmlFor="speed-slider">
      🚴‍♂️ Speed: <span>{speed} km/h</span>
       <FieldTooltip type={FIELD_TYPES.SPEED} />
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
