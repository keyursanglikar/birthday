import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Coffee, Music } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const DriveScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const flashRef = useRef(null);
  const cardRef = useRef(null);
  const [phase, setPhase] = useState('drive'); // 'drive' or 'hangout'
  const [chatIdx, setChatIdx] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    sounds.chime();

    // After 6 seconds of romantic drive, transition to Chai cafe hangout
    const timer = setTimeout(() => {
      setPhase('hangout');
      sounds.tada();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'hangout') {
      const interval = setInterval(() => {
        setChatIdx((prev) => {
          if (prev < CONFIG.hangoutChat.length - 1) {
            sounds.pop();
            return prev + 1;
          } else {
            clearInterval(interval);
            setCanProceed(true);
            return prev;
          }
        });
      }, 2400);

      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: phase === 'drive'
          ? 'linear-gradient(to bottom, #ff7a9c 0%, #ffbe76 50%, #ffeaa7 100%)'
          : 'radial-gradient(ellipse at 50% 30%, #3d1245 0%, #1a0824 60%, #09020e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)',
        overflow: 'hidden',
        transition: 'background 1s ease'
      }}
    >
      <div ref={flashRef} style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none', zIndex: 30 }} />

      {phase === 'drive' ? (
        /* ================= PHASE A: CINEMATIC SUNSET DRIVE ================= */
        <div
          ref={cardRef}
          style={{
            width: 'min(94%, 680px)',
            background: 'rgba(255, 255, 255, 0.94)',
            borderRadius: '32px',
            padding: 'clamp(24px, 4vw, 38px)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 122, 156, 0.4)',
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
              gap: '6px',
              background: 'linear-gradient(135deg, #9D1238, #ff4d8d)',
              color: '#fff',
              borderRadius: '24px',
              padding: '6px 18px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '10px'
            }}
          >
            <Music size={14} /> CHAPTER 13 · SUNSET DRIVES & FAVORITE SONGS 🚗
          </div>

          <h2 className="script" style={{ fontSize: 'clamp(32px, 5.5vw, 46px)', color: '#9D1238', margin: '4px 0' }}>
            Wind in our hair, hearts full of songs 🎶
          </h2>

          <p style={{ fontSize: '15.5px', color: '#5a223e', maxWidth: '480px', lineHeight: 1.5, marginBottom: '18px' }}>
            Long open roads under the golden sunset, singing our hearts out to every melody.
          </p>

          {/* Both Uncropped Faces riding together */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(16px, 5vw, 40px)',
              margin: '8px 0 20px',
              width: '100%'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <CartoonBoy width="clamp(90px, 13vw, 135px)" height="clamp(105px, 15vw, 155px)" />
              <div style={{ marginTop: '4px', fontSize: '14px', fontWeight: 700, color: '#9D1238' }}>
                Durvank
              </div>
            </div>

            <div style={{ fontSize: '48px', animation: 'bounce 1s infinite alternate' }}>
              🚗💨
            </div>

            <div style={{ textAlign: 'center' }}>
              <CartoonGirl width="clamp(90px, 13vw, 135px)" height="clamp(105px, 15vw, 155px)" />
              <div style={{ marginTop: '4px', fontSize: '14px', fontWeight: 700, color: '#ff4d8d' }}>
                Sayali
              </div>
            </div>
          </div>

          {/* Skip / Next Action Button */}
          <button
            onClick={() => setPhase('hangout')}
            className="btn-cinema"
            style={{ padding: '11px 28px', fontSize: '15px' }}
          >
            Stop for Chai & Snacks ☕ ➜
          </button>
        </div>
      ) : (
        /* ================= PHASE B: COZY OUTDOOR CHAI HANGOUT ================= */
        <div
          style={{
            width: 'min(94%, 680px)',
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: '32px',
            padding: 'clamp(24px, 4vw, 38px)',
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
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #7c2d12, #ea580c)',
              color: '#fff',
              borderRadius: '24px',
              padding: '6px 18px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '10px'
            }}
          >
            <Coffee size={14} /> CHAI, SNACKS & ENDLESS GOSSIP ☕
          </div>

          <h2 className="script" style={{ fontSize: 'clamp(32px, 5.5vw, 46px)', color: '#9D1238', margin: '4px 0' }}>
            Two cups of warm chai & endless laughs 💕
          </h2>

          {/* Characters Sitting together enjoying chai */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(16px, 5vw, 40px)',
              margin: '10px 0 16px',
              width: '100%'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <CartoonBoy width="clamp(85px, 12vw, 130px)" height="clamp(100px, 14vw, 150px)" />
              <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 700, color: '#9D1238' }}>
                Durvank
              </div>
            </div>

            <div style={{ fontSize: '42px' }}>
              ☕✨
            </div>

            <div style={{ textAlign: 'center' }}>
              <CartoonGirl width="clamp(85px, 12vw, 130px)" height="clamp(100px, 14vw, 150px)" />
              <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 700, color: '#ff4d8d' }}>
                Sayali
              </div>
            </div>
          </div>

          {/* Interactive Live Chat Dialogue */}
          <div
            style={{
              background: '#fff0f5',
              border: '1.5px solid rgba(255, 77, 141, 0.4)',
              borderRadius: '20px',
              padding: '12px 24px',
              color: '#351021',
              fontWeight: 600,
              fontSize: '16px',
              maxWidth: '380px',
              margin: '0 auto 16px',
              boxShadow: '0 4px 14px rgba(255, 77, 141, 0.15)'
            }}
          >
            <span style={{ color: CONFIG.hangoutChat[chatIdx].from === 'boy' ? '#1d4ed8' : '#db2777' }}>
              {CONFIG.hangoutChat[chatIdx].from === 'boy' ? '👦 Durvank: ' : '👧 Sayali: '}
            </span>
            "{CONFIG.hangoutChat[chatIdx].text}"
          </div>

          {/* Next Scene CTA Button */}
          {canProceed && (
            <NextPointer label="Tap below to watch our sunset memory" />
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
            {canProceed ? 'Watch Our Cinematic Memory 🎬 ➜' : 'Sipping chai & chatting... ☕'}
          </button>
        </div>
      )}
    </div>
  );
};
