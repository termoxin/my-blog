import React from "react";
import { Label, Input } from "../../styles";

export const StartTimeInput = ({ startTime, setStartTime }) => (
  <div>
    <Label htmlFor="start-time">⏰ Start Ride Time:</Label>
    <Input
      type="time"
      id="start-time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)} />
  </div>
);
