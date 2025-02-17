import React from "react"
import { Input, Label } from "../../styles";
import { FIELD_TYPES, FieldTooltip } from "../FieldTooltip";

export const TrailerDimensionsInput = ({ trailerDimensions, setTrailerDimensions }) => (
  <div>
    <Label htmlFor="trailer-dimensions">
        📐 Trailer Dimensions (m):
      <FieldTooltip type={FIELD_TYPES.TRAILER_DIMENSIONS} />
    </Label>
    <div style={{ display: "flex", gap: "10px" }}>
      <Input
        type="number"
        placeholder="Length"
        value={trailerDimensions.length}
        onChange={(e) =>
          setTrailerDimensions({
            ...trailerDimensions,
            length: e.target.value,
          })
        }
      />
      <Input
        type="number"
        placeholder="Width"
        value={trailerDimensions.width}
        onChange={(e) =>
          setTrailerDimensions({
            ...trailerDimensions,
            width: e.target.value,
          })
        }
      />
      <Input
        type="number"
        placeholder="Height"
        value={trailerDimensions.height}
        onChange={(e) =>
          setTrailerDimensions({
            ...trailerDimensions,
            height: e.target.value,
          })
        }
      />
    </div>
  </div>
);