import React from 'react';

export const StoryProgress = ({ currentScene, totalScenes, onSelectScene }) => {
  const percent = Math.round(((currentScene + 1) / totalScenes) * 100);

  return (
    <div
      style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(14, 5, 20, 0.55)',
        backdropFilter: 'blur(10px)',
        padding: '6px 14px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 182, 203, 0.25)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)'
      }}
    >
      <div
        style={{
          width: '45px',
          height: '4px',
          borderRadius: '2px',
          background: 'rgba(255, 255, 255, 0.2)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFB6CB, #F6D58A)',
            transition: 'width 0.4s ease'
          }}
        />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: '#F6D58A', letterSpacing: '0.05em' }}>
        {currentScene + 1}/{totalScenes}
      </span>
    </div>
  );
};
