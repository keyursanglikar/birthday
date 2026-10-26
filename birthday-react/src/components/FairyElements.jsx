import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Heart } from 'lucide-react';

export const FairyElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle twinkle on fairy lights
      gsap.utils.toArray('.fairy-light').forEach((light, i) => {
        gsap.to(light, {
          opacity: 0.25,
          scale: 0.85,
          duration: 1.2 + (i % 5) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Floating heart animations
      gsap.utils.toArray('.floating-bg-heart').forEach((heart, i) => {
        gsap.to(heart, {
          y: '-=120',
          x: '+=20',
          opacity: 0,
          duration: 5 + i,
          repeat: -1,
          ease: 'power1.out',
          delay: i * 0.8
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {/* Top Fairy Lights Garland */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '4px 10px'
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="fairy-light"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#ffb3cf' : '#ffe8a3',
              boxShadow: i % 2 === 0 ? '0 0 12px #ff699f' : '0 0 12px #ffd768'
            }}
          />
        ))}
      </div>

      {/* Subtle floating background hearts */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-bg-heart"
          style={{
            position: 'absolute',
            bottom: '5%',
            left: `${15 + i * 15}%`,
            color: 'rgba(255, 120, 160, 0.35)',
            fontSize: `${16 + (i % 3) * 8}px`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
