import React from 'react';
import { GitFork } from 'lucide-react';

export default function InterchangeGuide({ routeDetails }) {
  if (!routeDetails || !routeDetails.routeStations) return null;

  const interchangesOnRoute = routeDetails.routeStations.filter((s) => s.isInterchange);

  if (interchangesOnRoute.length === 0) return null;

  return (
    <div
      className="glass-card"
      style={{
        padding: '14px 16px',
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#C4B5FD',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '8px',
        }}
      >
        <GitFork size={14} color="#8B5CF6" /> Major Interchange Stations on Route
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {interchangesOnRoute.map((st) => (
          <div
            key={st.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(139, 92, 246, 0.1)',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ fontWeight: '700', color: '#FFF' }}>🔀 {st.name}</div>
            <div style={{ color: '#DDD6FE', fontSize: '0.75rem', fontWeight: '500' }}>
              {st.note || 'Line Transfer Hub'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
