import React from "react";
import { Label, Input } from "../../styles";

export const BatteryCapacityInput = ({ batteryCapacity, setBatteryCapacity }) => (
  <div>
    <Label htmlFor="battery-capacity">🔋 Battery Capacity (Ah):</Label>
    <Input
      type="number"
      id="battery-capacity"
      value={batteryCapacity}
      onChange={(e) => setBatteryCapacity(Number(e.target.value))} />
  </div>
);
