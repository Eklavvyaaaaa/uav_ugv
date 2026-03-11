import { Coordinate, GeofenceConfig, GeofenceStatus, SpoofingStatus } from '../types/Location';

const EARTH_RADIUS_METERS = 6371000;

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 * @returns distance in meters
 */
export function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;

  const dLat = toRadian(coord2.lat - coord1.lat);
  const dLng = toRadian(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(coord1.lat)) *
      Math.cos(toRadian(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

/**
 * Calculates the speed in meters per second.
 */
export function calculateSpeed(distanceMeters: number, timeDeltaSeconds: number): number {
  if (timeDeltaSeconds <= 0) return 0;
  return distanceMeters / timeDeltaSeconds;
}

/**
 * Checks the geofence status of a location.
 * @param location Current location
 * @param config Geofence config
 * @param previousStatus The previous geofence status to detect breaches
 */
export function checkGeofence(
  location: Coordinate,
  config: GeofenceConfig,
  previousStatus: GeofenceStatus = 'INSIDE'
): GeofenceStatus {
  const distance = calculateDistance(location, config.center);
  const isCurrentlyInside = distance <= config.radius;

  if (isCurrentlyInside) {
    return 'INSIDE';
  }

  // If we were previously inside but are now outside, it's a breach.
  if (previousStatus === 'INSIDE') {
    return 'BREACH';
  }

  return 'OUTSIDE';
}

/**
 * Detects location spoofing based on distance jumps and impossible speeds.
 * @param previousLocation The last recorded valid location
 * @param currentLocation The newly provided location
 * @param timeDeltaSeconds Time difference between updates
 */
export function detectSpoofing(
  previousLocation: Coordinate,
  currentLocation: Coordinate,
  timeDeltaSeconds: number
): { status: SpoofingStatus; speed: number } {
  const distance = calculateDistance(previousLocation, currentLocation);
  
  // If time elapsed is essentially zero but distance moved is significant, this is virtually teleportation.
  // Using a 1 second minimum prevents division by zero anomalies in burst updates
  const safeTimeDelta = Math.max(timeDeltaSeconds, 1.0);
  const calculatedSpeed = calculateSpeed(distance, safeTimeDelta);

  // Constants (heuristics)
  const MAX_REALISTIC_SPEED_MS = 340; // ~1200 km/h (speed of sound/fast aircraft)
  const SUSPICIOUS_SPEED_MS = 60;     // ~216 km/h (unlikely for typical ground vehicles)

  if (calculatedSpeed > MAX_REALISTIC_SPEED_MS) {
    return { status: 'LIKELY_SPOOFING', speed: calculatedSpeed };
  }

  if (calculatedSpeed > SUSPICIOUS_SPEED_MS) {
    return { status: 'SUSPICIOUS', speed: calculatedSpeed };
  }

  return { status: 'SAFE', speed: calculatedSpeed };
}
