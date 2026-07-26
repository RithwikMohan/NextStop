// Geolocation & Spatial Haversine Distance Calculations

/**
 * Calculates Great Circle distance between two lat/lng coordinates in meters
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}

/**
 * Formats distance in meters into human readable string (m or km)
 */
export function formatDistance(meters) {
  if (meters === undefined || meters === null) return '0 m';
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Calculates route details between origin and destination on a metro line
 */
export function calculateRouteDetails(stations, originId, destId) {
  if (!stations || !originId || !destId) return null;

  const originIndex = stations.findIndex((s) => s.id === originId);
  const destIndex = stations.findIndex((s) => s.id === destId);

  if (originIndex === -1 || destIndex === -1 || originIndex === destIndex) {
    return null;
  }

  const isForward = originIndex < destIndex;
  const routeStations = isForward
    ? stations.slice(originIndex, destIndex + 1)
    : stations.slice(destIndex, originIndex + 1).reverse();

  // Calculate total route distance in meters
  let totalDistanceMeters = 0;
  for (let i = 0; i < routeStations.length - 1; i++) {
    const d = calculateHaversineDistance(
      routeStations[i].lat,
      routeStations[i].lng,
      routeStations[i + 1].lat,
      routeStations[i + 1].lng
    );
    totalDistanceMeters += d;
  }

  // Preceding station is the stop right before destination
  const precedingStationIndex = isForward ? destIndex - 1 : destIndex + 1;
  const precedingStation = stations[precedingStationIndex] || routeStations[Math.max(0, routeStations.length - 2)];

  // Estimated time: ~2.2 minutes per stop average in metro
  const stopCount = routeStations.length - 1;
  const estimatedMinutes = Math.max(1, Math.round(stopCount * 2.2));

  return {
    origin: stations[originIndex],
    destination: stations[destIndex],
    precedingStation,
    routeStations,
    isForward,
    totalDistanceMeters,
    stopCount,
    estimatedMinutes,
    originIndex,
    destIndex,
  };
}

/**
 * Determines nearest station to user's GPS coordinates
 */
export function findNearestStation(userLat, userLng, stations) {
  if (!userLat || !userLng || !stations || stations.length === 0) return null;

  let minDistance = Infinity;
  let nearest = null;

  stations.forEach((st) => {
    const dist = calculateHaversineDistance(userLat, userLng, st.lat, st.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = { station: st, distanceMeters: dist };
    }
  });

  return nearest;
}
