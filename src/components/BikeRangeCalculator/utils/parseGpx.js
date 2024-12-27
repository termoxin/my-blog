const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const dLon = toRad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
              Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
    const bearing = toDeg(Math.atan2(y, x));
    return (bearing + 360) % 360; // Normalize to 0-360
};

export const parseGPX = (gpxString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(gpxString, 'application/xml');
    const points = xml.getElementsByTagName('trkpt');

    const newDistances = [];
    const newElevations = [];
    const directions = [];
    let totalDistance = 0;

    const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth radius in meters
        const toRad = (deg) => (deg * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(a));
    };

    let prevLat = null;
    let prevLon = null;

    for (let point of points) {
        const lat = parseFloat(point.getAttribute('lat'));
        const lon = parseFloat(point.getAttribute('lon'));
        const ele = parseFloat(point.getElementsByTagName('ele')[0].textContent);

        newElevations.push(ele);

        if (prevLat !== null && prevLon !== null) {
            const dist = haversine(prevLat, prevLon, lat, lon);
            totalDistance += dist;
            newDistances.push(totalDistance / 1000); 
            directions.push(calculateBearing(prevLat, prevLon, lat, lon));
        } else {
            newDistances.push(0);
            directions.push(null);
        }

        prevLat = lat;
        prevLon = lon;
    }

    const elevationGain = newElevations.reduce((acc, curr, idx, arr) => {
        if (idx > 0 && curr > arr[idx - 1]) {
            return acc + (curr - arr[idx - 1]);
        }
        return acc;
    }, 0);

    return {
        newDistances,
        newElevations,
        totalDistance,
        elevationGain,
        directions
    };
};
