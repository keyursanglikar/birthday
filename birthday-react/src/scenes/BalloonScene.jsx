import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export const BalloonScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const bigHeartRef = useRef(null);

  const [poppedIds, setPoppedIds] = useState([]);
  const [currentGift, setCurrentGift] = useState(null);
  const [showBigHeart, setShowBigHeart] = useState(false);

  // 6 Designer Pastel-Neon Gradient Balloons
  const balloonStyles = [
    { color: '#e11d48', grad: 'radial-gradient(circle at 35% 30%, #fda4af, #e11d48, #9f1239)', glow: 'rgba(225,29,72,0.45)', left: '12%', top: '22%' },
    { color: '#f59e0b', grad: 'radial-gradient(circle at 35% 30%, #fef08a, #f59e0b, #b45309)', glow: 'rgba(245,158,11,0.45)', left: '42%', top: '24%' },
    { color: '#06b6d4', grad: 'radial-gradient(circle at 35% 30%, #a5f3fc, #06b6d4, #0e7490)', glow: 'rgba(6,182,212,0.45)', left: '72%', top: '20%' },
    { color: '#a855f7', grad: 'radial-gradient(circle at 35% 30%, #e9d5ff, #a855f7, #6b21a8)', glow: 'rgba(168,85,247,0.45)', left: '22%', top: '52%' },
    { color: '#10b981', grad: 'radial-gradient(circle at 35% 30%, #a7f3d0, #10b981, #047857)', glow: 'rgba(16,185,129,0.45)', left: '52%', top: '56%' },
    { color: '#f43f5e', grad: 'radial-gradient(circle at 35% 30%, #fecdd3, #f43f5e, #be123c)', glow: 'rgba(244,63,94,0.45)', left: '78%', top: '50%' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating animation
      gsap.utils.toArray('.balloon-item').forEach((b, i) => {
        gsap.to(b, {
          y: '-=18',
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 2.2 + (i % 3) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePop = (gift, e) => {
    const el = e.currentTarget;
    sounds.pop();
    confetti({
      particleCount: 40,
      spread: 65,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#e11d48', '#F6D58A', '#ffb6c1', '#ffffff']
    });

    gsap.to(el, {
      scale: 1.6,
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        el.style.display = 'none';
        setCurrentGift(gift);
        setPoppedIds((prev) => {
          const next = [...prev, gift.id];
          return next;
        });
      }
    });
  };

  const handleDismissCard = () => {
    sounds.pop();
    const nextCount = poppedIds.length;
    setCurrentGift(null);
    if (nextCount >= CONFIG.gifts.length) {
      setTimeout(() => {
        setShowBigHeart(true);
      }, 350);
    }
  };

  const handlePopBigHeart = (e) => {
    sounds.pop();
    sounds.tada();
    confetti({
      particleCount: 150,
      spread: 110,
      origin: { y: 0.48 },
      colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#FFFFFF', '#ffd700']
    });

    gsap.to(bigHeartRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onNext(); // Advance to Handshake scene
      }
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 35%, #250914 0%, #15050b 60%, #070104 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Floral Corner Garlands (Red Roses & Gold Leaves) */}
      <div style={{ position: 'absolute', top: '12px', left: '16px', zIndex: 12, display: 'flex', gap: '4px', opacity: 0.85 }}>
        <span style={{ fontSize: '1.4rem' }}>🌹</span>
        <span style={{ fontSize: '1.1rem' }}>✨</span>
        <span style={{ fontSize: '1.2rem' }}>🌸</span>
      </div>
      <div style={{ position: 'absolute', top: '12px', right: '16px', zIndex: 12, display: 'flex', gap: '4px', opacity: 0.85 }}>
        <span style={{ fontSize: '1.2rem' }}>🌸</span>
        <span style={{ fontSize: '1.1rem' }}>✨</span>
        <span style={{ fontSize: '1.4rem' }}>🌹</span>
      </div>

      {/* Top Floating Instruction Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.96)',
          padding: '8px 24px',
          borderRadius: '999px',
          border: '1.5px solid rgba(246, 213, 138, 0.9)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(246, 213, 138, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#9D1238',
          fontWeight: 700,
          fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)'
        }}
      >
        <span>🌹 Pop all 6 Balloons to unlock the Grand Heart Surprise!</span>
        <span style={{ background: '#9D1238', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem' }}>
          {poppedIds.length}/{CONFIG.gifts.length}
        </span>
      </div>

      {/* 6 High-Gloss 3D Mystery Balloons (No internal icons shown) */}
      {CONFIG.gifts.map((gift, idx) => {
        const style = balloonStyles[idx % balloonStyles.length];
        const isPopped = poppedIds.includes(gift.id);
        if (isPopped) return null;

        return (
          <div
            key={gift.id}
            className="balloon-item"
            onClick={(e) => handlePop(gift, e)}
            style={{
              position: 'absolute',
              left: style.left,
              top: style.top,
              width: 'clamp(70px, 12vw, 100px)',
              height: 'clamp(95px, 16vw, 135px)',
              cursor: 'pointer',
              zIndex: 10,
              filter: `drop-shadow(0 15px 25px ${style.glow})`
            }}
          >
            {/* Balloon Body with 3D Gloss Highlight */}
            <div
              style={{
                width: '100%',
                height: '84%',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: style.grad,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset -8px -8px 15px rgba(0,0,0,0.3), inset 8px 8px 15px rgba(255,255,255,0.6)'
              }}
            >
              {/* Gloss Arc Reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '18%',
                  width: '25%',
                  height: '35%',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.75)',
                  transform: 'rotate(-25deg)',
                  filter: 'blur(1px)'
                }}
              />
              <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', zIndex: 2, opacity: 0.85, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                ✨
              </span>
            </div>

            {/* Balloon Knot */}
            <div
              style={{
                width: '12px',
                height: '8px',
                background: style.color,
                margin: '-2px auto 0 auto',
                borderRadius: '2px 2px 5px 5px'
              }}
            />

            {/* Balloon Curly String */}
            <svg viewBox="0 0 20 60" style={{ width: '20px', height: '60px', margin: '0 auto', display: 'block' }}>
              <path
                d="M10 0 Q18 20 10 35 T10 60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}

      {/* LUXURY REDESIGNED GIFT POPUP MODAL (Square-curved Cinema Card & Gold Action Button) */}
      {currentGift && (
        <div
          style={{
            position: 'absolute',
            zIndex: 40,
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
            borderRadius: '32px',
            border: '2px solid rgba(246, 213, 138, 0.9)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(246, 213, 138, 0.45)',
            padding: 'clamp(24px, 4.5vw, 36px)',
            maxWidth: '430px',
            width: '88%',
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
            animation: 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Circular Icon Emblem with Golden Border */}
          <div
            style={{
              width: '82px',
              height: '82px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #fff1f2, #fecdd3)',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.2rem',
              boxShadow: '0 10px 25px rgba(225,29,72,0.25)',
              border: '2px solid rgba(246, 213, 138, 0.8)'
            }}
          >
            {currentGift.icon || currentGift.e}
          </div>

          {/* Title */}
          <h3
            className="script"
            style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 2.4rem)',
              color: '#9D1238',
              margin: '0 0 8px 0',
              fontWeight: 800,
              lineHeight: 1.2
            }}
          >
            {currentGift.title} ✨
          </h3>

          {/* Message */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: '#475569',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
              fontWeight: 500
            }}
          >
            {currentGift.message}
          </p>

          {/* Redesigned Button */}
          <button
            onClick={handleDismissCard}
            className="btn-gold"
            style={{
              padding: '12px 34px',
              borderRadius: '999px',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              cursor: 'pointer',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(157, 18, 56, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{poppedIds.length >= CONFIG.gifts.length ? 'Unlock Final Heart Balloon 💖' : 'Pop Next Balloon 🎈'}</span>
          </button>
        </div>
      )}

      {/* FINAL HEART BALLOON TO POP AT LAST (When all 6 popped) */}
      {showBigHeart && (
        <div
          ref={bigHeartRef}
          onClick={handlePopBigHeart}
          style={{
            position: 'absolute',
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            animation: 'heartFloat 2s ease-in-out infinite'
          }}
        >
          {/* Realistic 3D True Heart Foil Balloon */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(210px, 36vw, 270px)',
              height: 'clamp(200px, 34vw, 250px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              filter: 'drop-shadow(0 20px 45px rgba(225, 29, 72, 0.65)) drop-shadow(0 0 25px rgba(246, 213, 138, 0.75))'
            }}
          >
            {/* SVG True Heart Balloon Shape with Gradient Shimmer & Radial Highlights */}
            <svg
              viewBox="0 0 200 185"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible'
              }}
            >
              <defs>
                <linearGradient id="heartFoilGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#ff9ebb" />
                  <stop offset="25%" stopColor="#f43f5e" />
                  <stop offset="65%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>

                <radialGradient id="heartHighlight" cx="35%" cy="30%" r="45%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="40%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </radialGradient>

                <linearGradient id="heartGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#F6D58A" />
                  <stop offset="100%" stopColor="#B47712" />
                </linearGradient>

                <filter id="glowFoil">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Heart Balloon Foil Body */}
              <path
                d="M100,170 C100,170 12,115 12,52 C12,18 42,4 72,12 C88,16 97,28 100,34 C103,28 112,16 128,12 C158,4 188,18 188,52 C188,115 100,170 100,170 Z"
                fill="url(#heartFoilGrad)"
                stroke="url(#heartGoldBorder)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                filter="url(#glowFoil)"
              />

              {/* Gloss Arc Reflection on Top-Left Cusp */}
              <path
                d="M40,32 C58,22 75,26 84,38 C75,44 58,42 42,56 C34,48 35,38 40,32 Z"
                fill="url(#heartHighlight)"
              />

              {/* Soft curved foil reflection lines */}
              <ellipse
                cx="65"
                cy="60"
                rx="28"
                ry="16"
                transform="rotate(-30 65 60)"
                fill="rgba(255, 255, 255, 0.35)"
              />

              {/* Sparkle Stars on Heart Balloon */}
              <text x="100" y="105" textAnchor="middle" fontSize="38" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.4))">
                💖
              </text>
            </svg>

            {/* Balloon Tie Knot */}
            <div
              style={{
                width: '16px',
                height: '10px',
                background: '#be123c',
                borderRadius: '3px 3px 6px 6px',
                marginTop: '-4px',
                border: '1px solid #F6D58A'
              }}
            />

            {/* Curly Gold Ribbon String */}
            <svg viewBox="0 0 24 60" style={{ width: '24px', height: '60px', display: 'block' }}>
              <path
                d="M12 0 Q22 20 12 38 T12 60"
                fill="none"
                stroke="#F6D58A"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Action Tap Badge */}
          <div
            style={{
              marginTop: '8px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,240,245,0.95))',
              padding: '10px 28px',
              borderRadius: '999px',
              color: '#9D1238',
              fontWeight: 800,
              fontSize: 'clamp(0.92rem, 2vw, 1.15rem)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.45)',
              border: '2px solid rgba(246, 213, 138, 0.9)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>✨ Tap the Heart Balloon to Pop & Continue! 🎈</span>
          </div>
        </div>
      )}
    </div>
  );
};
