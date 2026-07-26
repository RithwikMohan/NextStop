import React from 'react';
import { Bell, CheckCircle2, Clock, Navigation } from 'lucide-react';

export default function AlarmModal({ alertStationName, destinationName, onDismiss, onSnooze }) {
  return (
    <div className="alarm-overlay">
      <div className="alarm-box">
        <div className="alarm-bell-icon">
          <Bell size={44} />
        </div>

        <div>
          <div
            style={{
              fontSize: '1.4rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              color: '#FCA5A5',
              letterSpacing: '-0.5px',
              textTransform: 'uppercase',
            }}
          >
            Wake Up & Get Ready!
          </div>
          <div style={{ color: '#F8FAFC', fontSize: '0.95rem', marginTop: '6px', fontWeight: '500' }}>
            Doomscroll Pause! Arriving at alert stop:
          </div>
        </div>

        {/* Station Highlight Card */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            borderRadius: '16px',
            padding: '16px',
            width: '100%',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#FCA5A5', fontWeight: '700', textTransform: 'uppercase' }}>
            PREPARATION STOP
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF', margin: '4px 0' }}>
            {alertStationName || 'Alert Station'}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: '#FDE68A',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '6px',
            }}
          >
            <Navigation size={14} /> Next Stop: <strong>{destinationName || 'Destination'}</strong>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-primary btn-danger" onClick={onDismiss} style={{ padding: '18px' }}>
            <CheckCircle2 size={22} /> I'M AWAKE — DISMISS ALARM
          </button>

          <button className="btn-secondary" onClick={onSnooze} style={{ padding: '14px' }}>
            <Clock size={16} /> Snooze for 1 Minute
          </button>
        </div>
      </div>
    </div>
  );
}
