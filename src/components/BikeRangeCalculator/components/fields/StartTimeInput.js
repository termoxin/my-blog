import React from "react";
import { Label, Input } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const StartTimeInput = ({ startTime, setStartTime }) => (
  <div>
    <Label htmlFor="start-time">⏰ Start Ride Time:  <FieldTooltip type={FIELD_TYPES.START_RIDE_TIME} /></Label>
    <Input
      type="time"
      id="start-time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)} />
  </div>
);
