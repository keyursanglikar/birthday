import React from 'react';

export const HeartBorderOverlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 45,
        boxSizing: 'border-box'
      }}
    >
      {/* 4 Corner Heart Medallions */}
      {/* Top Left */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          fontSize: 'clamp(14px, 2.2vw, 18px)',
          filter: 'drop-shadow(0 2px 6px rgba(225, 29, 72, 0.7))',
          userSelect: 'none',
          animation: 'heartFloat 2.4s ease-in-out infinite'
        }}
      >
        💖
      </div>

      {/* Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          fontSize: 'clamp(14px, 2.2vw, 18px)',
          filter: 'drop-shadow(0 2px 6px rgba(225, 29, 72, 0.7))',
          userSelect: 'none',
          animation: 'heartFloat 2.4s ease-in-out infinite 0.6s'
        }}
      >
        💖
      </div>

      {/* Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          left: '6px',
          fontSize: 'clamp(14px, 2.2vw, 18px)',
          filter: 'drop-shadow(0 2px 6px rgba(225, 29, 72, 0.7))',
          userSelect: 'none',
          animation: 'heartFloat 2.4s ease-in-out infinite 1.2s'
        }}
      >
        💖
      </div>

      {/* Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          fontSize: 'clamp(14px, 2.2vw, 18px)',
          filter: 'drop-shadow(0 2px 6px rgba(225, 29, 72, 0.7))',
          userSelect: 'none',
          animation: 'heartFloat 2.4s ease-in-out infinite 1.8s'
        }}
      >
        💖
      </div>

      {/* Repeating Heart Filigree Pattern Border along Top & Bottom */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '26px',
          right: '26px',
          height: '14px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          overflow: 'hidden',
          opacity: 0.55
        }}
      >
        {[...Array(14)].map((_, i) => (
          <span key={`t-${i}`} style={{ fontSize: '9px', color: '#ffb6cb', userSelect: 'none' }}>
            ❤
          </span>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '26px',
          right: '26px',
          height: '14px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          overflow: 'hidden',
          opacity: 0.55
        }}
      >
        {[...Array(14)].map((_, i) => (
          <span key={`b-${i}`} style={{ fontSize: '9px', color: '#ffb6cb', userSelect: 'none' }}>
            ❤
          </span>
        ))}
      </div>
    </div>
  );
};
