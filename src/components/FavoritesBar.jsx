import React from 'react';
import { Zap } from 'lucide-react';
import { DEFAULT_FAVORITES } from '../data/metroData';

export default function FavoritesBar({ onSelectFavorite }) {
  return (
    <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <Zap size={14} color="#F59E0B" /> QUICK START SAVED COMMUTES
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {DEFAULT_FAVORITES.map((fav) => (
          <button
            key={fav.id}
            onClick={() => onSelectFavorite(fav)}
            style={{
              whiteSpace: 'nowrap',
              background: 'var(--bg-card)',
              border: `1.5px solid ${fav.lineColor}`,
              borderRadius: '20px',
              padding: '8px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'transform 0.15s ease',
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
