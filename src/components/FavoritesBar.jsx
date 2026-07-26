import React from 'react';
import { Zap } from 'lucide-react';
import { DEFAULT_FAVORITES } from '../data/metroData';

export default function FavoritesBar({ onSelectFavorite }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <Zap size={14} color="#F59E0B" /> QUICK START SAVED COMMUTES
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {DEFAULT_FAVORITES.map((fav) => (
          <button
            key={fav.id}
            onClick={() => onSelectFavorite(fav)}
            style={{
              whiteSpace: 'nowrap',
              flexShrink: 0,
              background: 'var(--bg-card)',
              border: `1.5px solid ${fav.lineColor}`,
              borderRadius: '20px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: fav.lineColor }} />
            {fav.label}
          </button>
        ))}
      </div>
    </div>
  );
}
