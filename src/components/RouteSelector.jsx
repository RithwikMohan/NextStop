import React, { useState } from 'react';
import { ArrowDownUp, MapPin, Navigation, Search, IndianRupee, Clock, GitFork } from 'lucide-react';
import { calculateRouteDetails } from '../utils/geoUtils';

// Calculate estimated HMRL Metro Fare in INR based on stop count
export function calculateMetroFare(stopCount) {
  if (stopCount <= 0) return 0;
  if (stopCount <= 2) return 15;
  if (stopCount <= 5) return 25;
  if (stopCount <= 9) return 35;
  if (stopCount <= 14) return 45;
  return 60; // Max fare slab
}

export default function RouteSelector({
  lines,
  selectedLineId,
  onLineChange,
  originId,
  destId,
  onOriginChange,
  onDestChange,
  onSwap,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const currentLine = lines.find((l) => l.id === selectedLineId) || lines[0];
  const stations = currentLine ? currentLine.stations : [];

  const filteredStations = searchTerm
    ? stations.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : stations;

  const routeDetails = calculateRouteDetails(stations, originId, destId);
  const estimatedFare = routeDetails ? calculateMetroFare(routeDetails.stopCount) : 0;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Line Selector Badges */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {lines.map((line) => {
          const isSelected = line.id === selectedLineId;
          return (
            <button
              key={line.id}
              onClick={() => {
                onLineChange(line.id);
                setSearchTerm('');
              }}
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: isSelected ? line.bgGradient : 'rgba(255, 255, 255, 0.05)',
                border: isSelected ? `1px solid ${line.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isSelected ? `0 0 16px ${line.glowColor}` : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: line.color,
                  boxShadow: `0 0 8px ${line.color}`,
                }}
              />
              {line.name.split(' ')[0]} Line
            </button>
          );
        })}
      </div>

      {/* Station Search Filter Input */}
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
        <input
          type="text"
          placeholder="Quick station search (e.g., Ameerpet, Hitec City)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px 10px 38px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#FFF',
            fontSize: '0.82rem',
            outline: 'none',
          }}
        />
      </div>

      {/* Origin & Destination Selectors */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
        {/* Boarding Station */}
        <div className="form-group">
          <label className="form-label" style={{ color: '#93C5FD' }}>
            <MapPin size={14} color="#3B82F6" /> Boarding Station (Origin)
          </label>
          <select
            className="select-control"
            value={originId}
            onChange={(e) => onOriginChange(e.target.value)}
          >
            {filteredStations.map((st) => (
              <option key={st.id} value={st.id} style={{ background: '#0F172A', color: '#FFF' }}>
                {st.name} {st.isInterchange ? '🔀 (Interchange)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-6px 0' }}>
          <button
            onClick={onSwap}
            title="Swap Origin & Destination"
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#93C5FD',
              cursor: 'pointer',
              zIndex: 3,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
            }}
          >
            <ArrowDownUp size={16} />
          </button>
        </div>

        {/* Destination Station */}
        <div className="form-group">
          <label className="form-label" style={{ color: '#FCA5A5' }}>
            <Navigation size={14} color="#EF4444" /> Destination Station
          </label>
          <select
            className="select-control"
            value={destId}
            onChange={(e) => onDestChange(e.target.value)}
          >
            {filteredStations.map((st) => (
              <option
                key={st.id}
                value={st.id}
                disabled={st.id === originId}
                style={{ background: '#0F172A', color: st.id === originId ? '#64748B' : '#FFF' }}
              >
                {st.name} {st.isInterchange ? '🔀 (Interchange)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Travel Summary Card (Stops, Time, Estimated Fare, Preceding Alarm Target) */}
      {routeDetails && (
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <div style={{ color: '#94A3B8', fontSize: '0.72rem' }}>STOPS & TIME</div>
            <div style={{ fontWeight: '700', color: '#FFF', marginTop: '2px' }}>
              {routeDetails.stopCount} Stops (~{routeDetails.estimatedMinutes}m)
            </div>
          </div>

          <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ color: '#94A3B8', fontSize: '0.72rem' }}>ESTIMATED FARE</div>
            <div style={{ fontWeight: '800', color: '#4ADE80', marginTop: '2px' }}>
              ₹{estimatedFare}
            </div>
          </div>

          <div>
            <div style={{ color: '#94A3B8', fontSize: '0.72rem' }}>ALARM RING STOP</div>
            <div style={{ fontWeight: '800', color: '#F59E0B', marginTop: '2px' }}>
              🔔 {routeDetails.precedingStation ? routeDetails.precedingStation.name : 'Target'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
