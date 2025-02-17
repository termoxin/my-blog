import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const TrailerWeightInput = ({ trailerWeight, setTrailerWeight }) => (
  <div>
    <Label htmlFor="trailer-weight">
      🚛 Trailer Weight (consider luggage) (kg):
      <FieldTooltip type={FIELD_TYPES.TRAILER_WEIGHT} />
    </Label>
    <Input
      type="number"
      id="trailer-weight"
      value={trailerWeight}
      onChange={(e) => setTrailerWeight(Number(e.target.value))} />
  </div>
);
