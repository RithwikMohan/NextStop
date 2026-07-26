import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Gamepad2 } from 'lucide-react';

export default function SimulatorControls({
  isSimulating,
  onToggleSimulate,
  simSpeed,
  onChangeSimSpeed,
  onStepNextStation,
  onResetSimulator,
}) {
  return (
    <div
      className="glass-card"
      style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px dashed rgba(245, 158, 11, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#F59E0B',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Gamepad2 size={16} /> Interactive Test Simulator
        </div>

        <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '500' }}>
          Test alarm without physically traveling
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Play/Pause Simulation */}
        <button
          onClick={onToggleSimulate}
          style={{
            flex: 2,
            padding: '10px 14px',
            borderRadius: '12px',
            background: isSimulating ? 'linear-gradient(135deg, #EF4444, #991B1B)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
            border: 'none',
            color: '#FFF',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {isSimulating ? <Pause size={16} /> : <Play size={16} />}
          {isSimulating ? 'Pause Simulation' : 'Auto Play Simulation'}
        </button>

        {/* Step Next Station */}
        <button
          onClick={onStepNextStation}
          title="Step train to next station immediately"
          style={{
            flex: 1.2,
            padding: '10px 12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFF',
            fontWeight: '600',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <SkipForward size={14} /> Next Stop
        </button>

        {/* Speed Switcher */}
        <button
          onClick={() => onChangeSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 5 : 1)}
          title="Change simulation speed multiplier"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FDE68A',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {simSpeed}x
        </button>

        {/* Reset */}
        <button
          onClick={onResetSimulator}
          title="Reset to Boarding Station"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
