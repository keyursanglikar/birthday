import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Heart, Award } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const JourneyScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const stops = CONFIG.journeyStops;

  useEffect(() => {
    sounds.chime();

    // Auto advance through years with sound & visual highlights
    let current = 0;
    const interval = setInterval(() => {
      if (current < stops.length - 1) {
        current++;
        setActiveStep(current);
        sounds.pop();
      } else {
        clearInterval(interval);
        setIsCompleted(true);
        sounds.tada();
        confetti({
          particleCount: 65,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const cur = stops[activeStep];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 20%, #4a154b 0%, #20082c 60%, #0a030f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 24px) 24px clamp(16px, 3vw, 24px)',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: 'center', zIndex: 10, marginTop: '12px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#F6D58A', fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <Sparkles size={14} /> Our Timeline & Friendship Route <Sparkles size={14} />
        </div>
        <h2 className="script" style={{ fontSize: 'clamp(32px, 5vw, 44px)', color: '#ffd1e3', textShadow: '0 0 16px rgba(255, 77, 141, 0.6)', marginTop: '2px' }}>
          From 2022 to 2026… & Beyond 💕
        </h2>
      </div>

      {/* Horizontal Interactive Year Badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          width: '100%',
          maxWidth: '560px',
          zIndex: 10,
          margin: '10px 0'
        }}
      >
        {stops.map((s, idx) => {
          const isActive = idx === activeStep;
          const isPassed = idx <= activeStep;
          return (
            <div
              key={s.year}
              onClick={() => {
                setActiveStep(idx);
                sounds.pop();
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative'
              }}
            >
              {/* Connecting line */}
              {idx > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '50%',
                    width: '100%',
                    height: '3px',
                    background: isPassed ? 'linear-gradient(90deg, #ff4d8d, #F6D58A)' : 'rgba(255, 255, 255, 0.15)',
                    zIndex: -1,
                    transition: 'all 0.4s ease'
                  }}
                />
              )}

              {/* Glowing Year Node */}
              <div
                style={{
                  width: isActive ? '36px' : '30px',
                  height: isActive ? '36px' : '30px',
                  borderRadius: '50%',
                  background: isActive ? 'linear-gradient(135deg, #ff4d8d, #ff856e)' : isPassed ? '#F6D58A' : 'rgba(255, 255, 255, 0.2)',
                  color: isActive ? '#fff' : isPassed ? '#351021' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: isActive ? '18px' : '14px',
                  boxShadow: isActive ? '0 0 20px rgba(255, 77, 141, 0.8), 0 4px 10px rgba(0,0,0,0.4)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {isActive ? '❤️' : s.emoji}
              </div>

              {/* Year Label */}
              <span
                style={{
                  marginTop: '8px',
                  fontSize: isActive ? '15px' : '12px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#F6D58A' : isPassed ? '#ffd1e3' : 'rgba(255, 255, 255, 0.45)',
                  transition: 'all 0.3s'
                }}
              >
                {s.year}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Spotlight Card for Active Year */}
      <div
        style={{
          width: 'min(94%, 520px)',
          background: 'rgba(255, 255, 255, 0.94)',
          borderRadius: '28px',
          padding: 'clamp(20px, 3.5vw, 32px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(255, 77, 141, 0.3)',
          border: '2px solid rgba(246, 213, 138, 0.6)',
          color: '#351021',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(14px)'
        }}
      >
        {/* Top Year Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #9D1238, #ff4d8d)',
            color: '#fff',
            borderRadius: '20px',
            padding: '5px 16px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            boxShadow: '0 4px 12px rgba(157, 18, 56, 0.35)',
            marginBottom: '12px'
          }}
        >
          <Calendar size={14} /> YEAR {cur.year} · CHAPTER {activeStep + 1}
        </div>

        {/* Milestone Emoji and Title */}
        <div style={{ fontSize: '42px', marginBottom: '4px' }}>{cur.emoji}</div>
        <h3 style={{ fontSize: 'clamp(20px, 3vw, 25px)', fontWeight: 700, color: '#9D1238', marginBottom: '8px' }}>
          {cur.title}
        </h3>

        {/* Narrative Description */}
        <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: '#4a1733', margin: '0 auto', maxWidth: '420px' }}>
          {cur.desc}
        </p>

        {/* Next / Previous Year Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '18px' }}>
          {activeStep > 0 && (
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              style={{
                background: 'rgba(53, 16, 33, 0.08)',
                border: '1px solid rgba(53, 16, 33, 0.2)',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#351021',
                cursor: 'pointer'
              }}
            >
              ‹ {stops[activeStep - 1].year}
            </button>
          )}

          {activeStep < stops.length - 1 && (
            <button
              onClick={() => setActiveStep((prev) => Math.min(stops.length - 1, prev + 1))}
              style={{
                background: 'rgba(157, 18, 56, 0.1)',
                border: '1px solid rgba(157, 18, 56, 0.3)',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#9D1238',
                cursor: 'pointer'
              }}
            >
              {stops[activeStep + 1].year} ›
            </button>
          )}
        </div>
      </div>

      {/* Primary CTA Button to advance to Curtain Reveal */}
      <div style={{ zIndex: 12, marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isCompleted && (
          <NextPointer label="Tap below to untie the ribbon" />
        )}
        <button
          className="btn-cinema"
          onClick={onNext}
          disabled={!isCompleted}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            boxShadow: isCompleted ? '0 8px 25px rgba(157, 18, 56, 0.6)' : 'none',
            opacity: isCompleted ? 1 : 0.45
          }}
        >
          {isCompleted ? 'Untie the heart ribbon 🎀 ➜' : 'Traveling through the years...'}
        </button>
      </div>
    </div>
  );
};
