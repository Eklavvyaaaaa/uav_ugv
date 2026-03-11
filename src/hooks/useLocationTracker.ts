import { useState, useCallback } from 'react';
import { Coordinate, GeofenceConfig, LocationState } from '../types/Location';
import { calculateDistance, checkGeofence, detectSpoofing } from '../utils/locationEngine';

export function useLocationTracker(initialConfig: GeofenceConfig, initialDevicePos?: Coordinate) {
  const [config, setConfig] = useState<GeofenceConfig>(initialConfig);
  
  const [state, setState] = useState<LocationState>(() => ({
    currentLocation: initialDevicePos || null,
    previousLocation: null,
    distanceFromCenter: initialDevicePos 
      ? calculateDistance(initialDevicePos, initialConfig.center) 
      : 0,
    speed: 0,
    geofenceStatus: initialDevicePos 
      ? checkGeofence(initialDevicePos, initialConfig) 
      : 'INSIDE',
    spoofingStatus: 'SAFE',
    lastUpdateTime: initialDevicePos ? Date.now() : null,
  }));

  const updateLocation = useCallback((lat: number, lng: number) => {
    setState((prevState) => {
      const now = Date.now();
      const newCoord: Coordinate = { lat, lng };
      
      const distanceFromCenter = calculateDistance(newCoord, config.center);
      const newGeofenceStatus = checkGeofence(newCoord, config, prevState.geofenceStatus);

      // If we don't have a previous location, we can't calculate speed or spoofing yet
      if (!prevState.currentLocation || !prevState.lastUpdateTime) {
        return {
          currentLocation: newCoord,
          previousLocation: prevState.currentLocation, // might be null
          distanceFromCenter,
          speed: 0,
          geofenceStatus: newGeofenceStatus,
          spoofingStatus: 'SAFE',
          lastUpdateTime: now,
        };
      }

      const timeDeltaSeconds = (now - prevState.lastUpdateTime) / 1000;
      
      const { status: newSpoofingStatus, speed } = detectSpoofing(
        prevState.currentLocation,
        newCoord,
        timeDeltaSeconds
      );

      return {
        currentLocation: newCoord,
        previousLocation: prevState.currentLocation,
        distanceFromCenter,
        speed,
        geofenceStatus: newGeofenceStatus,
        spoofingStatus: newSpoofingStatus,
        lastUpdateTime: now,
      };
    });
  }, [config]);

  const setGeofenceConfig = useCallback((newConfig: GeofenceConfig) => {
    setConfig(newConfig);
    // Re-evaluate current state based on new config if we have a current location
    setState((prevState) => {
      if (!prevState.currentLocation) return prevState;
      
      const newGeofenceStatus = checkGeofence(prevState.currentLocation, newConfig, prevState.geofenceStatus);
      const newDistanceFromCenter = calculateDistance(prevState.currentLocation, newConfig.center);
      
      return {
        ...prevState,
        distanceFromCenter: newDistanceFromCenter,
        geofenceStatus: newGeofenceStatus,
      };
    });
  }, []);

  return {
    state,
    config,
    updateLocation,
    setGeofenceConfig,
  };
}
