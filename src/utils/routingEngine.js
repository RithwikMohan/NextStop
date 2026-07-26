// Smart Multi-City Routing Engine & Official Metro Fare Calculator

import { METRO_DATA } from '../data/metroData';
import { calculateHaversineDistance } from './geoUtils';

export function getAllStations(cityId = 'hyderabad') {
  const city = METRO_DATA[cityId] || METRO_DATA.hyderabad;
  const allMap = new Map();

  city.lines.forEach((line) => {
    line.stations.forEach((st, idx) => {
      const stationNumber = idx + 1;
      if (!allMap.has(st.name)) {
        allMap.set(st.name, {
          ...st,
          lines: [{ lineId: line.id, lineColor: line.color, lineName: line.name, stationNumber }],
        });
      } else {
        const existing = allMap.get(st.name);
        existing.lines.push({ lineId: line.id, lineColor: line.color, lineName: line.name, stationNumber });
        existing.isInterchange = true;
      }
    });
  });

  return Array.from(allMap.values());
}

// City-Specific Official Metro Fare Calculators
export function calculateCityOfficialFare(cityId, distanceKm) {
  if (distanceKm <= 0) return 0;

  switch (cityId) {
    case 'delhi':
      if (distanceKm <= 2.0) return 10;
      if (distanceKm <= 5.0) return 20;
      if (distanceKm <= 12.0) return 30;
      if (distanceKm <= 21.0) return 40;
      if (distanceKm <= 32.0) return 50;
      return 60;

    case 'bengaluru':
      if (distanceKm <= 2.0) return 10;
      if (distanceKm <= 4.0) return 15;
      if (distanceKm <= 6.0) return 20;
      if (distanceKm <= 8.0) return 25;
      if (distanceKm <= 10.0) return 30;
      if (distanceKm <= 15.0) return 45;
      return 60;

    case 'mumbai':
      if (distanceKm <= 3.0) return 10;
      if (distanceKm <= 12.0) return 20;
      if (distanceKm <= 18.0) return 30;
      if (distanceKm <= 24.0) return 40;
      return 50;

    case 'chennai':
      if (distanceKm <= 2.0) return 10;
      if (distanceKm <= 5.0) return 20;
      if (distanceKm <= 9.0) return 30;
      if (distanceKm <= 14.0) return 40;
      return 50;

    case 'kolkata':
      if (distanceKm <= 2.0) return 5;
      if (distanceKm <= 5.0) return 10;
      if (distanceKm <= 10.0) return 15;
      if (distanceKm <= 15.0) return 20;
      if (distanceKm <= 20.0) return 25;
      return 30;

    case 'hyderabad':
    default:
      if (distanceKm <= 2.0) return 11;
      if (distanceKm <= 4.0) return 17;
      if (distanceKm <= 6.0) return 28;
      if (distanceKm <= 9.0) return 37;
      if (distanceKm <= 12.0) return 47;
      if (distanceKm <= 15.0) return 51;
      if (distanceKm <= 18.0) return 56;
      if (distanceKm <= 21.0) return 61;
      if (distanceKm <= 24.0) return 65;
      return 69;
  }
}

export function calculateStationsDistanceKm(stationsList) {
  if (!stationsList || stationsList.length < 2) return 0;
  let totalMeters = 0;
  for (let i = 0; i < stationsList.length - 1; i++) {
    totalMeters += calculateHaversineDistance(
      stationsList[i].lat,
      stationsList[i].lng,
      stationsList[i + 1].lat,
      stationsList[i + 1].lng
    );
  }
  return totalMeters / 1000;
}

export const INTERCHANGE_DIRECTIONS = {
  Ameerpet: {
    hubName: 'Ameerpet Interchange Hub (Hyderabad)',
    getInstructions: (fromLine, toLine) => {
      if (fromLine === 'blue' && toLine === 'red') {
        return 'Deboard Blue Line (Level 2) ➔ Take Escalator UP to Level 3 (Platforms 3 & 4 for Red Line towards Miyapur / LB Nagar).';
      }
      return 'Deboard Red Line (Level 3) ➔ Take Escalator DOWN to Level 2 (Platforms 1 & 2 for Blue Line towards Raidurg / Nagole).';
    },
  },
  'MG Bus Station (MGBS)': {
    hubName: 'MGBS Interchange Hub (Hyderabad)',
    getInstructions: (fromLine, toLine) =>
      'Deboard Red Line (Level 2) ➔ Take Escalator UP to Level 3 for Green Line towards JBS Parade Ground.',
  },
  'Rajiv Chowk (Connaught Place)': {
    hubName: 'Rajiv Chowk Interchange Hub (Delhi)',
    getInstructions: (fromLine, toLine) =>
      'Deboard Yellow Line (Upper Level) ➔ Follow Interchange Ramp down to Blue Line Platforms (Lower Level).',
  },
  'Kashmere Gate': {
    hubName: 'Kashmere Gate 3-Line Interchange Hub (Delhi)',
    getInstructions: (fromLine, toLine) =>
      'Transfer Hub for Red, Yellow & Violet Lines. Follow floor color codes to transfer platform.',
  },
  'Nadaprabhu Kempegowda Station (Majestic)': {
    hubName: 'Majestic Interchange Hub (Bengaluru)',
    getInstructions: (fromLine, toLine) =>
      'Deboard Purple Line ➔ Take Escalator to Lower Underground Level for Green Line towards Nagasandra / Silk Institute.',
  },
  'Esplanade': {
    hubName: 'Esplanade Interchange Hub (Kolkata)',
    getInstructions: (fromLine, toLine) =>
      'Deboard Line 1 (North-South) ➔ Take Underpass Walkway to Line 2 (East-West Underwater Metro).',
  },
};

export function findSmartRoute(originName, destName, cityId = 'hyderabad') {
  if (!originName || !destName || originName === destName) return null;

  const city = METRO_DATA[cityId] || METRO_DATA.hyderabad;
  const lines = city.lines;

  // Direct line check
  for (const line of lines) {
    const origIdx = line.stations.findIndex((s) => s.name === originName);
    const destIdx = line.stations.findIndex((s) => s.name === destName);

    if (origIdx !== -1 && destIdx !== -1) {
      const isForward = origIdx < destIdx;
      const routeStations = isForward
        ? line.stations.slice(origIdx, destIdx + 1)
        : line.stations.slice(destIdx, origIdx + 1).reverse();

      const stopCount = routeStations.length - 1;
      const distKm = calculateStationsDistanceKm(routeStations);
      const precedingStation = routeStations[Math.max(0, routeStations.length - 2)];

      return {
        isDirect: true,
        lineId: line.id,
        lineColor: line.color,
        lineName: line.name,
        origin: routeStations[0],
        destination: routeStations[routeStations.length - 1],
        precedingStation,
        routeStations,
        stopCount,
        distKm: distKm.toFixed(1),
        estimatedMinutes: Math.max(1, Math.round(stopCount * 2.2)),
        fare: calculateCityOfficialFare(cityId, distKm),
        interchange: null,
      };
    }
  }

  // Multi-line interchange check
  let originLine = null;
  let destLine = null;

  lines.forEach((line) => {
    if (line.stations.some((s) => s.name === originName) && !originLine) originLine = line;
    if (line.stations.some((s) => s.name === destName) && !destLine) destLine = line;
  });

  if (!originLine || !destLine) return null;

  let transferStationName = 'Ameerpet';
  if (cityId === 'delhi') transferStationName = 'Rajiv Chowk (Connaught Place)';
  if (cityId === 'bengaluru') transferStationName = 'Nadaprabhu Kempegowda Station (Majestic)';
  if (cityId === 'kolkata') transferStationName = 'Esplanade';

  const leg1OrigIdx = originLine.stations.findIndex((s) => s.name === originName);
  const leg1HubIdx = originLine.stations.findIndex((s) => s.name.includes(transferStationName.split(' ')[0]));

  const isLeg1Forward = leg1OrigIdx < leg1HubIdx;
  const leg1Stations = isLeg1Forward
    ? originLine.stations.slice(leg1OrigIdx, leg1HubIdx + 1)
    : originLine.stations.slice(leg1HubIdx, leg1OrigIdx + 1).reverse();

  const leg2HubIdx = destLine.stations.findIndex((s) => s.name.includes(transferStationName.split(' ')[0]));
  const leg2DestIdx = destLine.stations.findIndex((s) => s.name === destName);

  const isLeg2Forward = leg2HubIdx < leg2DestIdx;
  const leg2Stations = isLeg2Forward
    ? destLine.stations.slice(leg2HubIdx, leg2DestIdx + 1)
    : destLine.stations.slice(leg2DestIdx, leg2HubIdx + 1).reverse();

  const totalStopCount = (leg1Stations.length - 1) + (leg2Stations.length - 1);
  const combinedStations = [...leg1Stations, ...leg2Stations.slice(1)];
  const totalDistKm = calculateStationsDistanceKm(combinedStations);

  const transferInfo = INTERCHANGE_DIRECTIONS[transferStationName] || INTERCHANGE_DIRECTIONS['Ameerpet'];
  const platformInstructions = transferInfo.getInstructions(originLine.id, destLine.id);

  const leg1PrecedingStation = leg1Stations[Math.max(0, leg1Stations.length - 2)];
  const leg2PrecedingStation = leg2Stations[Math.max(0, leg2Stations.length - 2)];

  return {
    isDirect: false,
    lineId: originLine.id,
    lineColor: originLine.color,
    origin: leg1Stations[0],
    destination: leg2Stations[leg2Stations.length - 1],
    routeStations: combinedStations,
    leg1: {
      line: originLine,
      stations: leg1Stations,
      precedingStation: leg1PrecedingStation,
      stopCount: leg1Stations.length - 1,
    },
    leg2: {
      line: destLine,
      stations: leg2Stations,
      precedingStation: leg2PrecedingStation,
      stopCount: leg2Stations.length - 1,
    },
    precedingStation: leg1PrecedingStation,
    finalPrecedingStation: leg2PrecedingStation,
    transferStationName,
    platformInstructions,
    stopCount: totalStopCount,
    distKm: totalDistKm.toFixed(1),
    estimatedMinutes: Math.round(totalStopCount * 2.2) + 4,
    fare: calculateCityOfficialFare(cityId, totalDistKm),
  };
}
