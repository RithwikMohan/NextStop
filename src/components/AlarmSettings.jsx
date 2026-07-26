import React, { useState } from 'react';
import { Bell, Volume2, Mic, Smartphone, Check, AlertCircle } from 'lucide-react';
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
    const status = await audioAlarm.requestNotificationPermission();
    setNotificationStatus(status);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '800', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <Bell size={15} /> Alarm &amp; Notification Settings
      </div>

      {/* Background Doomscroll Notification Permission Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))',
          border: notificationStatus === 'denied' ? '1.5px solid #EF4444' : '1.5px solid var(--accent-blue)',
          borderRadius: '12px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={18} color="#2563EB" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                Enable Doomscroll System Alarm
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                Rings over other apps when your phone is locked or browsing elsewhere.
              </div>
            </div>
          </div>

          {notificationStatus === 'granted' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontWeight: '800', fontSize: '0.74rem', flexShrink: 0 }}>
              <Check size={14} /> Active
            </div>
          ) : (
            <button
              onClick={handleEnableNotifications}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: notificationStatus === 'denied' ? '#DC2626' : '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '800',
                fontSize: '0.74rem',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {notificationStatus === 'denied' ? 'Unblock' : 'Allow'}
            </button>
          )}
        </div>

        {notificationStatus === 'denied' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.72rem', color: '#F87171', background: 'rgba(239, 68, 68, 0.12)', padding: '8px', borderRadius: '8px' }}>
            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              Notifications are blocked in Chrome settings. Tap the 🔒 lock icon near the URL bar ➔ <b>Permissions</b> ➔ Set Notifications to <b>Allow</b>!
            </div>
          </div>
        )}
      </div>

      {/* Trigger Mode */}
      <div className="form-group">
        <label className="form-label">Alarm Trigger Timing</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <button
            onClick={() => onTriggerModeChange('1_stop_before')}
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              border: triggerMode === '1_stop_before' ? '2px solid #2563EB' : '1px solid var(--border-glass)',
              background: triggerMode === '1_stop_before' ? 'rgba(37, 99, 235, 0.15)' : 'var(--bg-card)',
              color: triggerMode === '1_stop_before' ? '#2563EB' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.74rem',
              cursor: 'pointer',
            }}
          >
            🔔 1 Stop Before
          </button>

          <button
            onClick={() => onTriggerModeChange('at_destination')}
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              border: triggerMode === 'at_destination' ? '2px solid #2563EB' : '1px solid var(--border-glass)',
              background: triggerMode === 'at_destination' ? 'rgba(37, 99, 235, 0.15)' : 'var(--bg-card)',
              color: triggerMode === 'at_destination' ? '#2563EB' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.74rem',
              cursor: 'pointer',
            }}
          >
            📍 At Destination
          </button>
        </div>
      </div>

      {/* Sound Type & Voice Toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div className="form-group">
          <label className="form-label">
            <Volume2 size={13} /> Ringtone Sound
          </label>
          <select
            value={soundType}
            onChange={(e) => onSoundTypeChange(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'var(--input-bg)',
              border: '1.5px solid var(--accent-blue)',
              color: 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.76rem',
              outline: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <option value="metro_chime" style={{ color: '#020617', fontWeight: '700' }}>Metro Station Chime</option>
            <option value="emergency_siren" style={{ color: '#020617', fontWeight: '700' }}>Loud Siren Warning</option>
            <option value="digital_beep" style={{ color: '#020617', fontWeight: '700' }}>Digital Pulse Beep</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Mic size={13} /> Voice Announcement
          </label>
          <button
            onClick={() => onVoiceEnabledChange(!voiceEnabled)}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: voiceEnabled ? '2px solid #16A34A' : '1px solid var(--border-glass)',
              background: voiceEnabled ? 'rgba(22, 163, 74, 0.15)' : 'var(--bg-card)',
              color: voiceEnabled ? '#16A34A' : 'var(--text-primary)',
              fontWeight: '800',
              fontSize: '0.76rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {voiceEnabled ? '🗣️ Spoken ON' : '🔇 Muted'}
          </button>
        </div>
      </div>
    </div>
  );
}
