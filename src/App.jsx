import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FavoritesBar from './components/FavoritesBar';
import UniversalStationPicker from './components/UniversalStationPicker';
import AlarmSettings from './components/AlarmSettings';
import LiveTracker from './components/LiveTracker';
import SimulatorControls from './components/SimulatorControls';
import AlarmModal from './components/AlarmModal';
import MetroMapModal from './components/MetroMapModal';

import { findSmartRoute } from './utils/routingEngine';
import { calculateHaversineDistance } from './utils/geoUtils';
import { audioAlarm } from './utils/audioAlarm';
import { requestWakeLock, releaseWakeLock } from './utils/wakeLock';
import { Navigation, Sparkles, Heart } from 'lucide-react';

// SETTING: Toggle to show or hide simulator mode for project presentation vs public deployment
const ENABLE_SIMULATOR_DEMO = true;

export default function App() {
  const [selectedCityId, setSelectedCityId] = useState('hyderabad');

  // Unified Boarding & Destination State
  const [originName, setOriginName] = useState('Raidurg');
  const [destName, setDestName] = useState('Erragadda');

  // Alarm Preferences State
  const [triggerMode, setTriggerMode] = useState('1_stop_before');
  const [soundType, setSoundType] = useState('metro_chime');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Tracking & Two-Stage Alarm State
  const [isTracking, setIsTracking] = useState(false);
  const [isSimulator, setIsSimulator] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [alarmStage, setAlarmStage] = useState('stage1');

  // Telemetry & UI
  const [distanceToAlert, setDistanceToAlert] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [alarmModalOpen, setAlarmModalOpen] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const watchIdRef = useRef(null);
  const simTimerRef = useRef(null);

  // Sync document body class when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  // Compute smart route
  const route = findSmartRoute(originName, destName, selectedCityId);

  // Quick favorite selection
  const handleSelectFavorite = (fav) => {
    if (fav.cityId !== selectedCityId) {
      setSelectedCityId(fav.cityId);
    }
    setOriginName(fav.originId === 'hyd_b23' ? 'Nagole' : fav.originId === 'hyd_r1' ? 'Miyapur' : 'Raidurg');
    setDestName(fav.destId === 'hyd_b2' ? 'HITEC City' : fav.destId === 'hyd_r11' ? 'Ameerpet' : 'Erragadda');
  };

  // Swap Origin and Destination
  const handleSwap = () => {
    const temp = originName;
    setOriginName(destName);
    setDestName(temp);
  };

  // Start Tracking
  const handleStartTracking = (asSimulator = false) => {
    if (!route) return;

    audioAlarm.initContext();
    requestWakeLock().then((active) => setWakeLockActive(active));

    setIsSimulator(asSimulator);
    setIsTracking(true);
    setCurrentStationIndex(0);
    setAlarmStage('stage1');
    setAlarmModalOpen(false);

    if (asSimulator) {
      setIsSimulating(true);
    } else {
      if ('geolocation' in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userSpeed = position.coords.speed || 0;
            setSpeedKmh(Math.round(userSpeed * 3.6));

            checkGpsAlarmTrigger(userLat, userLng);
          },
          (err) => console.warn('GPS error:', err.message),
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
        );
      } else {
        alert('Geolocation is not supported by your device browser.');
      }
    }
  };

  // Stop Tracking
  const handleStopTracking = () => {
    setIsTracking(false);
    setIsSimulating(false);
    audioAlarm.stopAlarm();
    setAlarmModalOpen(false);

    if (watchIdRef.current !== null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (simTimerRef.current) {
      clearInterval(simTimerRef.current);
      simTimerRef.current = null;
    }

    releaseWakeLock();
    setWakeLockActive(false);
  };

  // Real GPS check
  const checkGpsAlarmTrigger = (userLat, userLng) => {
    if (!route) return;
    const target = !route.isDirect && alarmStage === 'stage1' ? route.precedingStation : (route.finalPrecedingStation || route.precedingStation);
    if (!target) return;

    const dist = calculateHaversineDistance(userLat, userLng, target.lat, target.lng);
    setDistanceToAlert(dist);

    if (dist <= 500 && !alarmModalOpen) {
      triggerAlarm();
    }
  };

  // Trigger Alarm
  const triggerAlarm = () => {
    setAlarmModalOpen(true);
    audioAlarm.setAlarmType(soundType);
    audioAlarm.startTone(soundType);

    if (voiceEnabled && route) {
      if (!route.isDirect && alarmStage === 'stage1') {
        audioAlarm.speakAnnouncement(
          `Line Transfer Alert! Prepare to transfer at ${route.transferStationName}. ${route.platformInstructions}`
        );
      } else {
        const precedingName = route.destination.name;
        audioAlarm.speakAnnouncement(
          `Wake Up! Next stop is your destination ${precedingName}. Get ready to deboard!`
        );
      }
    }
  };

  // Simulator Timer Loop
  useEffect(() => {
    if (isTracking && isSimulator && isSimulating && route) {
      const intervalTime = Math.max(800, 2600 / simSpeed);

      simTimerRef.current = setInterval(() => {
        setCurrentStationIndex((prevIndex) => {
          const maxIndex = route.routeStations.length - 1;

          let targetIndex = maxIndex > 0 ? maxIndex - 1 : maxIndex;
          if (!route.isDirect && alarmStage === 'stage1') {
            const hubIdx = route.routeStations.findIndex((s) => s.name.includes(route.transferStationName.split(' ')[0]));
            targetIndex = Math.max(0, hubIdx - 1);
          }

          const nextIndex = prevIndex + 1;

          const currStation = route.routeStations[nextIndex] || route.destination;
          const targetStation = route.routeStations[targetIndex] || route.destination;
          const dist = calculateHaversineDistance(currStation.lat, currStation.lng, targetStation.lat, targetStation.lng);
          setDistanceToAlert(dist);
          setSpeedKmh(36 + Math.floor(Math.random() * 14));

          if (nextIndex >= targetIndex && !alarmModalOpen) {
            triggerAlarm();
            setIsSimulating(false);
          }

          if (nextIndex >= maxIndex) {
            setIsSimulating(false);
            return maxIndex;
          }

          return nextIndex;
        });
      }, intervalTime);
    } else {
      if (simTimerRef.current) {
        clearInterval(simTimerRef.current);
        simTimerRef.current = null;
      }
    }

    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, [isTracking, isSimulator, isSimulating, simSpeed, route, alarmModalOpen, alarmStage]);

  // Step Next Station in Simulator
  const handleStepNextStation = () => {
    if (!route) return;
    setCurrentStationIndex((prev) => {
      const maxIndex = route.routeStations.length - 1;
      const next = Math.min(maxIndex, prev + 1);

      let targetIndex = maxIndex > 0 ? maxIndex - 1 : maxIndex;
      if (!route.isDirect && alarmStage === 'stage1') {
        const hubIdx = route.routeStations.findIndex((s) => s.name.includes(route.transferStationName.split(' ')[0]));
        targetIndex = Math.max(0, hubIdx - 1);
      }

      if (next >= targetIndex && !alarmModalOpen) {
        triggerAlarm();
      }

      return next;
    });
  };

  // Dismiss Alarm
  const handleDismissAlarm = () => {
    audioAlarm.stopAlarm();
    setAlarmModalOpen(false);

    if (!route.isDirect && alarmStage === 'stage1') {
      setAlarmStage('stage2');
      setIsSimulating(true);
    }
  };

  // Snooze Alarm for 1 minute
  const handleSnoozeAlarm = () => {
    audioAlarm.stopAlarm();
    setAlarmModalOpen(false);

    setTimeout(() => {
      if (isTracking) {
        triggerAlarm();
      }
    }, 60000);
  };

  const trackerRouteDetails = route
    ? {
        origin: route.origin,
        destination: route.destination,
        precedingStation: !route.isDirect && alarmStage === 'stage1' ? route.precedingStation : (route.finalPrecedingStation || route.precedingStation),
        routeStations: route.routeStations,
      }
    : null;

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        selectedCityId={selectedCityId}
        onCityChange={(cityId) => {
          setSelectedCityId(cityId);
          if (cityId === 'delhi') {
            setOriginName('Samaypur Badli');
            setDestName('Millennium City Centre Gurugram');
          } else if (cityId === 'bengaluru') {
            setOriginName('Whitefield (Kadugodi)');
            setDestName('Nadaprabhu Kempegowda Station (Majestic)');
          } else if (cityId === 'mumbai') {
            setOriginName('Versova');
            setDestName('Ghatkopar');
          } else if (cityId === 'chennai') {
            setOriginName('Wimco Nagar Depot');
            setDestName('Chennai International Airport');
          } else if (cityId === 'kolkata') {
            setOriginName('Dakshineswar');
            setDestName('Kavi Subhash (New Garia)');
          } else {
            setOriginName('Raidurg');
            setDestName('Erragadda');
          }
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenMap={() => setIsMapOpen(true)}
      />

      {/* Main Content Area */}
      {!isTracking ? (
        <>
          {/* Quick Saved Commutes */}
          <FavoritesBar onSelectFavorite={handleSelectFavorite} />

          {/* Universal Line-Free Station Picker */}
          <UniversalStationPicker
            cityId={selectedCityId}
            originName={originName}
            destName={destName}
            onOriginChange={setOriginName}
            onDestChange={setDestName}
            onSwap={handleSwap}
          />

          {/* Alarm Preferences */}
          <AlarmSettings
            triggerMode={triggerMode}
            onTriggerModeChange={setTriggerMode}
            soundType={soundType}
            onSoundTypeChange={setSoundType}
            voiceEnabled={voiceEnabled}
            onVoiceEnabledChange={setVoiceEnabled}
          />

          {/* Launch Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="btn-primary"
              onClick={() => handleStartTracking(false)}
              style={{
                background: route ? `linear-gradient(135deg, ${route.lineColor}, #1D4ED8)` : 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                boxShadow: route ? `0 4px 20px ${route.lineColor}66` : '0 4px 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Navigation size={20} /> START LIVE GPS COMMUTE TRACKER
            </button>

            {ENABLE_SIMULATOR_DEMO && (
              <button
                className="btn-primary btn-secondary"
                onClick={() => handleStartTracking(true)}
                style={{ color: '#D97706', borderColor: '#F59E0B' }}
              >
                <Sparkles size={18} color="#F59E0B" /> TEST DEMO IN SIMULATOR MODE
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Active Live Tracker Screen */}
          <LiveTracker
            routeDetails={trackerRouteDetails}
            currentStationIndex={currentStationIndex}
            distanceToAlert={distanceToAlert}
            speedKmh={speedKmh}
            isSimulator={isSimulator}
            onStopTracking={handleStopTracking}
            onTriggerManualAlarm={triggerAlarm}
            wakeLockActive={wakeLockActive}
            onToggleWakeLock={() => {
              if (wakeLockActive) {
                releaseWakeLock();
                setWakeLockActive(false);
              } else {
                requestWakeLock().then((active) => setWakeLockActive(active));
              }
            }}
            lineColor={route ? route.lineColor : '#3B82F6'}
          />

          {/* Simulator Controls */}
          {isSimulator && (
            <SimulatorControls
              isSimulating={isSimulating}
              onToggleSimulate={() => setIsSimulating(!isSimulating)}
              simSpeed={simSpeed}
              onChangeSimSpeed={setSimSpeed}
              onStepNextStation={handleStepNextStation}
              onResetSimulator={() => setCurrentStationIndex(0)}
            />
          )}
        </>
      )}

      {/* Metro Map Modal */}
      {isMapOpen && (
        <MetroMapModal
          cityId={selectedCityId}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {/* Two-Stage Alarm Modal Popup */}
      {alarmModalOpen && (
        <AlarmModal
          alertStationName={
            !route?.isDirect && alarmStage === 'stage1'
              ? `${route?.precedingStation?.name} (Before Transfer)`
              : route?.finalPrecedingStation?.name || route?.precedingStation?.name
          }
          destinationName={
            !route?.isDirect && alarmStage === 'stage1'
              ? `${route?.transferStationName} (Line Change Hub)`
              : route?.destination?.name
          }
          onDismiss={handleDismissAlarm}
          onSnooze={handleSnoozeAlarm}
        />
      )}

      {/* Footer & Personal Credit */}
      <footer style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Built with <Heart size={14} color="#EF4444" fill="#EF4444" /> by <span style={{ color: 'var(--accent-blue)', fontWeight: '900' }}>Rithwik Mohan</span>
        </div>
        <div>NextStop Metro • Indian Metro GPS Commute Alarm &amp; Interchange Guide</div>
      </footer>
    </div>
  );
}
