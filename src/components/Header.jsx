import React from 'react';
import { Train, Sun, Moon, Map } from 'lucide-react';
import { CITIES } from '../data/metroData';

export default function Header({ selectedCityId, onCityChange, isDarkMode, onToggleDarkMode, onOpenMap }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 0 6px 0',
        width: '100%',
        flexWrap: 'wrap',
        gap: '8px',
        borderBottom: '1px solid var(--border-glass)',
        paddingBottom: '10px',
        marginBottom: '4px',
      }}
    >
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)',
            flexShrink: 0,
          }}
        >
          <Train size={20} color="#FFFFFF" />
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '900',
              fontSize: '1.1rem',
              letterSpacing: '-0.5px',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
            }}
          >
            NextStop
          </div>
          <div
            style={{
              fontSize: '0.66rem',
              fontWeight: '800',
              color: 'var(--accent-blue)',
            }}
          >
            By Rithwik Mohan • GPS Alarm
          </div>
        </div>
      </div>

      {/* Actions & City Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
        {/* City Selector */}
        <select
          value={selectedCityId}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            background: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : '#FFFFFF',
            color: isDarkMode ? '#F8FAFC' : '#020617',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid #2563EB',
            borderRadius: '10px',
            padding: '6px 8px',
            fontSize: '0.75rem',
            fontWeight: '800',
            outline: 'none',
            cursor: 'pointer',
            maxWidth: '120px',
          }}
        >
          {CITIES.map((city) => (
            <option key={city.id} value={city.id} style={{ color: '#020617', fontWeight: '700' }}>
              {city.name.split(' ')[0]}
            </option>
          ))}
        </select>

        {/* Map Modal Trigger */}
        <button
          onClick={onOpenMap}
          title="View Official Metro Map"
          style={{
            background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.4)' : 'none',
            color: '#FFFFFF',
            padding: '6px 10px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            fontWeight: '800',
            flexShrink: 0,
          }}
        >
          <Map size={14} /> Map
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Switch to Bright Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#FEF08A',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid #CA8A04',
            color: isDarkMode ? '#F59E0B' : '#854D0E',
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {isDarkMode ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#854D0E" />}
        </button>
      </div>
    </header>
  );
}
