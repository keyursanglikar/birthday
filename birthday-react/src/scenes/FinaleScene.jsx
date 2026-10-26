import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';

export const FinaleScene = ({ onNext, onRestart }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const flame1Ref = useRef(null);
  const flame2Ref = useRef(null);
  const flame3Ref = useRef(null);
  const [candlesBlown, setCandlesBlown] = useState(false);

  useEffect(() => {
    sounds.tada();

    // Fireworks & confetti stream from bottom sides
    const end = Date.now() + 4.5 * 1000;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 55,
        spread: 70,
        origin: { x: 0.05, y: 0.85 },
        colors: ['#F6D58A', '#FFB6CB', '#FF9A76', '#9D1238', '#FFFFFF', '#ffd700']
      });
      confetti({
        particleCount: 4,
        angle: 125,
        spread: 70,
        origin: { x: 0.95, y: 0.85 },
        colors: ['#F6D58A', '#FFB6CB', '#FF9A76', '#9D1238', '#FFFFFF', '#ffd700']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const ctx = gsap.context(() => {
      // Smooth stage entrance
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Flickering candle flames
      [flame1Ref.current, flame2Ref.current, flame3Ref.current].forEach((f, i) => {
        if (f) {
          gsap.to(f, {
            scaleY: 1.3,
            scaleX: 0.85,
            duration: 0.3 + i * 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    sounds.boom();
    sounds.tada();

    // Extinguish flames
    gsap.to([flame1Ref.current, flame2Ref.current, flame3Ref.current], {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });

    // Grand explosion of golden & ruby celebratory particles
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#F6D58A', '#FFB6CB', '#ff4d8d', '#ffd700', '#ffffff', '#e11d48']
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, #300a18 0%, #17040a 65%, #080103 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(14px, 2.5vw, 28px)'
      }}
    >
      {/* Golden Stage Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          width: 'min(90vw, 750px)',
          height: 'min(60vh, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,213,138,0.22) 0%, rgba(157,18,56,0.18) 50%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Grand Stage Card */}
      <div
        ref={cardRef}
        style={{
          width: 'min(94%, 740px)',
          background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 245, 248, 0.95) 100%)',
          borderRadius: 'clamp(24px, 4vw, 36px)',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 55px rgba(246, 213, 138, 0.35)',
          padding: 'clamp(14px, 2.8vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Crown & Royal Birthday Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #9D1238, #5A0B20)',
            color: '#F6D58A',
            padding: '7px 22px',
            borderRadius: '999px',
            fontSize: 'clamp(0.78rem, 1.6vw, 0.92rem)',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            boxShadow: '0 6px 20px rgba(157, 18, 56, 0.35)',
            border: '1px solid rgba(246, 213, 138, 0.6)'
          }}
        >
          <Sparkles size={16} color="#F6D58A" />
          <span>25 November • The Royal Birthday Stage</span>
          <Sparkles size={16} color="#F6D58A" />
        </div>

        {/* Grand Birthday Greeting */}
        <h1
          className="script"
          style={{
            fontSize: 'clamp(2.5rem, 5.8vw, 4.2rem)',
            color: '#9D1238',
            margin: '10px 0 2px 0',
            lineHeight: 1.15,
            fontWeight: 800,
            textShadow: '0 3px 15px rgba(157, 18, 56, 0.18)'
          }}
        >
          Happy Birthday {CONFIG.girlName || "Sayali"}! 👑✨
        </h1>

        <p
          className="script"
          style={{
            fontSize: 'clamp(1.15rem, 2.4vw, 1.6rem)',
            color: '#be185d',
            margin: '0 0 16px 0',
            fontStyle: 'italic'
          }}
        >
          "Sitting under the same sky... forever & always" 💖
        </p>

        {/* Royal Center Stage: Durvank - Grand 3D Cake - Sayali */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(12px, 3.5vw, 32px)',
            width: '100%',
            margin: '8px 0 18px 0'
          }}
        >
          {/* DURVANK PORTRAIT */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'clamp(95px, 20vw, 140px)'
            }}
          >
            <div
              style={{
                width: 'clamp(85px, 18vw, 125px)',
                height: 'clamp(85px, 18vw, 125px)',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, #F6D58A, #eab308, #b45309)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25), 0 0 20px rgba(246, 213, 138, 0.5)'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img
                  src="/boy-face.png"
                  alt={CONFIG.boyName || "Durvank"}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
            <span
              style={{
                marginTop: '8px',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                fontWeight: 700,
                color: '#1e3a8a',
                letterSpacing: '0.5px'
              }}
            >
              {CONFIG.boyName?.split(" ")[0] || "Durvank"} 🧢
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>With all my heart</span>
          </div>

          {/* DELICIOUS 3-TIER ROYAL BIRTHDAY CAKE */}
          <div
            onClick={handleBlowCandles}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 'clamp(10px, 2vw, 16px)',
              background: 'radial-gradient(circle, rgba(254,243,199,0.5) 0%, rgba(255,255,255,0.85) 100%)',
              borderRadius: '24px',
              border: '2px solid rgba(246, 213, 138, 0.7)',
              boxShadow: '0 12px 35px rgba(246, 213, 138, 0.35)',
              transition: 'transform 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {/* Candle Flames */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                marginBottom: '2px'
              }}
            >
              <div ref={flame1Ref} style={{ fontSize: '1.4rem' }}>
                {candlesBlown ? '💨' : '🔥'}
              </div>
              <div ref={flame2Ref} style={{ fontSize: '1.7rem', marginTop: '-4px' }}>
                {candlesBlown ? '💨' : '🔥'}
              </div>
              <div ref={flame3Ref} style={{ fontSize: '1.4rem' }}>
                {candlesBlown ? '💨' : '🔥'}
              </div>
            </div>

            {/* Candle Stems */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                marginBottom: '2px'
              }}
            >
              <div style={{ width: '6px', height: '16px', background: 'linear-gradient(#fbcfe8, #f43f5e)', borderRadius: '3px' }} />
              <div style={{ width: '7px', height: '20px', background: 'linear-gradient(#fef08a, #eab308)', borderRadius: '3px' }} />
              <div style={{ width: '6px', height: '16px', background: 'linear-gradient(#fbcfe8, #f43f5e)', borderRadius: '3px' }} />
            </div>

            {/* 3-Tier Layered Cake SVG */}
            <svg viewBox="0 0 160 110" style={{ width: 'clamp(110px, 22vw, 165px)', overflow: 'visible' }}>
              <defs>
                <linearGradient id="frostPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff758c" />
                  <stop offset="100%" stopColor="#ff4b72" />
                </linearGradient>
                <linearGradient id="frostGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff3bf" />
                  <stop offset="100%" stopColor="#F6D58A" />
                </linearGradient>
                <linearGradient id="frostVanilla" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffe4e6" />
                </linearGradient>
              </defs>

              {/* Top Tier */}
              <rect x="45" y="10" width="70" height="26" rx="6" fill="url(#frostPink)" />
              {/* Top frosting drips */}
              <path d="M45 14 Q52 24 60 14 Q68 24 76 14 Q84 24 92 14 Q100 24 108 14 L115 14 L115 10 L45 10 Z" fill="url(#frostVanilla)" />
              <circle cx="80" cy="18" r="3.5" fill="#ffd700" />

              {/* Middle Tier */}
              <rect x="28" y="36" width="104" height="32" rx="7" fill="url(#frostGold)" />
              {/* Gold Ribbon & Pearls */}
              <line x1="28" y1="52" x2="132" y2="52" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
              <circle cx="50" cy="52" r="3" fill="#be185d" />
              <circle cx="80" cy="52" r="4" fill="#be185d" />
              <circle cx="110" cy="52" r="3" fill="#be185d" />

              {/* Bottom Tier */}
              <rect x="12" y="68" width="136" height="36" rx="8" fill="url(#frostPink)" />
              {/* Bottom decorative swirls */}
              <path d="M12 76 Q26 88 40 76 Q54 88 68 76 Q82 88 96 76 Q110 88 124 76 Q138 88 148 76 L148 68 L12 68 Z" fill="url(#frostVanilla)" />

              {/* Golden Platter Base */}
              <ellipse cx="80" cy="106" rx="76" ry="6" fill="linear-gradient(#fef08a, #ca8a04)" stroke="#a16207" strokeWidth="1" />
            </svg>

            {/* Tap prompt */}
            <div
              style={{
                marginTop: '6px',
                fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
                fontWeight: 700,
                color: candlesBlown ? '#15803d' : '#9D1238',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {candlesBlown ? (
                <>🎉 Wish Made True!</>
              ) : (
                <>
                  <PartyPopper size={14} /> Tap to Blow Candles! 🎂
                </>
              )}
            </div>
          </div>

          {/* SAYALI PORTRAIT */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'clamp(95px, 20vw, 140px)'
            }}
          >
            <div
              style={{
                width: 'clamp(85px, 18vw, 125px)',
                height: 'clamp(85px, 18vw, 125px)',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, #F6D58A, #f472b6, #db2777)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25), 0 0 20px rgba(244, 114, 182, 0.5)'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fff1f2, #fce7f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img
                  src="/girl-face.png"
                  alt={CONFIG.girlName || "Sayali"}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
            <span
              style={{
                marginTop: '8px',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                fontWeight: 700,
                color: '#be185d',
                letterSpacing: '0.5px'
              }}
            >
              {CONFIG.girlName || "Sayali"} 🌸
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Birthday Princess</span>
          </div>
        </div>

        {/* Heartfelt Birthday Message */}
        <p
          style={{
            fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            color: '#351021',
            lineHeight: 1.5,
            maxWidth: '600px',
            margin: '0 0 14px 0'
          }}
        >
          May your life always be filled with boundless laughter, infinite warmth, sweet adventures,
          and dreams blossoming into reality. Thank you for making every day brighter and more meaningful! 🎂💖✨
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px'
          }}
        >
          <button
            onClick={onNext}
            disabled={!candlesBlown}
            className="btn-cinema"
            style={{
              padding: '12px 34px',
              fontSize: 'clamp(0.92rem, 1.9vw, 1.08rem)',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              boxShadow: candlesBlown ? '0 10px 30px rgba(157, 18, 56, 0.45)' : 'none',
              opacity: candlesBlown ? 1 : 0.45,
              cursor: candlesBlown ? 'pointer' : 'not-allowed'
            }}
          >
            <span>{candlesBlown ? 'Reveal Birthday Scratch Card 🎁 ➜' : 'Blow the candles first! 🎂'}</span>
          </button>

          <button
            onClick={onRestart}
            className="btn-gold"
            style={{
              padding: '12px 28px',
              fontSize: 'clamp(0.88rem, 1.8vw, 1.02rem)',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={17} />
            Replay Story
          </button>
        </div>
      </div>
    </div>
  );
};
