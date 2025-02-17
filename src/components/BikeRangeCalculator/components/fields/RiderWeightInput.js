import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const RiderWeightInput = ({ riderWeight, setRiderWeight }) => (
  <div>
    <Label htmlFor="rider-weight">🏋️ Rider Weight (kg):  <FieldTooltip type={FIELD_TYPES.RIDER_WEIGHT} /></Label>
    <Input
      type="number"
      id="rider-weight"
      value={riderWeight}
      onChange={(e) => setRiderWeight(Number(e.target.value))} />
  </div>
);
