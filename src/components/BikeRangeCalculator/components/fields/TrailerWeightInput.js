import React from "react";
import { Label, Input } from "../../styles";

export const TrailerWeightInput = ({ trailerWeight, setTrailerWeight }) => (
  <div>
    <Label htmlFor="trailer-weight">
      🚛 Trailer Weight (consider luggage) (kg):
    </Label>
    <Input
      type="number"
      id="trailer-weight"
      value={trailerWeight}
      onChange={(e) => setTrailerWeight(Number(e.target.value))} />
  </div>
);
