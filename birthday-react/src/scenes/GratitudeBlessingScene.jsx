import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Sun, ShieldCheck, Crown, RotateCcw } from 'lucide-react';
import { CONFIG } from '../config/storyConfig';

export const GratitudeBlessingScene = ({ onRestart }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    sounds.chime();
    sounds.tada();

    // Soft continuous celebratory gold & rose confetti
    const end = Date.now() + 3.5 * 1000;
    const frame = () => {
      confetti({
        particleCount: 3,
        spread: 60,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#ffffff']
      });
      confetti({
        particleCount: 3,
        spread: 60,
        origin: { x: 0.9, y: 0.8 },
        colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#ffffff']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 35,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const blessings = [
    {
      icon: <ShieldCheck size={20} color="#9D1238" />,
      title: "Thank You For Being My Pillar",
      text: "Through every difficult lecture, unspoken worry, and challenging season, you stood beside me as an unshakeable pillar of strength and peace."
    },
    {
      icon: <Sun size={20} color="#d97706" />,
      title: "Warmth & Boundless Blessings",
      text: "May good health, pure joy, endless laughter, and boundless opportunities surround your steps. May the universe return all the kindness you give a hundredfold."
    },
    {
      icon: <Heart size={20} color="#e11d48" />,
      title: "Forever Grateful for You",
      text: "Having you in my life is the greatest gift. Thank you for your warmth, your pure heart, your patience, and for simply being YOU."
    }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, #300c1e 0%, #17040d 65%, #070104 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 2.5vw, 24px)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow Aura */}
      <div
        style={{
          position: 'absolute',
          width: 'min(92vw, 750px)',
          height: 'min(70vh, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,213,138,0.2) 0%, rgba(157,18,56,0.18) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Gratitude & Blessing Card */}
      <div
        ref={cardRef}
        style={{
          width: 'min(96%, 720px)',
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: 'clamp(22px, 3.5vw, 34px)',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(246, 213, 138, 0.35)',
          padding: 'clamp(18px, 3.2vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Crown & Blessing Ribbon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #9D1238, #5A0B20)',
            color: '#F6D58A',
            padding: '6px 22px',
            borderRadius: '999px',
            fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 6px 18px rgba(157, 18, 56, 0.3)',
            marginBottom: '10px'
          }}
        >
          <Crown size={15} />
          <span>With All My Heart • Gratitude & Blessings</span>
          <Sparkles size={15} />
        </div>

        {/* Grand Headline */}
        <h2
          className="script"
          style={{
            fontSize: 'clamp(2rem, 4.4vw, 3.2rem)',
            color: '#9D1238',
            margin: '0 0 6px 0',
            fontWeight: 800,
            lineHeight: 1.2
          }}
        >
          Thank you for being in my life, {CONFIG.girlName || "Sayali"}! 💖🌸
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.7vw, 1rem)',
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 0 16px 0',
            fontStyle: 'italic'
          }}
        >
          "In the story of my life, having your friendship and support is the greatest blessing I will cherish forever."
        </p>

        {/* 3 Pillars of Gratitude Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          {blessings.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(246, 213, 138, 0.65)',
                borderRadius: '18px',
                padding: '14px',
                textAlign: 'left',
                boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: '#fff1f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {b.icon}
                </div>
                <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#1e293b', fontWeight: 700, lineHeight: 1.3 }}>
                  {b.title}
                </h4>
              </div>

              <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* Durvank & Sayali Signature Signoff */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '18px'
          }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #F6D58A', padding: '2px', background: '#fff' }}>
            <img src="/boy-face.png" alt="Durvank" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <span className="script" style={{ fontSize: '1.6rem', color: '#9D1238', fontWeight: 700 }}>
            Durvank & Sayali • Forever & Always
          </span>

          <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #F6D58A', padding: '2px', background: '#fff' }}>
            <img src="/girl-face.png" alt="Sayali" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Replay Full Experience Button */}
        <button
          onClick={onRestart}
          className="btn-gold"
          style={{
            padding: '12px 34px',
            fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(246, 213, 138, 0.45)'
          }}
        >
          <RotateCcw size={18} />
          <span>Replay Our Birthday Celebration Story 🎬</span>
        </button>
      </div>
    </div>
  );
};
