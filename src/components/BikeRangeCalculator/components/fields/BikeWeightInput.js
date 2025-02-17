import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const BikeWeightInput = ({ bikeWeight, setBikeWeight }) => (
  <div>
    <Label htmlFor="bike-weight">🚲 Bike Weight (kg):  <FieldTooltip type={FIELD_TYPES.BIKE_WEIGHT} /></Label>
    <Input
      type="number"
      id="bike-weight"
      value={bikeWeight}
      onChange={(e) => setBikeWeight(Number(e.target.value))} />
  </div>
);
