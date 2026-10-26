import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';

export const NameRevealScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const nameBoxRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    sounds.tada();
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F6D58A', '#FFB6CB', '#FF9A76', '#FFFFFF']
    });

    const ctx = gsap.context(() => {
      // Spotlight appearance
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out'
      });

      // Name letter by letter staggered reveal
      gsap.fromTo(
        nameBoxRef.current.children,
        { opacity: 0, y: 55, scale: 0.4 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.16,
          duration: 1.2,
          ease: 'back.out(2)'
        }
      );

      // Auto advance to Name Dissolve after holding the glowing name
      const timer = setTimeout(() => {
        onNext();
      }, 4200);

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
        background: 'radial-gradient(ellipse at 50% 35%, #5b1a5e 0, #1b0a24 60%, #0a0410 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Spotlight Effect */}
      <div
        ref={spotlightRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '320px',
          height: '100%',
          marginLeft: '-160px',
          background: 'conic-gradient(from 160deg at 50% 0, transparent 0deg, rgba(246, 213, 138, 0.25) 20deg, transparent 40deg)',
          opacity: 0,
          filter: 'blur(4px)'
        }}
      />

      {/* Sayali Glowing Romantic Letters */}
      <div
        ref={nameBoxRef}
        className="script"
        style={{
          fontSize: 'clamp(65px, 20vw, 110px)',
          color: '#fff',
          textShadow: '0 0 18px #ff4d8d, 0 0 42px #ff4d8d, 0 0 85px #ffd1e3',
          display: 'flex',
          whiteSpace: 'nowrap',
          zIndex: 6
        }}
      >
        {[...CONFIG.girlName].map((char, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
