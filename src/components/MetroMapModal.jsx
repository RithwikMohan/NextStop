import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { METRO_DATA, CITIES } from '../data/metroData';

export default function MetroMapModal({ cityId = 'hyderabad', onClose }) {
  const city = METRO_DATA[cityId] || METRO_DATA.hyderabad;
  const cityInfo = CITIES.find((c) => c.id === cityId) || CITIES[0];
  const [zoomLevel, setZoomLevel] = useState(1);

  const isPdf = cityInfo.mapFile.endsWith('.pdf');

  return (
    <div className="alarm-overlay" style={{ background: 'rgba(9, 13, 22, 0.96)', animation: 'none' }}>
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '960px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: '800', color: '#FFF' }}>
              🗺️ Official {city.systemName} Network Map
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
              Official Route Map & Transfer Interchange Hubs
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
              title="Zoom In"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ZoomIn size={18} />
            </button>

            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              title="Zoom Out"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={() => window.open(cityInfo.mapFile, '_blank')}
              title="Open Map in New Tab"
              style={{
                padding: '0 12px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                color: '#93C5FD',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Maximize2 size={14} /> Full View
            </button>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Line Legend Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {city.lines.map((line) => (
            <div
              key={line.id}
              className="badge"
              style={{
                background: `${line.color}22`,
                color: line.color,
                border: `1px solid ${line.color}66`,
                fontSize: '0.75rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: line.color }} />
              {line.name} ({line.terminus})
            </div>
          ))}
        </div>

        {/* PDF / SVG Map Renderer Container */}
        <div
          style={{
            flex: 1,
            background: '#0F172A',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPdf ? (
            <iframe
              src={`${cityInfo.mapFile}#toolbar=0&navpanes=0&scrollbar=1`}
              style={{
                width: `${zoomLevel * 100}%`,
                height: `${zoomLevel * 100}%`,
                border: 'none',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
              }}
              title={`Official ${city.cityName} Metro Map`}
            />
          ) : (
            <img
              src={cityInfo.mapFile}
              alt={`Official ${city.cityName} Metro Map`}
              style={{
                width: `${zoomLevel * 100}%`,
                height: 'auto',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
