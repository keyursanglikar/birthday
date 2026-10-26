import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';

export const BirthdayBlastScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const flashRef = useRef(null);
  const wishTextRef = useRef(null);
  const nextBtnRef = useRef(null);

  const [wishIndex, setWishIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    sounds.boom();
    sounds.tada();

    // Multi-angle celebratory confetti blast
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#FF9A76', '#FFFFFF']
    });

    const ctx = gsap.context(() => {
      // Camera light flash
      gsap.fromTo(flashRef.current,
        { opacity: 0.95 },
        { opacity: 0, duration: 0.9, ease: 'power2.out' }
      );

      // Staggered wishes loop
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < CONFIG.wishes.length - 1) {
          idx++;
          setWishIndex(idx);
          if (wishTextRef.current) {
            gsap.fromTo(wishTextRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
          }
        } else {
          clearInterval(interval);
          setCanProceed(true);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 45%, #6b154a 0%, #200823 70%, #0a020d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '30px',
        overflow: 'hidden'
      }}
    >
      <div ref={flashRef} style={{ position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none', zIndex: 10 }} />

      <div style={{ color: '#F6D58A', fontSize: '38px', textShadow: '0 0 20px #ff9a00', lineHeight: 1 }} className="script">
        Happy Birthday
      </div>
      <div style={{ color: '#fff', fontSize: 'clamp(54px, 16vw, 84px)', textShadow: '0 0 24px #ff4d8d, 0 0 50px #ff4d8d', lineHeight: 1.15 }} className="script">
        {CONFIG.girlName} 💕
      </div>

      <div
        ref={wishTextRef}
        style={{
          marginTop: '24px',
          fontSize: '18px',
          color: '#ffe3ee',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          minHeight: '60px',
          maxWidth: '380px',
          lineHeight: 1.5
        }}
      >
        {CONFIG.wishes[wishIndex]}
      </div>

      {canProceed && (
        <button
          ref={nextBtnRef}
          className="btn-cinema"
          onClick={onNext}
          style={{ position: 'absolute', bottom: '7%', zIndex: 12 }}
        >
          Pop some balloons 🎈 ➜
        </button>
      )}
    </div>
  );
};
