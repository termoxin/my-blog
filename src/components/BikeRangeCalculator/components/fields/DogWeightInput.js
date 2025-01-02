import React from "react";
import { Label, Input } from "../../styles";

export const DogWeightInput = ({ dogWeight, setDogWeight }) => (
  <div>
    <Label htmlFor="dog-weight">🐕 Dog Weight (kg):</Label>
    <Input
      type="number"
      id="dog-weight"
      value={dogWeight}
      onChange={(e) => setDogWeight(Number(e.target.value))} />
  </div>
);
