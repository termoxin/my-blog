import React from "react";
import { KmAndWhChart as ChartContainer, Divider, EstimatedRange, EstimatedRangeBreakdown, RecuperationRange, Results, TotalPedalingGeneratedRange, Warning } from "../styles";
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
    hoursWithCharger: " hours with a 5A charger.",
    maxSpeed: "🚴‍♂️ Max Speed: "
};

export const RangeInformation = ({ results, rangeData, kmAndWhChartData }) => {
    const estimatedRangeElement = (
        <EstimatedRangeBreakdown>
            <EstimatedRange>
                <div>
                    {TEXT.estimatedRange}
                    <b>{(results.estimatedRange * 0.9).toFixed(1)} - {(results.estimatedRange * 1.1).toFixed(1)} km</b> (± 10%)
                </div>
                <RecuperationRange>
                    + <b>{results.totalRecuperationGeneratedRange} km </b> RBS 🏔
                </RecuperationRange>
                {!!Number(rangeData.totalPedalingGeneratedRange) && (
                    <TotalPedalingGeneratedRange>
                        + pedaling: <b>{rangeData.totalPedalingGeneratedRange} km </b>💪
                    </TotalPedalingGeneratedRange>
                )}
            </EstimatedRange>
        </EstimatedRangeBreakdown>
    );

    // It has power generated from recuperative braking metrics

    // const estimatedRangeElement = (
    //     <EstimatedRangeBreakdown>
    //         <EstimatedRange>
    //             {TEXT.estimatedRange}
    //             <b>{results.estimatedRange} km</b><RecuperationRange>including <b>{results.totalRecuperationGeneratedRange} km </b>(<b>{results.totalRecuperationGeneratedPower}W ⚡️</b>) of recovery from downhills 🏔</RecuperationRange>
    //         </EstimatedRange>
    //         {!!Number(rangeData.totalPedalingGeneratedRange) && <TotalPedalingGeneratedRange>
    //             Including saved by pedaling: {rangeData.totalPedalingGeneratedRange} km 💪
    //         </TotalPedalingGeneratedRange>}
    //     </EstimatedRangeBreakdown>
    // );


    const totalTripTime = rangeData?.totalTripTimeInSeconds
    const totalTripTimeInHours = Math.floor(totalTripTime / 3600);
    const totalTripTimeInMinutes = Math.floor((totalTripTime % 3600) / 60);
    const formattedTotalTripTime = `${totalTripTimeInHours}h ${totalTripTimeInMinutes}m`;


    return (
        <Results>
            <p>{TEXT.totalDistance}<span>{results.totalDistance} km ({formattedTotalTripTime})</span></p>
            <p>{TEXT.totalElevationGain}<span>{results.elevationGain} m</span></p>
            <p>{TEXT.averageConsumption}<span>{results.averageConsumption} Wh/km</span></p>
            {estimatedRangeElement}
            <p>{TEXT.finishTime}<span>{results.finishTime}</span></p>
            <p>{TEXT.maxSpeed} <span>{rangeData.maxSpeed} km/h</span></p>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {results.chargeWarning && (
                    <Warning>
                        <p className="warning-header">{TEXT.chargeWarningHeader}</p>
                        <p>
                            {TEXT.chargeWarningText}<b>{results.estimatedRange}</b> km to continue your ride.
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
