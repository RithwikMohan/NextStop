import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownUp, MapPin, Navigation, Search, GitFork } from 'lucide-react';
import { getAllStations, findSmartRoute } from '../utils/routingEngine';
import { CITIES } from '../data/metroData';

export default function UniversalStationPicker({
  cityId = 'hyderabad',
  originName,
  destName,
  onOriginChange,
  onDestChange,
  onSwap,
}) {
  const allStations = getAllStations(cityId);
  const cityInfo = CITIES.find((c) => c.id === cityId) || CITIES[0];
  const fareLabel = cityInfo.name.split(' ')[0] + ' FARE';

  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);

  const originBoxRef = useRef(null);
  const destBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (originBoxRef.current && !originBoxRef.current.contains(e.target)) {
        setIsOriginOpen(false);
      }
      if (destBoxRef.current && !destBoxRef.current.contains(e.target)) {
        setIsDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOriginStations = originSearch
    ? allStations.filter((s) => s.name.toLowerCase().includes(originSearch.toLowerCase()))
    : allStations;

  const filteredDestStations = destSearch
    ? allStations.filter((s) => s.name.toLowerCase().includes(destSearch.toLowerCase()))
    : allStations;

  const route = findSmartRoute(originName, destName, cityId);

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        overflow: 'visible',
        position: 'relative',
        zIndex: isOriginOpen || isDestOpen ? 50 : 5,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontSize: '0.76rem',
          fontWeight: '800',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ color: 'var(--text-primary)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>📍 Boarding &amp; Destination Selector</span>
        <span style={{ fontSize: '0.7rem', color: '#38BDF8', textTransform: 'none', fontWeight: '600', wordBreak: 'break-word' }}>
          {cityInfo.name} Unified Search
        </span>
      </div>

      {/* Origin & Destination Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', width: '100%' }}>
        {/* 1. Boarding Station Input */}
        <div
          className="form-group"
          ref={originBoxRef}
          style={{ position: 'relative', zIndex: isOriginOpen ? 100 : 10, width: '100%' }}
        >
          <label className="form-label" style={{ color: '#93C5FD' }}>
            <MapPin size={14} color="#3B82F6" /> Boarding Station (Origin)
          </label>

          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder={`Search boarding station...`}
              value={isOriginOpen ? originSearch : originName}
              onFocus={() => {
                setOriginSearch('');
                setIsOriginOpen(true);
                setIsDestOpen(false);
              }}
              onChange={(e) => {
                setOriginSearch(e.target.value);
                setIsOriginOpen(true);
              }}
              style={{
                width: '100%',
                padding: '12px 12px 12px 36px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: '700',
                outline: 'none',
              }}
            />
          </div>

          {/* Boarding Dropdown */}
          {isOriginOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: '14px',
                maxHeight: '260px',
                overflowY: 'auto',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                marginTop: '4px',
              }}
            >
              {filteredOriginStations.length === 0 ? (
                <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No matching stations</div>
              ) : (
                filteredOriginStations.map((st) => (
                  <div
                    key={st.name}
                    onClick={() => {
                      onOriginChange(st.name);
                      setIsOriginOpen(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-glass)',
                      background: st.name === originName ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                    }}
                  >
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {st.name} {st.isInterchange ? '🔀' : ''}
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      {st.lines.map((l) => (
                        <span
                          key={l.lineId}
                          style={{
                            padding: '2px 6px',
                            borderRadius: '10px',
                            backgroundColor: `${l.lineColor}22`,
                            color: l.lineColor,
                            border: `1px solid ${l.lineColor}66`,
                            fontSize: '0.68rem',
                            fontWeight: '700',
                          }}
                        >
                          {l.lineName.split(' ')[0]} ({l.stationNumber})
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0', zIndex: 12 }}>
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
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            <ArrowDownUp size={16} />
          </button>
        </div>

        {/* 2. Destination Station Input */}
        <div
          className="form-group"
          ref={destBoxRef}
          style={{ position: 'relative', zIndex: isDestOpen ? 100 : 8, width: '100%' }}
        >
          <label className="form-label" style={{ color: '#FCA5A5' }}>
            <Navigation size={14} color="#EF4444" /> Destination Station
          </label>

          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder={`Search destination station...`}
              value={isDestOpen ? destSearch : destName}
              onFocus={() => {
                setDestSearch('');
                setIsDestOpen(true);
                setIsOriginOpen(false);
              }}
              onChange={(e) => {
                setDestSearch(e.target.value);
                setIsDestOpen(true);
              }}
              style={{
                width: '100%',
                padding: '12px 12px 12px 36px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: '700',
                outline: 'none',
              }}
            />
          </div>

          {/* Destination Dropdown */}
          {isDestOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: '14px',
                maxHeight: '260px',
                overflowY: 'auto',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                marginTop: '4px',
              }}
            >
              {filteredDestStations.length === 0 ? (
                <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No matching stations</div>
              ) : (
                filteredDestStations.map((st) => (
                  <div
                    key={st.name}
                    onClick={() => {
                      onDestChange(st.name);
                      setIsDestOpen(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-glass)',
                      background: st.name === destName ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
                    }}
                  >
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {st.name} {st.isInterchange ? '🔀' : ''}
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      {st.lines.map((l) => (
                        <span
                          key={l.lineId}
                          style={{
                            padding: '2px 6px',
                            borderRadius: '10px',
                            backgroundColor: `${l.lineColor}22`,
                            color: l.lineColor,
                            border: `1px solid ${l.lineColor}66`,
                            fontSize: '0.68rem',
                            fontWeight: '700',
                          }}
                        >
                          {l.lineName.split(' ')[0]} ({l.stationNumber})
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Route & Fare Summary */}
      {route && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          {!route.isDirect && (
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '12px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DDD6FE', fontWeight: '800', fontSize: '0.8rem' }}>
                <GitFork size={15} color="#8B5CF6" /> 🔀 Line Change Required at {route.transferStationName}
              </div>
              <div style={{ color: '#FDE68A', fontSize: '0.74rem', fontWeight: '600' }}>
                📍 {route.platformInstructions}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '14px',
              padding: '12px 8px',
              border: '1px solid var(--border-glass)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '4px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.68rem', fontWeight: '700' }}>STOPS &amp; TIME</div>
              <div style={{ fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px', fontSize: '0.82rem' }}>
                {route.stopCount} Stops (~{route.estimatedMinutes}m)
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-glass)', borderRight: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.68rem', fontWeight: '700' }}>{fareLabel}</div>
              <div style={{ fontWeight: '800', color: '#4ADE80', marginTop: '2px', fontSize: '0.95rem' }}>
                ₹{route.fare}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.68rem', fontWeight: '700' }}>ALARM RING STOP</div>
              <div style={{ fontWeight: '800', color: '#F59E0B', marginTop: '2px', fontSize: '0.78rem' }}>
                🔔 {route.precedingStation ? route.precedingStation.name : route.destination.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
