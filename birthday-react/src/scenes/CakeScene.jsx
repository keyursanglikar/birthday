import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export const CakeScene = ({ onNext, onPrev }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const containerRef = useRef(null);
  const flame1Ref = useRef(null);
  const flame2Ref = useRef(null);
  const flame3Ref = useRef(null);
  const cakeRef = useRef(null);
  const wishMessageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle flicker of candle flames
      [flame1Ref.current, flame2Ref.current, flame3Ref.current].forEach((f, i) => {
        if (f) {
          gsap.to(f, {
            scaleY: 1.25,
            scaleX: 0.88,
            duration: 0.35 + i * 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      });

      // Cake entrance
      gsap.from(cakeRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'back.out(1.6)'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Flame extinguish animation
    gsap.to([flame1Ref.current, flame2Ref.current, flame3Ref.current], {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });

    // Celebratory pastel confetti
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#ffc2d1', '#ffe5ec', '#fde24f']
    });

    // Reveal wish message
    if (wishMessageRef.current) {
      gsap.fromTo(
        wishMessageRef.current,
        { opacity: 0, y: 25, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.6)' }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 36px)',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#e02974', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={14} /> Make A Secret Wish
        </div>
        <h2 className="script" style={{ fontSize: 'clamp(34px, 4.8vw, 46px)', color: '#4a1530', marginTop: '2px' }}>
          Birthday Celebration 🎂
        </h2>
      </div>

      {/* Birthday Cake Illustration */}
      <div ref={cakeRef} style={{ margin: '10px 0', position: 'relative' }}>
        <svg width="260" height="200" viewBox="0 0 260 200">
          <defs>
            <linearGradient id="cakeCream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff8fa" />
              <stop offset="1" stopColor="#ffe4ee" />
            </linearGradient>
            <linearGradient id="cakeBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffb3cc" />
              <stop offset="1" stopColor="#ff85a8" />
            </linearGradient>
            <radialGradient id="flameG">
              <stop offset="0" stopColor="#fffad4" />
              <stop offset="50%" stopColor="#ffd000" />
              <stop offset="100%" stopColor="#ff6200" />
            </radialGradient>
          </defs>

          {/* Cake Stand Plate */}
          <ellipse cx="130" cy="184" rx="100" ry="14" fill="#ffffff" stroke="#f0c2d3" strokeWidth="2" />
          <ellipse cx="130" cy="180" rx="90" ry="10" fill="#fff0f5" />

          {/* Bottom Cake Layer */}
          <rect x="55" y="115" width="150" height="60" rx="12" fill="url(#cakeBase)" />
          <ellipse cx="130" cy="115" rx="75" ry="14" fill="url(#cakeCream)" />

          {/* Top Cake Layer */}
          <rect x="75" y="70" width="110" height="48" rx="10" fill="url(#cakeBase)" />
          <ellipse cx="130" cy="70" rx="55" ry="12" fill="url(#cakeCream)" />

          {/* Frosting Drips */}
          <path d="M75 70 Q85 86 95 70 Q105 88 115 70 Q125 90 135 70 Q145 88 155 70 Q165 86 175 70 Q185 84 185 70" fill="url(#cakeCream)" />

          {/* Strawberry Decorations */}
          <circle cx="100" cy="65" r="7" fill="#ff3864" />
          <circle cx="130" cy="63" r="8" fill="#ff3864" />
          <circle cx="160" cy="65" r="7" fill="#ff3864" />

          {/* Candles */}
          <rect x="98" y="32" width="6" height="30" rx="2" fill="#fff" stroke="#ffb4cc" strokeWidth="1" />
          <rect x="127" y="24" width="6" height="38" rx="2" fill="#fff" stroke="#ffb4cc" strokeWidth="1" />
          <rect x="156" y="32" width="6" height="30" rx="2" fill="#fff" stroke="#ffb4cc" strokeWidth="1" />

          {/* Candle Flames */}
          <ellipse ref={flame1Ref} cx="101" cy="22" rx="4.5" ry="9" fill="url(#flameG)" />
          <ellipse ref={flame2Ref} cx="130" cy="14" rx="5" ry="10" fill="url(#flameG)" />
          <ellipse ref={flame3Ref} cx="159" cy="22" rx="4.5" ry="9" fill="url(#flameG)" />
        </svg>
      </div>

      {/* Interactive Blow Button */}
      {!candlesBlown ? (
        <button
          className="btn-primary"
          onClick={handleBlowCandles}
          style={{ marginTop: '8px' }}
        >
          💨 Blow The Candles & Make A Wish
        </button>
      ) : (
        <div
          ref={wishMessageRef}
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            borderRadius: '24px',
            padding: '16px 28px',
            boxShadow: '0 12px 35px rgba(230, 110, 155, 0.22)',
            border: '1px solid rgba(255, 220, 235, 0.9)',
            maxWidth: '460px',
            margin: '6px auto 0'
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#ff4f8b', marginBottom: '4px' }}>
            ✨ Wish Granted with All My Heart ✨
          </div>
          <p style={{ fontSize: '15px', color: '#682946', lineHeight: 1.5 }}>
            May every dream you hold close today unfold into moments of everlasting smiles and laughter.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="nav-bottom-bar">
        <button className="btn-secondary" onClick={onPrev}>
          ‹ Photo Gallery
        </button>
        <button className="btn-primary" onClick={onNext} style={{ padding: '12px 28px', fontSize: '15px' }}>
          Read Love Note 💌 ➜
        </button>
      </div>
    </div>
  );
};
