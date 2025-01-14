import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Polyline = lazy(() => import('react-leaflet').then(module => ({ default: module.Polyline })));

const RouteVisualizer = ({ gpxString }) => {
    const [route, setRoute] = useState([]);
    const [bounds, setBounds] = useState(null);
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

    const centerRoute = () => {
        if (bounds && mapRef.current) {
            mapRef.current.fitBounds(bounds);
        }
    };

    const MapEvents = () => {
        const map = useMapEvents({
            move: () => {
                map.invalidateSize();
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
                            <Polyline positions={route} color="blue" />
                            <MapEvents />
                        </MapContainer>
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default RouteVisualizer;
