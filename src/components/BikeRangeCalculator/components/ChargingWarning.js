import React from "react";
import { KmAndWhChart as ChartContainer, EstimatedRange, RecuperationRange, Results, Warning } from "../styles";
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
    const estimatedRangeElement = (
        <EstimatedRange>
            {TEXT.estimatedRange}
            <b>{results.estimatedRange}km</b><RecuperationRange>including <b>{results.totalRecuperationGeneratedRange}km </b>(<b>{results.totalRecuperationGeneratedPower}W ⚡️</b>) of recuperation  from downhills 🏔</RecuperationRange>
        </EstimatedRange>
    );

    return (
        <Results>
            <p>{TEXT.totalDistance}<span>{results.totalDistance} km</span></p>
            <p>{TEXT.totalElevationGain}<span>{results.elevationGain} m</span></p>
            <p>{TEXT.averageConsumption}<span>{results.averageConsumption} Wh/km</span></p>
            {estimatedRangeElement}
            <p>{TEXT.finishTime}<span>{results.finishTime}</span></p>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {results.chargeWarning && (
                    <Warning>
                        <p className="warning-header">{TEXT.chargeWarningHeader}</p>
                        <p>
                            {TEXT.chargeWarningText}<b>{results.estimatedRange}</b>km to continue your ride.
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
