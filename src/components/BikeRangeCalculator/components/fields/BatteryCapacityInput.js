import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const BatteryCapacityInput = ({ batteryCapacity, setBatteryCapacity }) => (
  <div>
    <Label htmlFor="battery-capacity">🔋 Battery Capacity (Ah):  
      <FieldTooltip type={FIELD_TYPES.BATTERY_CAPACITY} />
    </Label>
  
    <Input
      type="number"
      id="battery-capacity"
      value={batteryCapacity}
      onChange={(e) => setBatteryCapacity(Number(e.target.value))} />
  </div>
);
