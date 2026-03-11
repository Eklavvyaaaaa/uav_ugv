"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LocationState, GeofenceConfig } from "../types/Location";

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// A red icon for spoofed statuses
const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  config: GeofenceConfig;
  locationState: LocationState;
}

// Helper component to recenter map when device moves
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Map({ config, locationState }: MapProps) {
  const centerPos: [number, number] = [config.center.lat, config.center.lng];
  const devicePos: [number, number] = locationState.currentLocation 
    ? [locationState.currentLocation.lat, locationState.currentLocation.lng] 
    : centerPos;

  // Visual cues based on the engine's real-time state
  const isSpoofed = locationState.spoofingStatus !== 'SAFE';
  const isInside = locationState.geofenceStatus === 'INSIDE';

  const circleColor = isInside ? "#3b82f6" : "#f43f5e"; // Blue / Red
  const markerIcon = isSpoofed ? redIcon : icon;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-0 relative">
      <MapContainer
        center={centerPos}
        zoom={16}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Circle
          center={centerPos}
          radius={config.radius}
          pathOptions={{ color: circleColor, fillColor: circleColor, fillOpacity: 0.2 }}
        />
        <Marker position={devicePos} icon={markerIcon}>
          <Popup>
            <div className="font-mono text-xs">
              <strong>Tracked Device</strong><br/>
              Status: {locationState.geofenceStatus}<br/>
              Sensor: {locationState.spoofingStatus}
            </div>
          </Popup>
        </Marker>
        <MapUpdater center={centerPos} />
      </MapContainer>
    </div>
  );
}
