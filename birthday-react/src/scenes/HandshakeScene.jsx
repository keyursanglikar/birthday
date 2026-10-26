import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const HandshakeScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const joinedHandsRef = useRef(null);
  const pulseHeartRef = useRef(null);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    sounds.whoosh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sounds.chime();
          sounds.tada();
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#FFFFFF']
          });
          setTimeout(() => {
            setCanProceed(true);
          }, 1200);
        }
      });

      // 1. Initial Stage Card Entrance
      tl.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 35,
        duration: 1.1,
        ease: 'power3.out'
      })

      // 2. Animated Hands Slide in toward center to clasp
      .to(leftArmRef.current, {
        x: 0,
        duration: 1.4,
        ease: 'power2.out'
      }, "-=0.2")
      .to(rightArmRef.current, {
        x: 0,
        duration: 1.4,
        ease: 'power2.out'
      }, "<")

      // 3. Realistic Hand Clasp Up-and-Down Handshake Motion
      .to([leftArmRef.current, rightArmRef.current], {
        y: -14,
        duration: 0.22,
        repeat: 5,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // 4. Reveal real intertwined photograph with golden warmth
      .to(joinedHandsRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.6")

      // 5. Floating heart pop
      .fromTo(pulseHeartRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' },
        "-=0.4"
      );

      // Continuous gentle breathing pulse on the clasped hands
      gsap.to(joinedHandsRef.current, {
        scale: 1.025,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 3
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
        background: 'radial-gradient(ellipse at 50% 30%, #300c1e 0%, #17040d 65%, #070104 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(14px, 2.5vw, 28px)'
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

      {/* Main Luxury Romance Card */}
      <div
        ref={cardRef}
        style={{
          width: 'min(95%, 720px)',
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: '34px',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(246, 213, 138, 0.35)',
          padding: 'clamp(20px, 3.5vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Top Tag Ribbon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #9D1238, #5A0B20)',
            color: '#F6D58A',
            padding: '6px 20px',
            borderRadius: '999px',
            fontSize: 'clamp(0.78rem, 1.5vw, 0.9rem)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 6px 18px rgba(157, 18, 56, 0.3)',
            marginBottom: '14px'
          }}
        >
          <Sparkles size={15} />
          <span>Hand in Hand • Durvank & Sayali</span>
          <Sparkles size={15} />
        </div>

        {/* ANIMATED HANDS CLASPING STAGE */}
        <div
          style={{
            width: 'min(94%, 560px)',
            height: 'clamp(210px, 38vw, 290px)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid rgba(246, 213, 138, 0.9)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.35)',
            marginBottom: '18px',
            background: 'linear-gradient(135deg, #1f0b15, #11040a)'
          }}
        >
          {/* DURVANK'S APPROACHING HAND (Left side reaching in) */}
          <div
            ref={leftArmRef}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '60%',
              transform: 'translateX(-95%)',
              zIndex: 3,
              overflow: 'hidden'
            }}
          >
            <img
              src="/hands-joined.jpg"
              alt="Durvank reaching hand"
              style={{
                width: '170%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left center',
                filter: 'brightness(0.95) saturate(1.1)'
              }}
            />
          </div>

          {/* SAYALI'S APPROACHING HAND (Right side reaching in) */}
          <div
            ref={rightArmRef}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '60%',
              transform: 'translateX(95%)',
              zIndex: 3,
              overflow: 'hidden'
            }}
          >
            <img
              src="/hands-joined.jpg"
              alt="Sayali reaching hand"
              style={{
                width: '170%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'right center',
                filter: 'brightness(0.95) saturate(1.1)'
              }}
            />
          </div>

          {/* REVEALED REAL INTERTWINED HAND IN HAND PHOTO */}
          <div
            ref={joinedHandsRef}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              zIndex: 6,
              transform: 'scale(1)'
            }}
          >
            <img
              src="/hands-joined.jpg"
              alt="Real hands holding together"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 45%',
                filter: 'contrast(1.08) saturate(1.2) brightness(0.98)'
              }}
            />

            {/* Warm Romantic Golden Sunset Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(48,12,30,0.15) 0%, rgba(246,213,138,0.25) 55%, rgba(48,12,30,0.45) 100%)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Floating Heart Emblem */}
          <div
            ref={pulseHeartRef}
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(157, 18, 56, 0.5)',
              border: '2px solid rgba(246, 213, 138, 0.9)',
              fontSize: '22px',
              zIndex: 10
            }}
          >
            💖
          </div>
        </div>

        {/* Script Romantic Sentiment */}
        <h2
          className="script"
          style={{
            fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)',
            color: '#9D1238',
            margin: '0 0 6px 0',
            lineHeight: 1.2,
            fontWeight: 800,
            textShadow: '0 2px 10px rgba(157, 18, 56, 0.15)'
          }}
        >
          Hand in hand,
        </h2>

        <p
          className="script"
          style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
            color: '#351021',
            margin: '0 0 20px 0',
            lineHeight: 1.3
          }}
        >
          through every turn of our journey 🤝✨
        </p>

        {/* Pointer Guide */}
        {canProceed && (
          <NextPointer label="Click below to open our WhatsApp chat" />
        )}

        {/* Continue Button */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-gold"
          style={{
            padding: '12px 34px',
            fontSize: 'clamp(0.92rem, 1.9vw, 1.08rem)',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: canProceed ? '0 10px 30px rgba(157, 18, 56, 0.35)' : 'none',
            opacity: canProceed ? 1 : 0.45,
            cursor: canProceed ? 'pointer' : 'not-allowed'
          }}
        >
          {canProceed ? 'Continue to WhatsApp chat 💬 ➜' : 'Holding hands together... 🤝'}
        </button>
      </div>
    </div>
  );
};
