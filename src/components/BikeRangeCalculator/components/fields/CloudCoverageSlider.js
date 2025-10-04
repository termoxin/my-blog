import React from "react";
import { Label, Slider } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const CloudCoverageSlider = ({ cloudCoverage, setCloudCoverage }) => {
  const getCloudDescription = (coverage) => {
    if (coverage === 0) return "Clear sky";
    if (coverage <= 25) return "Mostly clear";
    if (coverage <= 50) return "Partly cloudy";
    if (coverage <= 75) return "Mostly cloudy";
    return "Overcast";
  };

  return (
    <div>
      <Label htmlFor="cloud-coverage-slider">
        ☁️ Cloud Coverage: <span>{cloudCoverage}% ({getCloudDescription(cloudCoverage)})</span>
        <FieldTooltip type={FIELD_TYPES.CLOUD_COVERAGE} />
      </Label>
      <Slider
        id="cloud-coverage-slider"
        type="range"
        min="0"
        max="100"
        step="5"
        value={cloudCoverage}
        onChange={(e) => setCloudCoverage(Number(e.target.value))} />
    </div>
  );
};

