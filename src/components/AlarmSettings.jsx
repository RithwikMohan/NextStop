import React, { useState } from 'react';
import { Bell, Volume2, Mic, Smartphone, Check } from 'lucide-react';
import { audioAlarm } from '../utils/audioAlarm';

export default function AlarmSettings({
  triggerMode,
  onTriggerModeChange,
  soundType,
  onSoundTypeChange,
  voiceEnabled,
  onVoiceEnabledChange,
}) {
  const [notificationStatus, setNotificationStatus] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  );

  const handleEnableNotifications = async () => {
    const granted = await audioAlarm.requestNotificationPermission();
    setNotificationStatus(granted ? 'granted' : 'denied');
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <Bell size={16} /> Alarm &amp; Background Notification Preferences
      </div>

      {/* Background Doomscroll Notification Permission Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))',
          border: '1.5px solid var(--accent-blue)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Smartphone size={20} color="#2563EB" />
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Enable Doomscroll System Alarm
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Rings over other apps when your phone screen is locked or browsing elsewhere.
            </div>
          </div>
        </div>

        {notificationStatus === 'granted' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontWeight: '800', fontSize: '0.78rem' }}>
            <Check size={16} /> Active
          </div>
        ) : (
          <button
            onClick={handleEnableNotifications}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Allow
          </button>
        )}
      </div>

      {/* Trigger Mode */}
      <div className="form-group">
        <label className="form-label">Alarm Trigger Timing</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => onTriggerModeChange('1_stop_before')}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: triggerMode === '1_stop_before' ? '2px solid #2563EB' : '1px solid var(--border-glass)',
              background: triggerMode === '1_stop_before' ? 'rgba(37, 99, 235, 0.15)' : 'var(--bg-card)',
              color: triggerMode === '1_stop_before' ? '#2563EB' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            🔔 1 Stop Before (Recommended)
          </button>

          <button
            onClick={() => onTriggerModeChange('at_destination')}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: triggerMode === 'at_destination' ? '2px solid #2563EB' : '1px solid var(--border-glass)',
              background: triggerMode === 'at_destination' ? 'rgba(37, 99, 235, 0.15)' : 'var(--bg-card)',
              color: triggerMode === 'at_destination' ? '#2563EB' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            📍 At Destination Stop
          </button>
        </div>
      </div>

      {/* Sound Type & Voice Toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="form-group">
          <label className="form-label">
            <Volume2 size={14} /> Ringtone Sound
          </label>
          <select
            value={soundType}
            onChange={(e) => onSoundTypeChange(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '10px',
              background: 'var(--input-bg)',
              border: '1.5px solid var(--accent-blue)',
              color: 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="metro_chime" style={{ color: '#020617', fontWeight: '700' }}>Metro Station Chime</option>
            <option value="emergency_siren" style={{ color: '#020617', fontWeight: '700' }}>Loud Siren Warning</option>
            <option value="digital_beep" style={{ color: '#020617', fontWeight: '700' }}>Digital Pulse Beep</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Mic size={14} /> Voice Announcement
          </label>
          <button
            onClick={() => onVoiceEnabledChange(!voiceEnabled)}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: voiceEnabled ? '2px solid #16A34A' : '1px solid var(--border-glass)',
              background: voiceEnabled ? 'rgba(22, 163, 74, 0.15)' : 'var(--bg-card)',
              color: voiceEnabled ? '#16A34A' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {voiceEnabled ? '🗣️ Spoken Voice ON' : '🔇 Muted Voice'}
          </button>
        </div>
      </div>
    </div>
  );
}
