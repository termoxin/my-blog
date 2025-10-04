import React from "react";
import { 
    KmAndWhChart as ChartContainer, 
    EstimatedRange, 
    EstimatedRangeBreakdown, 
    RecuperationRange, 
    Results, 
    TotalPedalingGeneratedRange, 
    Warning,
    RangeInfoSection,
    RangeInfoGrid,
    RangeInfoCard,
    RangeInfoLabel,
    RangeInfoValue,
    RangeBreakdownContainer,
    RangeBonus
} from "../styles";
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

export const RangeInformation = ({ results, rangeData, kmAndWhChartData, solarPower, cloudCoverage }) => {
    const totalTripTime = rangeData?.totalTripTimeInSeconds;
    const totalTripTimeInHours = Math.floor(totalTripTime / 3600);
    const totalTripTimeInMinutes = Math.floor((totalTripTime % 3600) / 60);
    const formattedTotalTripTime = `${totalTripTimeInHours}h ${totalTripTimeInMinutes}m`;

    // Calculate estimated solar charge per hour
    const getSolarEfficiency = (cloudCoverage) => {
        if (cloudCoverage === 0) return 1.0;
        if (cloudCoverage <= 25) return 0.85;
        if (cloudCoverage <= 50) return 0.65;
        if (cloudCoverage <= 75) return 0.35;
        return 0.15; // Heavy overcast
    };

    // Average solar irradiance during daylight hours (6 AM to 6 PM)
    const getAverageSolarIrradiance = () => {
        // Simplified average irradiance during daylight hours
        // Peak hours (10-14): 1.0, Medium hours (8-10, 14-16): 0.7, Low hours (6-8, 16-18): 0.3
        return 0.6; // Average across daylight hours
    };

    const solarEfficiency = getSolarEfficiency(cloudCoverage);
    const averageSolarIrradiance = getAverageSolarIrradiance();
    const estimatedSolarChargePerHourWh = solarPower * solarEfficiency * averageSolarIrradiance; // Wh per hour
    
    // Convert to km per hour using average consumption
    const estimatedSolarChargePerHourKm = results.averageConsumption > 0 
        ? (estimatedSolarChargePerHourWh / results.averageConsumption).toFixed(1)
        : "0.0";

    return (
        <Results>
            {/* Trip Overview Section */}
            <RangeInfoSection>
                <h3>📊 Trip Overview</h3>
                <RangeInfoGrid>
                    <RangeInfoCard>
                        <RangeInfoLabel>📏 Total Distance</RangeInfoLabel>
                        <RangeInfoValue>{results.totalDistance} km ({formattedTotalTripTime})</RangeInfoValue>
                    </RangeInfoCard>
                    <RangeInfoCard>
                        <RangeInfoLabel>🏔️ Total Elevation Gain</RangeInfoLabel>
                        <RangeInfoValue>{results.elevationGain} m</RangeInfoValue>
                    </RangeInfoCard>
                    <RangeInfoCard>
                        <RangeInfoLabel>🔋 Average Consumption</RangeInfoLabel>
                        <RangeInfoValue>{results.averageConsumption} Wh/km</RangeInfoValue>
                    </RangeInfoCard>
                    <RangeInfoCard>
                        <RangeInfoLabel>🚴‍♂️ Max Speed</RangeInfoLabel>
                        <RangeInfoValue>{rangeData.maxSpeed} km/h</RangeInfoValue>
                    </RangeInfoCard>
                    {solarPower > 0 && (
                        <RangeInfoCard>
                            <RangeInfoLabel>☀️ Estimated Solar Charge Per Hour</RangeInfoLabel>
                            <RangeInfoValue>{estimatedSolarChargePerHourKm} km ({estimatedSolarChargePerHourWh.toFixed(1)} W)</RangeInfoValue>
                        </RangeInfoCard>
                    )}
                </RangeInfoGrid>
            </RangeInfoSection>

            {/* Range Estimation Section */}
            <RangeInfoSection>
                <h3>🛣️ Estimated Range</h3>
                <RangeBreakdownContainer>
                    <RangeInfoCard primary>
                        <RangeInfoLabel>Base Range (± 5%)</RangeInfoLabel>
                        <RangeInfoValue large>
                            {(results.estimatedRange * 0.95).toFixed(1)} - {(results.estimatedRange * 1.05).toFixed(1)} km
                        </RangeInfoValue>
                    </RangeInfoCard>
                    
                    {/* Range Bonuses */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
                        <RangeBonus type="rbs">
                            + {results.totalRecuperationGeneratedRange} km RBS 🏔️
                        </RangeBonus>
                        {!!Number(rangeData.totalPedalingGeneratedRange) && (
                            <RangeBonus type="pedaling">
                                + {rangeData.totalPedalingGeneratedRange} km pedaling 💪
                            </RangeBonus>
                        )}
                        {!!Number(rangeData.totalSolarGeneratedRange) && (
                            <RangeBonus type="solar">
                                + {rangeData.totalSolarGeneratedRange} km solar ☀️
                            </RangeBonus>
                        )}
                    </div>
                </RangeBreakdownContainer>
            </RangeInfoSection>

            {/* Timing Section */}
            <RangeInfoSection>
                <h3>⌛ Timing Information</h3>
                <RangeInfoCard>
                    <RangeInfoLabel>Expected Finish Time</RangeInfoLabel>
                    <RangeInfoValue>{results.finishTime}</RangeInfoValue>
                </RangeInfoCard>
            </RangeInfoSection>

            {/* Warnings and Alerts */}
            {results.chargeWarning && (
                <RangeInfoSection>
                    <h3>⚠️ Battery Alert</h3>
                    <RangeInfoCard warning>
                        <div style={{ marginBottom: '1rem' }}>
                            <RangeInfoLabel style={{ color: '#c53030', fontWeight: 'bold', fontSize: '1rem' }}>
                                {TEXT.chargeWarningHeader}
                            </RangeInfoLabel>
                            <RangeInfoValue style={{ color: '#2d3748', fontSize: '1rem', fontWeight: 'normal' }}>
                                {TEXT.chargeWarningText}<strong>{results.estimatedRange} km</strong> to continue your ride.
                            </RangeInfoValue>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <RangeInfoLabel style={{ color: '#2d3748', fontWeight: 'bold' }}>
                                Suggestion:
                            </RangeInfoLabel>
                            <RangeInfoValue style={{ color: '#2d3748', fontSize: '1rem', fontWeight: 'normal' }}>
                                {TEXT.suggestedAction}
                            </RangeInfoValue>
                        </div>
                        <RangeBonus type="charging">
                            {TEXT.estimatedChargingTime}{results.chargeWarning.chargeTime}{TEXT.hoursWithCharger}
                        </RangeBonus>
                    </RangeInfoCard>
                </RangeInfoSection>
            )}

            {/* Power Consumption Chart */}
            {rangeData?.segmentsConsumption.length > 0 && (
                <RangeInfoSection>
                    <h3>📈 Power Consumption Profile</h3>
                    <ChartContainer>
                        <KmAndWhChart chargeKm={results?.chargeWarning?.chargeKm} data={kmAndWhChartData} />
                    </ChartContainer>
                </RangeInfoSection>
            )}
        </Results>
    );
};
