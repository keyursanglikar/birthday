import React from 'react';
import { ChevronDown, Hand } from 'lucide-react';

export const NextPointer = ({ label = "Tap here to continue", style = {} }) => {
  return (
    <div
      className="next-pointer-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '6px',
        animation: 'bounceArrow 1.4s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 25,
        ...style
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(254, 240, 245, 0.92))',
          color: '#9D1238',
          padding: '4px 14px',
          borderRadius: '999px',
          fontSize: 'clamp(0.72rem, 1.5vw, 0.82rem)',
          fontWeight: 700,
          letterSpacing: '0.5px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(246, 213, 138, 0.9)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <span>👉 {label}</span>
      </div>

      <ChevronDown size={20} color="#F6D58A" strokeWidth={3} style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
    </div>
  );
};
