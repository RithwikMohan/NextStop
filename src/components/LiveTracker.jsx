import React from 'react';
import { ArrowLeft, Lock, AlertTriangle } from 'lucide-react';

export default function LiveTracker({
  routeDetails,
  currentStationIndex,
  distanceToAlert,
  speedKmh,
  isSimulator,
  onStopTracking,
  onTriggerManualAlarm,
  wakeLockActive,
  onToggleWakeLock,
  lineColor = '#3B82F6',
}) {
  if (!routeDetails) return null;

  const { origin, destination, precedingStation, routeStations } = routeDetails;
  const currentStation = routeStations[currentStationIndex] || origin;
  const totalStops = routeStations.length - 1;
  const progressPercent = Math.min(100, (currentStationIndex / Math.max(1, totalStops)) * 100);

  const formatDistance = (meters) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  };

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: `1.5px solid ${lineColor}66`,
        boxShadow: `0 12px 36px ${lineColor}22`,
      }}
    >
      {/* Integrated Header Row: Back Button + Active Status Badge + WakeLock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={onStopTracking}
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1.5px solid var(--accent-blue)',
            borderRadius: '12px',
            padding: '8px 14px',
            color: 'var(--accent-blue)',
            fontSize: '0.82rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowLeft size={16} /> Back to Main Page
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="badge"
            style={{
              background: isSimulator ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: isSimulator ? '#D97706' : '#059669',
              border: `1px solid ${isSimulator ? '#F59E0B' : '#10B981'}`,
              fontSize: '0.74rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isSimulator ? '#F59E0B' : '#10B981',
              }}
            />
            {isSimulator ? 'SIMULATOR ACTIVE' : 'LIVE GPS ACTIVE'}
          </div>

          <button
            onClick={onToggleWakeLock}
            title={wakeLockActive ? 'Screen Wake Lock Active' : 'Screen Wake Lock Inactive'}
            style={{
              padding: '6px 10px',
              borderRadius: '10px',
              background: wakeLockActive ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
              border: wakeLockActive ? '1px solid #10B981' : '1px solid var(--border-glass)',
              color: wakeLockActive ? '#059669' : 'var(--text-muted)',
              fontSize: '0.72rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Lock size={12} /> {wakeLockActive ? 'WakeLock ON' : 'WakeLock OFF'}
          </button>
        </div>
      </div>

      {/* Boarding -> Destination Display */}
      <div
        style={{
          background: 'var(--input-bg)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--border-glass)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>BOARDING</div>
          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{origin?.name}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-blue)' }}>
            {currentStationIndex} / {totalStops} Stops
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>DESTINATION</div>
          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--accent-red)' }}>{destination?.name}</div>
        </div>
      </div>

      {/* Train Visual Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${lineColor}, #60A5FA)`,
              borderRadius: '10px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      {/* Current Train Stop & Alert Target Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div
          style={{
            background: 'var(--input-bg)',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid var(--border-glass)',
          }}
        >
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800' }}>CURRENT TRAIN STOP</div>
          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '4px' }}>
            {currentStation?.name}
          </div>
        </div>

        <div
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            borderRadius: '12px',
            padding: '12px',
            border: '1.5px solid #F59E0B',
          }}
        >
          <div style={{ fontSize: '0.7rem', color: '#D97706', fontWeight: '800' }}>🔔 ALERT TARGET STOP</div>
          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#B45309', marginTop: '4px' }}>
            {precedingStation?.name || destination?.name}
          </div>
        </div>
      </div>

      {/* Telemetry Stats: Distance & Speed */}
      <div
        style={{
          background: 'var(--input-bg)',
          borderRadius: '14px',
          padding: '12px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          textAlign: 'center',
          border: '1px solid var(--border-glass)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>DISTANCE TO ALERT</div>
          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent-blue)', marginTop: '2px' }}>
            {formatDistance(distanceToAlert)}
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>SPEED</div>
          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent-green)', marginTop: '2px' }}>
            {speedKmh} <span style={{ fontSize: '0.75rem' }}>km/h</span>
          </div>
        </div>
      </div>

      {/* Controls: Stop Tracking & Manual Test Trigger */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gap: '8px' }}>
        <button
          onClick={onStopTracking}
          style={{
            padding: '14px',
            borderRadius: '14px',
            border: 'none',
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.3)',
          }}
        >
          ⏹️ Stop Tracking
        </button>

        <button
          onClick={onTriggerManualAlarm}
          title="Test Alarm Ringing Immediately"
          style={{
            borderRadius: '14px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AlertTriangle size={20} />
        </button>
      </div>
    </div>
  );
}
