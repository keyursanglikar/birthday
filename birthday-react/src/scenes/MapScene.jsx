import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { MapPin, Navigation } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const MapScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out'
      });

      const timer = setTimeout(() => {
        setCanProceed(true);
      }, 3500);

      return () => clearTimeout(timer);
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
        background: 'radial-gradient(ellipse at 50% 30%, #30103b 0%, #15061c 65%, #08020a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)',
        overflow: 'hidden'
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: 'min(94%, 720px)',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '32px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.75), 0 0 45px rgba(246, 213, 138, 0.35)',
          border: '2px solid rgba(246, 213, 138, 0.7)',
          textAlign: 'center',
          color: '#351021',
          zIndex: 10,
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#fff',
            borderRadius: '24px',
            padding: '6px 18px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}
        >
          <Navigation size={14} /> CHAPTER 7 · THE THREE-CITY JOURNEY
        </div>

        <h2 className="script" style={{ fontSize: 'clamp(32px, 5.5vw, 44px)', color: '#9D1238', margin: '4px 0' }}>
          Two roads, one beautiful destination 💕
        </h2>

        {/* 3 City Route Diagram: Satara -> Karad <- Kolhapur */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(12px, 4vw, 36px)',
            margin: '18px 0 20px',
            width: '100%'
          }}
        >
          {/* Satara (Durvank) */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '16px',
                background: '#ede9fe',
                color: '#6d28d9',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '6px'
              }}
            >
              📍 Satara
            </div>
            <CartoonBoy width="clamp(80px, 11vw, 125px)" height="clamp(95px, 13vw, 145px)" />
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#6d28d9', marginTop: '2px' }}>Durvank</div>
          </div>

          {/* Animated Connecting Pathway to Karad */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '220px' }}>
            <div style={{ fontSize: '18px', color: '#ff4d8d', fontWeight: 700, marginBottom: '6px' }}>
              Meeting at Karad
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #3b82f6 0%, #9D1238 50%, #ec4899 100%)',
                boxShadow: '0 0 12px rgba(157, 18, 56, 0.4)'
              }}
            />
            <div style={{ fontSize: '26px', marginTop: '6px' }}>
              💞
            </div>
          </div>

          {/* Kolhapur (Sayali) */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '16px',
                background: '#fce7f3',
                color: '#be185d',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '6px'
              }}
            >
              📍 Kolhapur
            </div>
            <CartoonGirl width="clamp(80px, 11vw, 125px)" height="clamp(95px, 13vw, 145px)" />
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#be185d', marginTop: '2px' }}>Sayali</div>
          </div>
        </div>

        <p style={{ fontSize: '15.5px', color: '#5a223e', maxWidth: '480px', lineHeight: 1.5, margin: '0 auto 16px' }}>
          No matter how many kilometers lie between Satara and Kolhapur, every road leads straight to you.
        </p>

        {canProceed && (
          <NextPointer label="Tap below to travel to Karad" style={{ marginBottom: '4px' }} />
        )}

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-gold"
          style={{
            padding: '12px 34px',
            fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
            borderRadius: '999px',
            boxShadow: canProceed ? '0 8px 24px rgba(157, 18, 56, 0.35)' : 'none'
          }}
        >
          {canProceed ? 'Travel to Karad 🛣️ ➜' : 'Tracing the journey route...'}
        </button>
      </div>
    </div>
  );
};
