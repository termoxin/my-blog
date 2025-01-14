import { CHARGER_RATE } from "../constants";


export const planRouteWithStops = (startTime, stopTime, stopInterval, distances, speed) => {
    const stops = [];
    let currentTime = startTime;
    let totalDistanceCovered = 0;

    while (totalDistanceCovered < distances[distances.length - 1]) {
        totalDistanceCovered += (stopInterval / 60) * speed; // Distance covered until next stop
        if (totalDistanceCovered >= distances[distances.length - 1]) break;

        const stopDistance = totalDistanceCovered;
        const stopTimeInHours = stopTime / 60;

        const [hours, minutes] = currentTime.split(':').map(Number);
        const stopDate = new Date();
        stopDate.setHours(hours);
        stopDate.setMinutes(minutes + stopInterval);

        let stopHours = stopDate.getHours();
        const stopMinutes = stopDate.getMinutes();
        const period = stopHours >= 12 ? 'PM' : 'AM';

        if (stopHours > 12) stopHours -= 12;
        if (stopHours === 0) stopHours = 12;

        const formattedStopTime = `${stopHours.toString().padStart(2, '0')}:${stopMinutes
            .toString()
            .padStart(2, '0')} ${period}`;

        stops.push({
            distance: stopDistance.toFixed(2),
            time: formattedStopTime,
            possibleRecharging: (CHARGER_RATE * stopTimeInHours).toFixed(2), // Possible recharging in watts
        });

        currentTime = `${stopDate.getHours().toString().padStart(2, '0')}:${stopMinutes.toString().padStart(2, '0')}`;
    }

    return stops;
};
