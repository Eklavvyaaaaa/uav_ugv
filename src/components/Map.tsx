"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  center: [number, number];
  geofenceRadius: number;
  devicePosition: [number, number];
  onStatusChange?: (isInside: boolean) => void;
}

// Helper component to recenter map when device moves
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Map({ center, geofenceRadius, devicePosition, onStatusChange }: MapProps) {
  useEffect(() => {
    // Calculate distance between center and device position
    const distance = L.latLng(center).distanceTo(L.latLng(devicePosition));
    const isInside = distance <= geofenceRadius;
    if (onStatusChange) {
      onStatusChange(isInside);
    }
  }, [center, devicePosition, geofenceRadius, onStatusChange]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-0 relative">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Circle
          center={center}
          radius={geofenceRadius}
          pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.2 }}
        />
        <Marker position={devicePosition} icon={icon}>
          <Popup>Tracked Device</Popup>
        </Marker>
        <MapUpdater center={center} />
      </MapContainer>
    </div>
  );
}
