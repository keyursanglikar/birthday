import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, Quote } from 'lucide-react';

export const NameDissolveScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const nameBoxRef = useRef(null);
  const quoteCardRef = useRef(null);
  const [showQuote, setShowQuote] = useState(false);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  // Curated empowering & motivational birthday quotes for Sayali
  const quotes = [
    {
      title: "Crown of Grace & Strength 👑",
      text: "You are not just a year older today, but a thousand times wiser, stronger, and more radiant. Never doubt the quiet power and beauty within your soul.",
      author: "Birthday Motivation for Sayali"
    },
    {
      title: "Chasing Boundless Dreams ✨",
      text: "She remembered who she was and the game changed. May this year open every door to your dreams and reward your golden heart with infinite joy.",
      author: "Inspiring Womanhood"
    },
    {
      title: "A Light That Never Fades 🌸",
      text: "The world is brighter simply because you are in it. Walk forward with courage and your gentle smile, because greatness is walking beside you.",
      author: "Forever Cheering For You"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Dissolve name with blur, upward drift, and fade out
      tl.to(nameBoxRef.current.children, {
        opacity: 0,
        y: -60,
        scale: 1.35,
        filter: 'blur(16px)',
        stagger: 0.1,
        duration: 2.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setShowQuote(true);
          sounds.chime();
          confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#F6D58A', '#FFB6CB', '#9D1238']
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cycle through quotes smoothly
  useEffect(() => {
    if (!showQuote) return;
    const interval = setInterval(() => {
      setActiveQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [showQuote]);

  useEffect(() => {
    if (showQuote && quoteCardRef.current) {
      gsap.fromTo(quoteCardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.6)' }
      );
    }
  }, [showQuote]);

  const curQuote = quotes[activeQuoteIdx];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 35%, #4a1250 0%, #150a1e 70%, #08030d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(14px, 3vw, 28px)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'min(92vw, 750px)',
          height: 'min(65vh, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,213,138,0.2) 0%, rgba(157,18,56,0.18) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Name Initial Dissolving Effect */}
      <div
        ref={nameBoxRef}
        className="script"
        style={{
          fontSize: 'clamp(65px, 20vw, 110px)',
          color: '#fff',
          textShadow: '0 0 18px #ff4d8d, 0 0 42px #ff4d8d',
          display: showQuote ? 'none' : 'flex',
          whiteSpace: 'nowrap'
        }}
      >
        {[...CONFIG.girlName].map((char, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </div>

      {/* INSPIRING BIRTHDAY & MOTIVATIONAL GIRL QUOTES CARD ABOVE BUTTON */}
      {showQuote && (
        <div
          ref={quoteCardRef}
          style={{
            width: 'min(94%, 580px)',
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.95))',
            borderRadius: '30px',
            border: '2px solid rgba(246, 213, 138, 0.85)',
            boxShadow: '0 25px 75px rgba(0, 0, 0, 0.85), 0 0 40px rgba(246, 213, 138, 0.35)',
            padding: 'clamp(20px, 4vw, 34px)',
            textAlign: 'center',
            zIndex: 10,
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Top Crown Ribbon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #9D1238, #5A0B20)',
              color: '#F6D58A',
              padding: '6px 20px',
              borderRadius: '999px',
              fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 6px 18px rgba(157, 18, 56, 0.3)',
              marginBottom: '14px'
            }}
          >
            <Crown size={15} />
            <span>Words for the Birthday Queen</span>
            <Sparkles size={15} />
          </div>

          <h3
            className="script"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#9D1238',
              margin: '0 0 10px 0',
              fontWeight: 800,
              lineHeight: 1.25
            }}
          >
            {curQuote.title}
          </h3>

          <div style={{ position: 'relative', width: '100%', margin: '4px 0 16px 0' }}>
            <Quote size={24} color="#F6D58A" style={{ opacity: 0.6, position: 'absolute', top: '-14px', left: '0' }} />
            <p
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                color: '#351021',
                lineHeight: 1.65,
                margin: '0',
                padding: '0 18px',
                fontStyle: 'italic',
                fontWeight: 500
              }}
            >
              "{curQuote.text}"
            </p>
          </div>

          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#9D1238',
              letterSpacing: '0.8px',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}
          >
            — {curQuote.author} ✨
          </span>

          {/* Proceed Button */}
          <button
            className="btn-gold"
            onClick={onNext}
            style={{
              padding: '12px 36px',
              fontSize: 'clamp(0.92rem, 1.9vw, 1.05rem)',
              borderRadius: '999px',
              boxShadow: '0 8px 25px rgba(157, 18, 56, 0.4)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Begin Our City Journey 🗺️ ➜</span>
          </button>
        </div>
      )}
    </div>
  );
};
