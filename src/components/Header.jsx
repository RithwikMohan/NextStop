import React from 'react';
import { Train, Sun, Moon, Map } from 'lucide-react';
import { CITIES } from '../data/metroData';

export default function Header({ selectedCityId, onCityChange, isDarkMode, onToggleDarkMode, onOpenMap }) {
  return (
    <header
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        marginBottom: '4px',
      }}
    >
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(236, 72, 153, 0.4)',
          }}
        >
          <Train size={24} color="#FFFFFF" />
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '900',
              fontSize: '1.25rem',
              letterSpacing: '-0.5px',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
            }}
          >
            NextStop
          </div>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              color: 'var(--accent-blue)',
            }}
          >
            By Rithwik Mohan • GPS Alarm
          </div>
        </div>
      </div>

      {/* Actions & City Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* City Selector */}
        <select
          value={selectedCityId}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#FFFFFF',
            color: isDarkMode ? '#F8FAFC' : '#020617',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid #2563EB',
            borderRadius: '10px',
            padding: '8px 10px',
            fontSize: '0.8rem',
            fontWeight: '800',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(37, 99, 235, 0.15)',
          }}
        >
          {CITIES.map((city) => (
            <option key={city.id} value={city.id} style={{ color: '#020617', fontWeight: '700' }}>
              {city.name.split(' ')[0]} Metro
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
            padding: '8px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: '800',
            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.3)',
          }}
        >
          <Map size={16} /> Map
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Switch to Bright Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#FEF08A',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid #CA8A04',
            color: isDarkMode ? '#F59E0B' : '#854D0E',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isDarkMode ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#854D0E" />}
        </button>
      </div>
    </header>
  );
}
