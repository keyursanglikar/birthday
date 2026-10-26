import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const MeetingScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    sounds.chime();
    sounds.tada();

    // Confetti celebration
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#FFFFFF']
    });

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          setTimeout(() => setCanProceed(true), 1500);
        }
      });
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
        background: 'radial-gradient(ellipse at 50% 30%, #4a1548 0%, #1c081e 65%, #08020a 100%)',
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
          padding: 'clamp(24px, 4vw, 38px)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 77, 141, 0.4)',
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
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #9D1238, #ff4d8d)',
            color: '#fff',
            borderRadius: '24px',
            padding: '6px 20px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '10px'
          }}
        >
          <Sparkles size={14} /> CHAPTER 9 · THEY MEET IN KARAD <Sparkles size={14} />
        </div>

        <h2 className="script" style={{ fontSize: 'clamp(34px, 5.5vw, 48px)', color: '#9D1238', margin: '4px 0 10px' }}>
          And our worlds met in Karad 💕
        </h2>

        {/* Characters standing and smiling next to the glowing 25 November Birthday Date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(14px, 4vw, 36px)',
            margin: '10px 0 16px',
            width: '100%'
          }}
        >
          {/* Durvank */}
          <div style={{ textAlign: 'center' }}>
            <CartoonBoy width="clamp(85px, 12vw, 135px)" height="clamp(100px, 14vw, 155px)" />
            <div style={{ marginTop: '2px', fontSize: '13px', fontWeight: 700, color: '#1d4ed8' }}>
              Durvank
            </div>
          </div>

          {/* Glowing Birthday Date 25 November Badge */}
          <div
            style={{
              padding: '16px 28px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #9D1238 0%, #ff4d8d 100%)',
              color: '#fff',
              boxShadow: '0 10px 30px rgba(157, 18, 56, 0.45)',
              textAlign: 'center',
              border: '2px solid #F6D58A'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em', color: '#F6D58A', textTransform: 'uppercase' }}>
              SPECIAL DATE
            </div>
            <div style={{ fontSize: 'clamp(46px, 8vw, 68px)', fontWeight: 800, lineHeight: 1, fontFamily: 'Dancing Script, cursive', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              25
            </div>
            <div style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, fontFamily: 'Dancing Script, cursive', color: '#F6D58A' }}>
              November
            </div>
          </div>

          {/* Sayali */}
          <div style={{ textAlign: 'center' }}>
            <CartoonGirl width="clamp(85px, 12vw, 135px)" height="clamp(100px, 14vw, 155px)" />
            <div style={{ marginTop: '2px', fontSize: '13px', fontWeight: 700, color: '#db2777' }}>
              Sayali
            </div>
          </div>
        </div>

        <p style={{ fontSize: '16px', color: '#5a223e', maxWidth: '500px', lineHeight: 1.5, margin: '0 auto 18px' }}>
          Two different cities, countless memories, and one unforgettable birthday to celebrate! ✨
        </p>

        {canProceed && (
          <NextPointer label="Tap below to celebrate birthday blast" style={{ marginBottom: '4px' }} />
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
          {canProceed ? 'Celebrate Birthday Blast 🎆 ➜' : 'Bringing our hearts together...'}
        </button>
      </div>
    </div>
  );
};
