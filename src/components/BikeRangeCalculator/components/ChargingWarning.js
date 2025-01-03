import React from "react";
import { KmAndWhChart as ChartContainer, Results, Warning } from "../styles";
import { KmAndWhChart } from "./KmAndWhChart";

const TEXT = {
    totalDistance: "📏 Total Distance: ",
    totalElevationGain: "🏔️ Total Elevation Gain: ",
    averageConsumption: "🔋 Average Consumption: ",
    estimatedRange: "🛣️ Estimated Range: ",
    finishTime: "⌛ Expected Finish Time: ",
    chargeWarningHeader: "⚠️ Oops! You might need a recharge!",
    chargeWarningText: "It looks like you'll need to recharge your battery at ",
    suggestedAction: "Plan a stop for a quick charge or take a break! 🚴🔋",
    estimatedChargingTime: "Estimated charging time: ",
    hoursWithCharger: " hours with a 5A charger."
};

export const ChargingWarning = ({ results, rangeData, kmAndWhChartData }) => {
    return (
        <Results>
            <p>{TEXT.totalDistance}{results.totalDistance} km</p>
            <p>{TEXT.totalElevationGain}{results.elevationGain} m</p>
            <p>{TEXT.averageConsumption}{results.averageConsumption} Wh/km</p>
            <p>{TEXT.estimatedRange}{results.estimatedRange} km</p>
            <p>{TEXT.finishTime}{results.finishTime}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {results.chargeWarning && (
                    <Warning>
                        <p className="warning-header">{TEXT.chargeWarningHeader}</p>
                        <p>
                            {TEXT.chargeWarningText}<b>{results.chargeWarning.chargeKm}</b> km to continue your ride.
                        </p>
                        <p>
                            <strong>Suggestion: </strong>{TEXT.suggestedAction}
                        </p>
                        <div className="suggestion">
                            {TEXT.estimatedChargingTime}{results.chargeWarning.chargeTime}{TEXT.hoursWithCharger}
                        </div>
                    </Warning>
                )}
                {rangeData?.segmentsConsumption.length > 0 && (
                    <ChartContainer>
                        <KmAndWhChart chargeKm={results?.chargeWarning?.chargeKm} data={kmAndWhChartData} />
                    </ChartContainer>
                )}
            </div>
        </Results>
    );
};
