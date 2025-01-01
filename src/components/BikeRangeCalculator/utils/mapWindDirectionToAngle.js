export const mapWindDirectionToAngle = (direction) => {
    const directions = {
        '↑': 0,
        '↗': 45,
        '→': 90,
        '↘': 135,
        '↓': 180,
        '↙': 225,
        '←': 270,
        '↖': 315,
    };

    return directions[direction] || 0;
};
export const mapAngleToWindDirection = (angle) => {
    const angles = {
        0: '↑',
        45: '↗',
        90: '→',
        135: '↘',
        180: '↓',
        225: '↙',
        270: '←',
        315: '↖',
    };

    return angles[angle] || '↑';
};