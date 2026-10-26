import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config/storyConfig';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { sounds } from '../components/SoundManager';
import { NextPointer } from '../components/NextPointer';

export const CollegeScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const boyRef = useRef(null);
  const girlRef = useRef(null);
  const titleRef = useRef(null);
  const bubbleRef = useRef(null);

  const [momentIndex, setMomentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(boyRef.current,
        { x: -140, opacity: 0 },
        { x: 0, opacity: 1, duration: 2.2, ease: 'power2.out' }
      );
      gsap.fromTo(girlRef.current,
        { x: 140, opacity: 0 },
        { x: 0, opacity: 1, duration: 2.2, ease: 'power2.out' }
      );

      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 1.2,
        ease: 'back.out(1.6)'
      });

      let idx = 0;
      const interval = setInterval(() => {
        if (idx < CONFIG.moments.length - 1) {
          idx++;
          setMomentIndex(idx);
          sounds.pop();
          if (bubbleRef.current) {
            gsap.fromTo(bubbleRef.current,
              { scale: 0.9, opacity: 0.3, y: 15 },
              { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.65)' }
            );
          }
        } else {
          clearInterval(interval);
          setCanProceed(true);
        }
      }, 3400);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cur = CONFIG.moments[momentIndex];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Campus Photo */}
      <img
        src="/college.jpg"
        alt="Dnyanshree College Campus"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          filter: 'brightness(0.92) contrast(1.05)'
        }}
      />

      {/* Atmospheric romantic gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(14, 5, 20, 0.45) 0%, rgba(14, 5, 20, 0.1) 40%, rgba(53, 16, 33, 0.65) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* College Name Pill Tag */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(53, 16, 33, 0.88)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(246, 213, 138, 0.5)',
          borderRadius: '24px',
          padding: '6px 18px',
          color: '#F6D58A',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          zIndex: 10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap'
        }}
      >
        🏫 DNYANSHREE INSTITUTE
      </div>

      {/* Title */}
      <div
        ref={titleRef}
        className="script"
        style={{
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 'clamp(28px, 6.5vw, 42px)',
          color: '#fff',
          textShadow: '0 2px 14px rgba(0, 0, 0, 0.85), 0 0 20px rgba(255, 77, 141, 0.7)',
          zIndex: 6,
          padding: '0 12px'
        }}
      >
        Where our story began… 🎓
      </div>

      {/* Lifted up characters with a distinct visual gap above the card */}
      <div
        style={{
          position: 'absolute',
          bottom: '34%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 'clamp(28px, 8vw, 75px)',
          zIndex: 6
        }}
      >
        <div ref={boyRef} style={{ textAlign: 'center' }}>
          <CartoonBoy width="clamp(85px, 12vw, 135px)" height="clamp(100px, 14vw, 155px)" />
          <div style={{ marginTop: '2px', fontSize: '14px', fontWeight: 600, color: '#F6D58A', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
            Durvank
          </div>
        </div>
        <div ref={girlRef} style={{ textAlign: 'center' }}>
          <CartoonGirl width="clamp(85px, 12vw, 135px)" height="clamp(100px, 14vw, 155px)" />
          <div style={{ marginTop: '2px', fontSize: '14px', fontWeight: 600, color: '#FFB6CB', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
            Sayali
          </div>
        </div>
      </div>

      {/* Floating Story Card with generous breathing room above */}
      <div
        ref={bubbleRef}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '22px',
          transform: 'translateX(-50%)',
          width: 'min(92%, 480px)',
          background: 'rgba(255, 255, 255, 0.96)',
          color: '#351021',
          borderRadius: '26px',
          padding: '16px 24px 18px 24px',
          textAlign: 'center',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 182, 203, 0.7)',
          zIndex: 15,
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <b style={{ color: '#9d1238', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {cur.tag}
        </b>
        <p style={{ fontSize: '15px', lineHeight: 1.5, margin: 0, opacity: 0.9 }}>
          {cur.t}
        </p>

        {canProceed && (
          <NextPointer label="Tap below to follow our journey" style={{ marginBottom: '2px' }} />
        )}

        <button
          className="btn-cinema"
          onClick={onNext}
          disabled={!canProceed}
          style={{
            marginTop: '4px',
            padding: '10px 28px',
            fontSize: '15px',
            boxShadow: canProceed ? '0 6px 18px rgba(157, 18, 56, 0.45)' : 'none',
            opacity: canProceed ? 1 : 0.45
          }}
        >
          {canProceed ? 'Follow our journey ➜' : 'Reliving our memories...'}
        </button>
      </div>
    </div>
  );
};
