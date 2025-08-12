import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { 
    AIR_DENSITY, 
    BIKE_ROLLING_RESISTANCE, 
    DRAG_COEFFICIENT, 
    FRONTAL_AREA, 
    G,
    BATTERY_VOLTAGE,
    MAX_BATTERY_VOLTAGE,
    MIN_EFFECTIVE_BATTERY_VOLTAGE,
    MAX_USABLE_BATTERY_WITHOUT_ITS_DAMANGE
} from '../constants';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Polyline = lazy(() => import('react-leaflet').then(module => ({ default: module.Polyline })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

const RouteVisualizer = ({ 
    gpxString, 
    plan, 
    bikeWeight = 28, 
    riderWeight = 65, 
    maxMotorPower = 1500,
    batteryCapacity = 25 // Ah
}) => {
    const [route, setRoute] = useState([]);
    const [bounds, setBounds] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [bikeIcon, setBikeIcon] = useState(null);
    const [planMarkers, setPlanMarkers] = useState([]);
    const [isMobileMode, setIsMobileMode] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [powerConsumption, setPowerConsumption] = useState(0);
    const [currentVoltage, setCurrentVoltage] = useState(MAX_BATTERY_VOLTAGE);
    const [batteryPercentage, setBatteryPercentage] = useState(100);
    const [estimatedRange, setEstimatedRange] = useState(0);
    const [totalEnergyConsumed, setTotalEnergyConsumed] = useState(0);
    const [totalDistanceTraveled, setTotalDistanceTraveled] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [speedHistory, setSpeedHistory] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [lastPosition, setLastPosition] = useState(null);
    const [lastTimestamp, setLastTimestamp] = useState(null);
    const [tripStartTime, setTripStartTime] = useState(null);
    const [lastRangeUpdate, setLastRangeUpdate] = useState(null);
    const [nextRangeUpdateIn, setNextRangeUpdateIn] = useState(0);
    const mapRef = useRef(null);
    const watchIdRef = useRef(null);

    useEffect(() => {
        const parseGPX = async () => {
            try {
                const L = await import('leaflet');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxString, 'application/xml');
                const trackPoints = Array.from(xmlDoc.getElementsByTagName('trkpt')).map(point => [
                    parseFloat(point.getAttribute('lat')),
                    parseFloat(point.getAttribute('lon'))
                ]);
                setRoute(trackPoints);

                if (trackPoints.length > 0) {
                    const routeBounds = trackPoints.reduce((bounds, point) => {
                        return bounds.extend(point);
                    }, L.latLngBounds(trackPoints[0], trackPoints[0]));
                    setBounds(routeBounds);
                }
            } catch (error) {
                console.error('Error parsing GPX:', error);
            }
        };

        if (gpxString) {
            parseGPX();
        }
    }, [gpxString]);

    // GPS tracking functionality
    useEffect(() => {
        const startGPSTracking = () => {
            if (navigator.geolocation && isTracking) {
                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                watchIdRef.current = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude, speed: gpsSpeed } = position.coords;
                        const newPosition = [latitude, longitude];
                        const currentTime = Date.now();

                        setCurrentLocation(newPosition);

                        let currentSpeed = 0;
                        let distanceSegment = 0;

                        // Calculate speed and distance if GPS speed is not available
                        if (gpsSpeed !== null && gpsSpeed !== undefined) {
                            currentSpeed = Math.max(0, gpsSpeed * 3.6); // Convert m/s to km/h
                        } else if (lastPosition && lastTimestamp) {
                            distanceSegment = calculateDistance(lastPosition, newPosition);
                            const timeDiff = (currentTime - lastTimestamp) / 1000; // seconds
                            currentSpeed = Math.max(0, (distanceSegment / timeDiff) * 3.6); // km/h
                        }

                        // Update distance traveled (only if moving significantly)
                        if (lastPosition && currentSpeed > 1) { // Only count if moving faster than 1 km/h
                            if (distanceSegment === 0) { // Recalculate if not done above
                                distanceSegment = calculateDistance(lastPosition, newPosition);
                            }
                            setTotalDistanceTraveled(prev => prev + (distanceSegment / 1000)); // Convert to km
                        }

                        // Update speed history for rolling average (keep last 30 readings, ~30 seconds)
                        setSpeedHistory(prev => {
                            const newHistory = [...prev, currentSpeed].slice(-30);
                            
                            // Calculate rolling average speed (excluding very low speeds)
                            const significantSpeeds = newHistory.filter(s => s > 2); // Filter out very slow speeds
                            if (significantSpeeds.length > 0) {
                                const avgSpeed = significantSpeeds.reduce((sum, s) => sum + s, 0) / significantSpeeds.length;
                                setAverageSpeed(avgSpeed);
                            }
                            
                            return newHistory;
                        });

                        setSpeed(currentSpeed);
                        setLastPosition(newPosition);
                        setLastTimestamp(currentTime);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    },
                    options
                );
            }
        };

        const stopGPSTracking = () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        };

        if (isTracking) {
            startGPSTracking();
        } else {
            stopGPSTracking();
        }

        return () => stopGPSTracking();
    }, [isTracking, lastPosition, lastTimestamp]);

    // Initial location fetch
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation([latitude, longitude]);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getUserLocation();
    }, []);

    // Calculate distance between two coordinates
    const calculateDistance = (pos1, pos2) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = pos1[0] * Math.PI / 180;
        const φ2 = pos2[0] * Math.PI / 180;
        const Δφ = (pos2[0] - pos1[0]) * Math.PI / 180;
        const Δλ = (pos2[1] - pos1[1]) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    // Calculate estimated power consumption based on current speed
    const calculatePowerConsumption = (speedKmh) => {
        if (speedKmh <= 0) return 0;
        
        const speedMs = speedKmh / 3.6; // Convert km/h to m/s
        const totalWeight = bikeWeight + riderWeight;
        
        // Rolling resistance power (watts)
        const rollingPower = BIKE_ROLLING_RESISTANCE * totalWeight * G * speedMs;
        
        // Aerodynamic drag power (watts) - assuming no wind
        const dragPower = 0.5 * AIR_DENSITY * DRAG_COEFFICIENT * FRONTAL_AREA * Math.pow(speedMs, 3);
        
        // Total power consumption in watts (no elevation change assumed for real-time)
        const totalPower = rollingPower + dragPower;
        
        // Cap at motor max power
        return Math.min(totalPower, maxMotorPower);
    };

    // Calculate battery voltage based on remaining capacity
    const calculateBatteryVoltage = (percentage) => {
        const voltageRange = MAX_BATTERY_VOLTAGE - MIN_EFFECTIVE_BATTERY_VOLTAGE;
        return MIN_EFFECTIVE_BATTERY_VOLTAGE + (voltageRange * percentage / 100);
    };

    // Calculate estimated range based on current consumption and travel patterns
    const calculateEstimatedRange = (currentPowerW, batteryPercent, currentSpeedKmh, avgSpeedKmh, distanceTraveled, tripTime) => {
        if (currentPowerW <= 0 || batteryPercent <= 0) return 0;
        
        const remainingCapacityWh = (batteryCapacity * batteryPercent / 100) * BATTERY_VOLTAGE * MAX_USABLE_BATTERY_WITHOUT_ITS_DAMANGE;
        const hoursRemaining = remainingCapacityWh / currentPowerW;
        
        // Use different speed strategies based on available data
        let effectiveSpeed = currentSpeedKmh;
        
        if (avgSpeedKmh > 0 && speedHistory.length > 10) {
            // Use rolling average if we have enough data
            effectiveSpeed = avgSpeedKmh;
        } else if (tripTime > 300 && distanceTraveled > 0.5) {
            // Use trip average if we've been riding for 5+ minutes and traveled 500m+
            const tripAverageSpeed = (distanceTraveled / (tripTime / 3600)); // km/h
            if (tripAverageSpeed > 0) {
                effectiveSpeed = tripAverageSpeed;
            }
        }
        
        // Weight between current speed and average for more stability
        if (avgSpeedKmh > 0 && currentSpeedKmh > 0) {
            effectiveSpeed = (currentSpeedKmh * 0.3) + (avgSpeedKmh * 0.7);
        }
        
        const rangeKm = effectiveSpeed * hoursRemaining;
        return Math.max(0, rangeKm);
    };

    // Track energy consumption over time
    useEffect(() => {
        if (isTracking && powerConsumption > 0 && speed > 0) {
            const interval = setInterval(() => {
                const timeIntervalHours = 1 / 3600; // 1 second in hours
                const energyConsumedWh = powerConsumption * timeIntervalHours;
                
                setTotalEnergyConsumed(prev => {
                    const newTotal = prev + energyConsumedWh;
                    const maxCapacityWh = batteryCapacity * BATTERY_VOLTAGE * MAX_USABLE_BATTERY_WITHOUT_ITS_DAMANGE;
                    const newPercentage = Math.max(0, 100 - (newTotal / maxCapacityWh * 100));
                    
                    setBatteryPercentage(newPercentage);
                    setCurrentVoltage(calculateBatteryVoltage(newPercentage));
                    
                    return newTotal;
                });
            }, 1000); // Update every second

            return () => clearInterval(interval);
        }
    }, [isTracking, powerConsumption, speed, batteryCapacity]);

    // Update power consumption immediately when speed changes (but not range)
    useEffect(() => {
        const newPowerConsumption = calculatePowerConsumption(speed);
        setPowerConsumption(newPowerConsumption);
    }, [speed, bikeWeight, riderWeight, maxMotorPower]);

    // Debounced 30-second range calculation - captures all current data
    useEffect(() => {
        if (isTracking) {
            // Store current data snapshot for calculations
            const getCurrentData = () => ({
                currentSpeed: speed,
                currentPowerConsumption: calculatePowerConsumption(speed),
                currentBatteryPercentage: batteryPercentage,
                currentAverageSpeed: averageSpeed,
                currentDistanceTraveled: totalDistanceTraveled,
                currentTripTime: tripStartTime ? (Date.now() - tripStartTime) / 1000 : 0
            });

            // Range calculation function using current data snapshot
            const calculateAndUpdateRange = () => {
                const data = getCurrentData();
                
                const updatedRange = calculateEstimatedRange(
                    data.currentPowerConsumption,
                    data.currentBatteryPercentage,
                    data.currentSpeed,
                    data.currentAverageSpeed,
                    data.currentDistanceTraveled,
                    data.currentTripTime
                );
                
                setEstimatedRange(updatedRange);
                setLastRangeUpdate(Date.now());
                setNextRangeUpdateIn(30); // Reset countdown to 30 seconds
                
                // Enhanced logging with all current data
                console.log(`🔄 Range Update (30s interval):`, {
                    range: `${updatedRange.toFixed(1)}km`,
                    currentSpeed: `${data.currentSpeed.toFixed(1)}km/h`,
                    avgSpeed: `${data.currentAverageSpeed.toFixed(1)}km/h`,
                    distance: `${data.currentDistanceTraveled.toFixed(2)}km`,
                    battery: `${data.currentBatteryPercentage.toFixed(1)}%`,
                    power: `${Math.round(data.currentPowerConsumption)}W`,
                    tripTime: `${Math.floor(data.currentTripTime / 60)}m ${Math.floor(data.currentTripTime % 60)}s`
                });
            };

            // Initial calculation when tracking starts (after 2 seconds to allow GPS to stabilize)
            const initialTimeout = setTimeout(calculateAndUpdateRange, 2000);

            // Then update every 30 seconds with debounced calculation
            const interval = setInterval(() => {
                calculateAndUpdateRange();
            }, 30000);

            return () => {
                clearTimeout(initialTimeout);
                clearInterval(interval);
            };
        } else {
            // Reset range when tracking stops
            setEstimatedRange(0);
            setLastRangeUpdate(null);
        }
    }, [isTracking]); // Only depend on isTracking to prevent unnecessary re-renders

    // Countdown timer for next range update
    useEffect(() => {
        if (isTracking && nextRangeUpdateIn > 0) {
            const countdownTimer = setInterval(() => {
                setNextRangeUpdateIn(prev => Math.max(0, prev - 1));
            }, 1000);

            return () => clearInterval(countdownTimer);
        }
    }, [isTracking, nextRangeUpdateIn]);

    // Reset battery and trip data when starting tracking
    const resetBattery = () => {
        setCurrentVoltage(MAX_BATTERY_VOLTAGE);
        setBatteryPercentage(100);
        setTotalEnergyConsumed(0);
        setTotalDistanceTraveled(0);
        setAverageSpeed(0);
        setSpeedHistory([]);
        setEstimatedRange(0);
        setLastRangeUpdate(null);
        setTripStartTime(Date.now());
    };

    useEffect(() => {
        const loadBikeIcon = async () => {
            const L = await import('leaflet');
            const bikeIcon = L.divIcon({
                html: `<div style="
                    font-size: 32px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.8);
                    filter: drop-shadow(0 0 3px rgba(0,0,0,0.9));
                    transform: translate(-50%, -50%);
                    position: relative;
                    top: 50%;
                    left: 50%;
                ">🚴</div>`,
                className: 'bike-icon',
                iconSize: [64, 64],
                iconAnchor: [32, 32]
            });
            setBikeIcon(bikeIcon);
        };

        loadBikeIcon();
    }, []);

    useEffect(async () => {
        if (route?.length > 0 && plan?.length > 0) {
            const L = await import('leaflet');

            const stopIcon = L.divIcon({
                html: '🍔',
                className: 'stop-icon',
                iconSize: [30, 30]
            });

            const markers = plan.map((item, index) => {
                const distance = parseFloat(item.distance);
                let accumulatedDistance = 0;
                let markerPosition = null;

                for (let i = 1; i < route.length; i++) {
                    const segmentDistance = L.latLng(route[i - 1]).distanceTo(L.latLng(route[i]));
                    accumulatedDistance += segmentDistance;

                    if (accumulatedDistance >= distance * 1000) {
                        markerPosition = route[i];
                        break;
                    }
                }

                return markerPosition ? (
                    <Marker key={index} icon={stopIcon} position={markerPosition}>
                        <Popup>
                            Distance: {item.distance} km<br />
                            Time: {item.time}<br />
                            Possible Recharging: {item.possibleRecharging}Wh
                        </Popup>
                    </Marker>
                ) : null;
            }).filter(marker => marker !== null);

            setPlanMarkers(markers);
        }
    }, [route, plan]);

    const centerRoute = () => {
        if (bounds && mapRef.current) {
            mapRef.current.fitBounds(bounds);
        }
    };

    const toggleMobileMode = () => {
        setIsMobileMode(!isMobileMode);
        // Center on user location when entering mobile mode
        if (!isMobileMode && currentLocation && mapRef.current) {
            mapRef.current.setView(currentLocation, 16);
        }
    };

    const toggleTracking = () => {
        setIsTracking(!isTracking);
        if (!isTracking) {
            // Starting tracking - reset everything
            setSpeed(0);
            setLastPosition(null);
            setLastTimestamp(null);
            resetBattery();
        } else {
            // Stopping tracking - keep current values
            setSpeed(0);
        }
    };

    const MapEvents = () => {
        const map = useMapEvents({
            move: () => {
                map.invalidateSize();
            },
            click: (e) => {
                setCurrentLocation(e.latlng);
            }
        });

        return null;
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.invalidateSize();
        }
    }, [route, bounds]);

    // Enhanced mobile detection with responsive updates
    const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const containerStyle = isMobileMode 
        ? { 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 1000,
            backgroundColor: '#000',
            overflow: 'hidden'
          }
        : {
            position: 'relative',
            width: '100%'
          };

    const mapStyle = isMobileMode 
        ? { height: '100vh', width: '100vw' }
        : { 
            height: isMobileDevice ? '60vh' : '500px', 
            width: '100%',
            minHeight: '300px'
          };

    return (
        <div style={containerStyle}>
            {/* Control Panel */}
            <div style={{
                position: isMobileMode ? 'absolute' : 'relative',
                top: isMobileMode ? (isMobileDevice ? '8px' : '10px') : '0',
                left: isMobileMode ? (isMobileDevice ? '8px' : '10px') : '0',
                right: isMobileMode ? (isMobileDevice ? '8px' : '10px') : 'auto',
                zIndex: 1001,
                background: isMobileMode ? 'rgba(255, 255, 255, 0.95)' : (isMobileDevice ? 'rgba(255, 255, 255, 0.9)' : 'transparent'),
                padding: isMobileMode ? (isMobileDevice ? '12px' : '10px') : (isMobileDevice ? '12px' : '10px 0'),
                borderRadius: isMobileMode ? '12px' : (isMobileDevice ? '8px' : '0'),
                display: 'flex',
                gap: isMobileDevice ? '8px' : '10px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: isMobileDevice && !isMobileMode ? 'center' : 'flex-start',
                boxShadow: (isMobileMode || isMobileDevice) ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}>
                <button 
                    onClick={toggleMobileMode}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: isMobileMode ? '#ff6b6b' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {isMobileMode ? '📱 Exit Mobile Mode' : '📱 Mobile Mode'}
                </button>
                
                <button 
                    onClick={toggleTracking}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: isTracking ? '#ff6b6b' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {isTracking ? '⏹️ Stop GPS' : '📍 Start GPS'}
                </button>

                {!isMobileMode && (
                    <button 
                        onClick={centerRoute}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#9C27B0',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        🎯 Center Route
                    </button>
                )}
            </div>

            {/* Compact Mobile Dashboard - always visible */}
            {(isMobileMode || (!isMobileMode && isTracking)) && (
                <div style={{
                    position: isMobileMode ? 'fixed' : 'relative',
                    bottom: isMobileMode ? '10px' : 'auto',
                    top: isMobileMode ? 'auto' : '10px',
                    left: isMobileMode ? '10px' : 'auto',
                    right: isMobileMode ? '10px' : '0',
                    zIndex: 1002,
                    background: 'rgba(0, 0, 0, 0.95)',
                    color: 'white',
                    padding: isMobileMode ? '12px' : '15px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                    border: isMobileMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                    {isMobileMode ? (
                        // Compact layout for mobile - always show all metrics
                        <div>
                            {/* Top row: Speed and Power */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                textAlign: 'center',
                                marginBottom: isTracking ? '12px' : '0'
                            }}>
                                {/* Speed */}
                                <div>
                                    <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>SPEED</div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                        {speed.toFixed(1)}
                                    </div>
                                    <div style={{ fontSize: '8px', opacity: 0.6 }}>km/h</div>
                                </div>
                                
                                {/* Power */}
                                <div>
                                    <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>POWER</div>
                                    <div style={{ 
                                        fontSize: '18px', 
                                        fontWeight: 'bold', 
                                        fontFamily: 'monospace',
                                        color: powerConsumption > maxMotorPower * 0.8 ? '#ff6b6b' : '#4CAF50'
                                    }}>
                                        {Math.round(powerConsumption)}
                                    </div>
                                    <div style={{ fontSize: '8px', opacity: 0.6 }}>watts</div>
                                </div>
                            </div>
                            
                            {/* Bottom row: Battery, Distance, Range (only when tracking) */}
                            {isTracking && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '12px',
                                    textAlign: 'center',
                                    borderTop: '1px solid rgba(255,255,255,0.2)',
                                    paddingTop: '10px'
                                }}>
                                    {/* Battery */}
                                    <div>
                                        <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '1px' }}>BATTERY</div>
                                        <div style={{ 
                                            fontSize: '13px', 
                                            fontWeight: 'bold', 
                                            fontFamily: 'monospace',
                                            color: batteryPercentage < 20 ? '#ff6b6b' : batteryPercentage < 50 ? '#FFA726' : '#4CAF50'
                                        }}>
                                            {currentVoltage.toFixed(1)}V
                                        </div>
                                        <div style={{ fontSize: '7px', opacity: 0.6 }}>
                                            {batteryPercentage.toFixed(0)}%
                                        </div>
                                    </div>
                                    
                                    {/* Distance */}
                                    <div>
                                        <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '1px' }}>DISTANCE</div>
                                        <div style={{ 
                                            fontSize: '13px', 
                                            fontWeight: 'bold', 
                                            fontFamily: 'monospace',
                                            color: '#4FC3F7'
                                        }}>
                                            {totalDistanceTraveled.toFixed(1)}
                                        </div>
                                        <div style={{ fontSize: '7px', opacity: 0.6 }}>km</div>
                                    </div>
                                    
                                    {/* Range */}
                                    <div>
                                        <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '1px' }}>RANGE</div>
                                        <div style={{ 
                                            fontSize: '13px', 
                                            fontWeight: 'bold', 
                                            fontFamily: 'monospace',
                                            color: estimatedRange < 5 ? '#ff6b6b' : estimatedRange < 15 ? '#FFA726' : '#4CAF50'
                                        }}>
                                            {estimatedRange.toFixed(1)}
                                        </div>
                                        <div style={{ fontSize: '7px', opacity: 0.6 }}>
                                            km left
                                            {nextRangeUpdateIn > 0 && (
                                                <div style={{ fontSize: '6px', opacity: 0.4, marginTop: '1px' }}>
                                                    ↻{nextRangeUpdateIn}s
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Vertical layout for desktop
                        <>
                            {/* Speed Display */}
                            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                                <div style={{ fontSize: '12px', marginBottom: '5px', opacity: 0.8 }}>SPEED</div>
                                <div style={{ 
                                    fontSize: '22px', 
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    marginBottom: '8px'
                                }}>
                                    {speed.toFixed(1)}
                                </div>
                                <div style={{ fontSize: '11px', marginBottom: '12px', opacity: 0.8 }}>km/h</div>
                            </div>
                            
                            {/* Power Consumption Display */}
                            <div style={{ 
                                borderTop: '1px solid rgba(255,255,255,0.3)', 
                                paddingTop: '8px',
                                marginTop: '8px',
                                marginBottom: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '11px', marginBottom: '3px', opacity: 0.8 }}>POWER</div>
                                <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    color: powerConsumption > maxMotorPower * 0.8 ? '#ff6b6b' : '#4CAF50'
                                }}>
                                    {Math.round(powerConsumption)}
                                </div>
                                <div style={{ fontSize: '10px', opacity: 0.8 }}>watts</div>
                            </div>

                            {isTracking && (
                                <>
                                    {/* Battery, Distance, Range in compact format */}
                                    <div style={{ 
                                        borderTop: '1px solid rgba(255,255,255,0.3)', 
                                        paddingTop: '8px',
                                        marginTop: '8px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        gap: '8px',
                                        textAlign: 'center'
                                    }}>
                                        {/* Battery */}
                                        <div>
                                            <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '2px' }}>BATTERY</div>
                                            <div style={{ 
                                                fontSize: '12px', 
                                                fontWeight: 'bold', 
                                                fontFamily: 'monospace',
                                                color: batteryPercentage < 20 ? '#ff6b6b' : batteryPercentage < 50 ? '#FFA726' : '#4CAF50'
                                            }}>
                                                {batteryPercentage.toFixed(0)}%
                                            </div>
                                            <div style={{ fontSize: '7px', opacity: 0.6 }}>
                                                {currentVoltage.toFixed(1)}V
                                            </div>
                                        </div>
                                        
                                        {/* Distance */}
                                        <div>
                                            <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '2px' }}>DISTANCE</div>
                                            <div style={{ 
                                                fontSize: '12px', 
                                                fontWeight: 'bold', 
                                                fontFamily: 'monospace',
                                                color: '#4FC3F7'
                                            }}>
                                                {totalDistanceTraveled.toFixed(1)}
                                            </div>
                                            <div style={{ fontSize: '7px', opacity: 0.6 }}>km</div>
                                        </div>
                                        
                                        {/* Range */}
                                        <div>
                                            <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '2px' }}>RANGE</div>
                                            <div style={{ 
                                                fontSize: '12px', 
                                                fontWeight: 'bold', 
                                                fontFamily: 'monospace',
                                                color: estimatedRange < 5 ? '#ff6b6b' : estimatedRange < 15 ? '#FFA726' : '#4CAF50'
                                            }}>
                                                {estimatedRange.toFixed(1)}
                                            </div>
                                            <div style={{ fontSize: '7px', opacity: 0.6 }}>km left</div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {isTracking && (
                                <div style={{ 
                                    fontSize: '10px', 
                                    marginTop: '8px',
                                    color: '#4CAF50',
                                    borderTop: '1px solid rgba(255,255,255,0.2)',
                                    paddingTop: '6px',
                                    textAlign: 'center'
                                }}>
                                    🟢 GPS Active
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <div className="map-container" style={mapStyle}>
                {route.length > 0 && bounds && (
                    <Suspense fallback={<div>Loading map...</div>}>
                        <MapContainer
                            bounds={bounds}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                            whenCreated={(mapInstance) => {
                                mapRef.current = mapInstance;
                            }}
                            whenReady={centerRoute}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Polyline positions={route} color="orange" />
                            {currentLocation && bikeIcon && (
                                <Marker position={currentLocation} icon={bikeIcon}>
                                    <Popup>
                                        You are here<br/>
                                        Speed: {speed.toFixed(1)} km/h<br/>
                                        Power: {Math.round(powerConsumption)} watts
                                        {isTracking && (
                                            <>
                                                <br/>
                                                Battery: {currentVoltage.toFixed(1)}V ({batteryPercentage.toFixed(0)}%)<br/>
                                                Range: {estimatedRange.toFixed(1)} km left
                                                {averageSpeed > 0 && (
                                                    <>
                                                        <br/>
                                                        Avg Speed: {averageSpeed.toFixed(1)} km/h
                                                    </>
                                                )}
                                                {totalDistanceTraveled > 0.1 && (
                                                    <>
                                                        <br/>
                                                        Distance: {totalDistanceTraveled.toFixed(2)} km
                                                    </>
                                                )}
                                                <br/>
                                                🟢 GPS Tracking Active
                                            </>
                                        )}
                                        {!isTracking && <br/>}
                                        {!isTracking && 'Click "Start GPS" to track battery'}
                                    </Popup>
                                </Marker>
                            )}
                            {planMarkers}
                            <MapEvents />
                        </MapContainer>
                    </Suspense>
                )}
            </div>

            {/* Exit button for mobile mode */}
            {isMobileMode && (
                <button 
                    onClick={toggleMobileMode}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '12px 24px',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        zIndex: 1001,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    ❌ Exit Mobile Mode
                </button>
            )}
        </div>
    );
};

export default RouteVisualizer;
