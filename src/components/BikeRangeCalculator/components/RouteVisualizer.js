import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Polyline = lazy(() => import('react-leaflet').then(module => ({ default: module.Polyline })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

const RouteVisualizer = ({ gpxString, plan }) => {
    const [route, setRoute] = useState([]);
    const [bounds, setBounds] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [bikeIcon, setBikeIcon] = useState(null);
    const [planMarkers, setPlanMarkers] = useState([]);
    const mapRef = useRef(null);

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

    useEffect(() => {
        const loadBikeIcon = async () => {
            const L = await import('leaflet');
            const bikeIcon = L.divIcon({
                html: '🚴',
                className: 'bike-icon',
                iconSize: [30, 30]
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

    return (
        <div>
            <div className="map-container" style={{ height: '500px', width: '100%' }}>
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
                                    <Popup>You are here</Popup>
                                </Marker>
                            )}
                            {planMarkers}
                            <MapEvents />
                        </MapContainer>
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default RouteVisualizer;
