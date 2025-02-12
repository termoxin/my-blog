export const extractBatteryCapacity = (title, options) => {
    const batteryCapacities = [];

    for (const option of options) {
      for (const value of option.values) {
        const batteryCapacityMatch = value.displayName.match(/\d+(\.\d+)?Ah?/i);
        if (batteryCapacityMatch) batteryCapacities.push(batteryCapacityMatch[0]);
      }
    }

    const batteryCapacityMatch = title.match(/\d+(\.\d+)?Ah?/i);
    if (batteryCapacityMatch) batteryCapacities.push(batteryCapacityMatch[0]);
    const uniqueBatteryCapacities = new Set(batteryCapacities);
    return uniqueBatteryCapacities.size > 0 ? Array.from(uniqueBatteryCapacities).join('/') : 'N/A'; 
  };
