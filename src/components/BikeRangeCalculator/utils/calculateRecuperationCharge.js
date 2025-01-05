import { 
    BIKE_ROLLING_RESISTANCE, 
    G, 
    MAX_SPEED_LIMIT_DURING_RECUPERATION, 
    RECUPERATION_EFFICIENCY, 
    SLOPE_FACTOR, 
    SPEED_CONVERSION_FACTOR,
} from "../constants";

export const calculateRecuperationDynamicMaxSpeed = (distances, elevations, mass, initialSpeed) => {
    let totalRecuperationWh = 0;
    let speed = initialSpeed * SPEED_CONVERSION_FACTOR; // Initial speed in m/s

    for (let i = 1; i < distances.length; i++) {
        const elevationChange = elevations[i] - elevations[i - 1];
        const distance = (distances[i] - distances[i - 1]) * 1000; // Convert km to meters

        if (elevationChange < 0) { // Downhill segment
            const heightChange = Math.abs(elevationChange); // Positive elevation drop
            const potentialEnergyJ = mass * G * heightChange; // Potential energy in Joules

            // Rolling resistance force and energy
            const rollingResistanceForce = BIKE_ROLLING_RESISTANCE * mass * G; // Force in N
            const rollingResistanceEnergyJ = rollingResistanceForce * distance; // Energy lost in Joules

            // Calculate slope
            const slope = heightChange / distance; // Slope (dimensionless)

            // Calculate maxSpeed dynamically
            const maxSpeed = Math.min(
                speed * (1 + SLOPE_FACTOR * slope), // Slope-influenced speed
                MAX_SPEED_LIMIT_DURING_RECUPERATION * SPEED_CONVERSION_FACTOR // Set an upper limit (in m/s)
            );

            const kineticEnergyInitial = 0.5 * mass * Math.pow(speed, 2); // KE at start
            const kineticEnergyFinal = 0.5 * mass * Math.pow(maxSpeed, 2); // KE at end
            const kineticEnergyChange = kineticEnergyFinal - kineticEnergyInitial;

            // Recuperated energy in Joules, factoring motor efficiency
            const totalEnergyJ = ((potentialEnergyJ - rollingResistanceEnergyJ) + kineticEnergyChange) 
                                  * RECUPERATION_EFFICIENCY;

            if (totalEnergyJ > 0) {
                totalRecuperationWh += totalEnergyJ / 3600; // Convert J to Wh
            }

            // Update speed for the next segment
            speed = maxSpeed;
        }
    }

    return totalRecuperationWh;
};
