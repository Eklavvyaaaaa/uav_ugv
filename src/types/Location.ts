export interface Coordinate {
  lat: number;
  lng: number;
}

export interface GeofenceConfig {
  center: Coordinate;
  radius: number; // in meters
  allowedSpeed?: number; // max realistic speed in m/s
}

export type GeofenceStatus = 'INSIDE' | 'OUTSIDE' | 'BREACH';
export type SpoofingStatus = 'SAFE' | 'SUSPICIOUS' | 'LIKELY_SPOOFING';

export interface LocationState {
  currentLocation: Coordinate | null;
  previousLocation: Coordinate | null;
  distanceFromCenter: number; // in meters
  speed: number; // in m/s
  geofenceStatus: GeofenceStatus;
  spoofingStatus: SpoofingStatus;
  lastUpdateTime: number | null; // epoch timestamp
}
