import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';

export const CurtainScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const ribbonRef = useRef(null);
  const hintRef = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle breathing pulse on heart ribbon
      gsap.to(ribbonRef.current, {
        scale: 1.14,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleUntieRibbon = () => {
    if (opened) return;
    setOpened(true);
    sounds.chime();

    const tl = gsap.timeline({
      onComplete: () => {
        onNext(); // Seamlessly advances to Scene 4 (Name Reveal)
      }
    });

    // Animate ribbon untying
    tl.to(ribbonRef.current, {
      scale: 2.2,
      opacity: 0,
      rotation: 12,
      duration: 0.8,
      ease: 'power2.in'
    })
    .to(hintRef.current, { opacity: 0, duration: 0.3 }, "<")
    // Slide deep red curtains from center
    .to([leftCurtainRef.current, rightCurtainRef.current], {
      x: (i) => (i === 0 ? '-102%' : '102%'),
      duration: 2.2,
      ease: 'power3.inOut',
      onStart: () => sounds.whoosh()
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#0a030d',
        overflow: 'hidden'
      }}
    >
      {/* Background Stage Backing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 35%, #5b1a5e 0, #1b0a24 60%, #0a0410 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ color: '#F6D58A', fontSize: '18px', letterSpacing: '0.1em' }} className="script">
          Preparing a magical reveal…
        </div>
      </div>

      {/* Deep Red Gold-Trim Curtains */}
      <div
        ref={leftCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '51%',
          background: 'repeating-linear-gradient(90deg, #6e0a1c 0, #9e1229 16px, #c01a39 26px, #7a0d20 42px)',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.65)',
          borderRight: '2px solid #F6D58A',
          zIndex: 4
        }}
      />
      <div
        ref={rightCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '51%',
          background: 'repeating-linear-gradient(90deg, #6e0a1c 0, #9e1229 16px, #c01a39 26px, #7a0d20 42px)',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.65)',
          borderLeft: '2px solid #F6D58A',
          zIndex: 4
        }}
      />

      {/* Top Valance with gold scallops */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          zIndex: 5,
          background: 'linear-gradient(#8c1226, #8c1226)',
          borderBottom: '3px solid #F6D58A',
          filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.6))'
        }}
      />

      {/* Glowing Center Heart Ribbon */}
      {!opened && (
        <div
          ref={ribbonRef}
          onClick={handleUntieRibbon}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '230px',
            height: '230px',
            margin: '-115px 0 0 -115px',
            zIndex: 6,
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 24px rgba(255, 77, 141, 0.8))'
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <linearGradient id="ribbonG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffd86b" />
                <stop offset="50%" stopColor="#ff4d8d" />
                <stop offset="100%" stopColor="#ffd86b" />
              </linearGradient>
            </defs>
            <path
              d="M50 88 C10 58 2 30 24 16 C38 8 50 18 50 28 C50 18 62 8 76 16 C98 30 90 58 50 88Z"
              fill="rgba(255, 77, 141, 0.25)"
            />
            <path
              d="M50 88 C10 58 2 30 24 16 C38 8 50 18 50 28 C50 18 62 8 76 16 C98 30 90 58 50 88Z"
              fill="none"
              stroke="url(#ribbonG)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Instruction Hint */}
      {!opened && (
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(50% + 140px)',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 600,
            color: '#ffd1e3',
            textShadow: '0 0 12px #ff4d8d',
            zIndex: 6
          }}
        >
          Tap the heart ribbon to open 💗
        </div>
      )}
    </div>
  );
};
