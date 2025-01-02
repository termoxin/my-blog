import React from "react";
import { Label, Input } from "../../styles";

export const RiderWeightInput = ({ riderWeight, setRiderWeight }) => (
  <div>
    <Label htmlFor="rider-weight">🏋️ Rider Weight (kg):</Label>
    <Input
      type="number"
      id="rider-weight"
      value={riderWeight}
      onChange={(e) => setRiderWeight(Number(e.target.value))} />
  </div>
);
