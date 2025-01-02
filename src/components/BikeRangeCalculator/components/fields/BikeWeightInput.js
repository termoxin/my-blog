import React from "react";
import { Label, Input } from "../../styles";

export const BikeWeightInput = ({ bikeWeight, setBikeWeight }) => (
  <div>
    <Label htmlFor="bike-weight">🚲 Bike Weight (kg):</Label>
    <Input
      type="number"
      id="bike-weight"
      value={bikeWeight}
      onChange={(e) => setBikeWeight(Number(e.target.value))} />
  </div>
);
