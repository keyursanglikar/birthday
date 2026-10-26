import React, { useRef } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';

export const IntroScene = ({ onNext }) => {
  const heartRef = useRef(null);

  const handleStart = () => {
    sounds.chime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F6D58A', '#FFB6CB', '#FF9A76']
    });
    onNext();
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '30px',
        background: 'radial-gradient(circle at 50% 40%, #4a1250 0%, #150a1e 70%, #08030d 100%)',
        position: 'relative'
      }}
    >
      <div
        ref={heartRef}
        style={{
          fontSize: '70px',
          marginBottom: '14px',
          filter: 'drop-shadow(0 0 24px rgba(255, 77, 141, 0.8))'
        }}
      >
        💌
      </div>

      <div
        className="script"
        style={{
          fontSize: '44px',
          lineHeight: 1.2,
          color: '#ffd1e3',
          textShadow: '0 0 24px #ff4d8d'
        }}
      >
        A little surprise<br />for someone special
      </div>

      <p style={{ margin: '16px 0 0', opacity: 0.85, fontSize: '15px' }}>
        made with love, only for <b style={{ color: '#F6D58A' }}>{CONFIG.girlName}</b>
      </p>

      <button
        className="btn-cinema"
        onClick={handleStart}
        style={{ marginTop: '36px', zIndex: 10 }}
      >
        Tap to begin 💖
      </button>
    </div>
  );
};
