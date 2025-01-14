import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteVisualizer = ({ gpxString }) => {
    const [route, setRoute] = useState([]);
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(13);
    const mapRef = useRef();

    useEffect(() => {
        const parseGPX = () => {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxString, 'application/xml');
                const trackPoints = Array.from(xmlDoc.getElementsByTagName('trkpt')).map(point => [
                    parseFloat(point.getAttribute('lat')),
                    parseFloat(point.getAttribute('lon'))
                ]);
                setRoute(trackPoints);

                if (trackPoints.length > 0) {
                    const bounds = trackPoints.reduce((bounds, point) => {
                        return bounds.extend(point);
                    }, L.latLngBounds(trackPoints[0], trackPoints[0]));
                    setCenter(bounds.getCenter());
                    setZoom(13); // You can adjust the zoom level as needed
                }
            } catch (error) {
                console.error('Error parsing GPX:', error);
            }
        };

        parseGPX();
    }, [gpxString]);

    return (
        <div className="map-container" style={{ height: '500px', width: '100%' }}>
            <MapContainer center={center} zoom={zoom} ref={mapRef} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {route.length > 0 && <Polyline positions={route} color="blue" />}
            </MapContainer>
        </div>
    );
};

export default RouteVisualizer;
