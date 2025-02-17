import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const DogWeightInput = ({ dogWeight, setDogWeight }) => (
  <div>
    <Label htmlFor="dog-weight">🐕 Dog Weight (kg): <FieldTooltip type={FIELD_TYPES.DOG_WEIGHT} /></Label>
    <Input
      type="number"
      id="dog-weight"
      value={dogWeight}
      onChange={(e) => setDogWeight(Number(e.target.value))} />
  </div>
);
