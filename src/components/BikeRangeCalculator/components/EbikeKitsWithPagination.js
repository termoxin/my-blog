import React, { useMemo } from "react";
import { extractBatteryCapacity, extractMotorPower } from "../../EbikeKits/utils";
import { calculateBikeRange } from "../utils/calculateRange";
import ProductGrid from "../../EbikeKits";

export const EbikeKitsWithPagination = ({
  distances,
  elevations,
  speed,
  bikeWeight,
  riderWeight,
  startTime,
  windData,
  directions,
  pedalingTime,
  maxMotorPower,
  trailerWeight,
  dogWeight,
  trailerDimensions,
  products,
  calculateRanges
}) => {
  const ranges = useMemo(() => {
    return products.map(product => ({
      id: product.id,
      ranges: extractBatteryCapacity(product.title, product.skuOptions)
        .split('/')
        .map((batteryCapacity) => {
          const batteryCapacityParsed = parseFloat(batteryCapacity);

          const calculations = calculateBikeRange(
                batteryCapacityParsed,
                distances,
                elevations,
                speed,
                bikeWeight,
                riderWeight,
                startTime,
                windData,
                directions,
                pedalingTime,
                maxMotorPower,
                {
                  weight: trailerWeight,
                  dogWeight,
                  length: trailerDimensions.length,
                  width: trailerDimensions.width,
                  height: trailerDimensions.height,
                }
            );

            return {
              estimatedRange: calculations.estimatedRange,
              batteryCapacity
            }
        })
        .filter(Boolean)
    }))
  }, [
    products,
    distances,
    elevations,
    speed,
    bikeWeight,
    riderWeight,
    startTime,
    windData,
    directions,
    pedalingTime,
    maxMotorPower,
    trailerWeight,
    dogWeight,
    trailerDimensions,
    calculateRanges
  ]);
  
  return <ProductGrid 
    ranges={ranges}
    products={products} 
    riderWeight={riderWeight}
   />
}