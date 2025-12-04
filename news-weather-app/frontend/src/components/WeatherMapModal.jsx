import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to update map center when coordinates change
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 10);
    }, [center, map]);
    return null;
};

const WeatherMapModal = ({ isOpen, onClose, lat, lon, city, type }) => {
    if (!isOpen) return null;

    const position = [lat, lon];

    // Determine layer based on type (wind, clouds, etc.) - For now using standard OSM but could use OpenWeatherMap layers if API key was available
    // Since we don't have a tile API key for weather layers handy, we'll show the standard map with the location.

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-4xl h-[80vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[1000] p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="absolute top-4 left-4 z-[1000] px-4 py-2 bg-black/50 text-white rounded-xl backdrop-blur-md border border-white/10">
                            <h3 className="font-display font-bold text-lg">{city}</h3>
                            <p className="text-sm text-gray-300 capitalize">{type} Map</p>
                        </div>

                        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    {city}
                                </Popup>
                            </Marker>
                            <MapUpdater center={position} />
                        </MapContainer>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WeatherMapModal;
