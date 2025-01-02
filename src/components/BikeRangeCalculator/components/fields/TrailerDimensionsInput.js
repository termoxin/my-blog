import React from "react"
import { Input, Label } from "../../styles";
import { Tooltip } from "react-tooltip";

export const TrailerDimensionsInput = ({ trailerDimensions, setTrailerDimensions }) => (
  <div>
    <Label htmlFor="trailer-dimensions">
      <a data-tooltip-id="my-tooltip" data-tooltip-content="Enter the trailer's length, width, and height in meters.">
        📐 Trailer Dimensions (m):
      </a>
      <Tooltip id="my-tooltip">
        📐 Trailer Dimensions (m):
      </Tooltip>
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