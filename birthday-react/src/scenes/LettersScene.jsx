import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronLeft, ChevronRight, Feather } from 'lucide-react';

export const LettersScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  const letters = CONFIG.letters;

  const letterMetadata = [
    {
      chapter: "Letter 1 • Freshers Days & Chai",
      date: "2022 • Dnyanshree Institute",
      seal: "🤝"
    },
    {
      chapter: "Letter 2 • Silent Solace & Empathy",
      date: "2023 • Hallway Glances",
      seal: "🌸"
    },
    {
      chapter: "Letter 3 • From Friendship to Forever",
      date: "2024 • Highway Sunsets",
      seal: "💞"
    },
    {
      chapter: "Letter 4 • 25 November Birthday Wish",
      date: "25 November • Happy Birthday Sayali",
      seal: "👑"
    }
  ];

  // Auto flip pages every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextPage();
    }, 5500);

    return () => clearInterval(timer);
  }, [activePageIndex]);

  // Entrance animation
  useEffect(() => {
    sounds.chime();
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 35,
        duration: 1.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    sounds.whoosh();

    gsap.to('.letter-sheet', {
      rotateY: -8,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        setActivePageIndex((prev) => {
          const next = (prev + 1) % letters.length;
          if (next === letters.length - 1) {
            setTourCompleted(true);
          }
          return next;
        });
        setIsFlipping(false);
      }
    });
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    sounds.whoosh();

    gsap.to('.letter-sheet', {
      rotateY: 8,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        setActivePageIndex((prev) => (prev - 1 + letters.length) % letters.length);
        setIsFlipping(false);
      }
    });
  };

  const currentMeta = letterMetadata[activePageIndex];
  const currentLetterText = letters[activePageIndex];

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

      {/* Main Responsive Letter Stage Container */}
      <div
        ref={cardRef}
        style={{
          width: 'min(96%, 660px)',
          background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: 'clamp(22px, 3.5vw, 32px)',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(246, 213, 138, 0.35)',
          padding: 'clamp(12px, 2.5vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          perspective: '1200px',
          zIndex: 10,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Top Header Ribbon & Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(157, 18, 56, 0.15)',
            paddingBottom: '8px'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9D1238' }}>
            <Feather size={17} />
            <span style={{ fontSize: 'clamp(0.78rem, 1.6vw, 0.92rem)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Durvank's Letters to Sayali
            </span>
          </div>

          {/* Letter Progress Indicators */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {letters.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActivePageIndex(idx)}
                style={{
                  width: idx === activePageIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === activePageIndex ? '#9D1238' : '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Unified Responsive Letter Card */}
        <div
          className="letter-sheet"
          style={{
            width: '100%',
            background: '#fffdf9 repeating-linear-gradient(transparent 0 27px, rgba(215, 185, 150, 0.2) 27px 28px)',
            borderRadius: '20px',
            border: '1.5px solid #ecd5b8',
            borderLeft: '6px solid #9D1238',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            padding: 'clamp(14px, 2.5vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s ease'
          }}
        >
          {/* Postmark Header & Wax Seal Emblem */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed #d97706',
              paddingBottom: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Wax Seal Badge */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 30%, #f43f5e, #be123c, #881337)',
                  border: '2px solid #fecdd3',
                  boxShadow: '0 4px 12px rgba(190, 18, 60, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: '#fff'
                }}
              >
                {currentMeta.seal}
              </div>

              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9D1238', display: 'block' }}>
                  {currentMeta.chapter}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{currentMeta.date}</span>
              </div>
            </div>

            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b45309' }}>
              LETTER {activePageIndex + 1} OF {letters.length}
            </span>
          </div>

          {/* Letter Handwriting Body */}
          <div
            className="handwriting"
            style={{
              fontSize: 'clamp(17px, 2.1vw, 21px)',
              lineHeight: '28px',
              color: '#3b1d24',
              whiteSpace: 'pre-wrap',
              minHeight: 'clamp(150px, 28vh, 230px)',
              margin: '4px 0'
            }}
          >
            {currentLetterText}
          </div>

          {/* Navigation Controls Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(157, 18, 56, 0.15)',
              paddingTop: '8px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePrevPage}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155'
                }}
                title="Previous Letter"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={handleNextPage}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155'
                }}
                title="Next Letter"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Auto-flipping in seconds...
            </span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={onNext}
            disabled={!tourCompleted}
            className="btn-gold"
            style={{
              padding: '11px 32px',
              fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: tourCompleted ? 'pointer' : 'not-allowed',
              opacity: tourCompleted ? 1 : 0.45,
              boxShadow: tourCompleted ? '0 8px 25px rgba(246, 213, 138, 0.35)' : 'none'
            }}
          >
            {tourCompleted ? 'Celebrate Our Birthday Stage 🎂 ➜' : 'Reading handwritten letter book... 📖'}
          </button>
        </div>
      </div>
    </div>
  );
};
