import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { sounds } from '../audio';
import confetti from 'canvas-confetti';

export const BalloonsScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const bigHeartRef = useRef(null);
  const [poppedCount, setPoppedCount] = useState(0);
  const [currentGift, setCurrentGift] = useState(null);
  const [showBigHeart, setShowBigHeart] = useState(false);

  const colors = ['#ff2d78', '#ffaa00', '#00c2ff', '#a855f7', '#10b981', '#ff6b4a'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.balloon-item').forEach((b, i) => {
        gsap.to(b, {
          y: '-=18',
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 1.8 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePop = (index, gift, e) => {
    const el = e.currentTarget;
    sounds.pop();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
    });

    gsap.to(el, {
      scale: 1.8,
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        el.style.display = 'none';
        setCurrentGift(gift);
        setPoppedCount((prev) => {
          const next = prev + 1;
          if (next >= CONFIG.gifts.length) {
            setTimeout(() => setShowBigHeart(true), 1200);
          }
          return next;
        });

        if (cardRef.current) {
          gsap.fromTo(cardRef.current,
            { scale: 0.7, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }
          );
        }
      }
    });
  };

  const handleBigHeartPop = () => {
    sounds.boom();
    sounds.tada();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#ff2d78', '#ffd043', '#ffffff']
    });

    gsap.to(bigHeartRef.current, {
      scale: 2.2,
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        setTimeout(onNext, 1200);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'linear-gradient(to bottom, #1d5cb5 0%, #76c3f7 65%, #c5ebff 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '18px 24px',
          textAlign: 'center',
          background: 'linear-gradient(rgba(5,20,50,.65), transparent)',
          zIndex: 10
        }}
      >
        <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 600 }}>
          Pop the balloons 🎈 — surprises inside
        </h2>
        <div style={{ marginTop: '8px', fontSize: '24px' }}>
          {CONFIG.gifts.slice(0, poppedCount).map((g) => g.e).join(' ')}
        </div>
      </div>

      {/* Responsive Flexible Balloons Grid for Portrait and Landscape */}
      {!showBigHeart && (
        <div
          style={{
            position: 'absolute',
            inset: '12% 8% 20% 8%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(16px, 4vw, 40px)',
            zIndex: 5
          }}
        >
          {CONFIG.gifts.map((g, i) => (
            <div
              key={i}
              className="balloon-item"
              onClick={(e) => handlePop(i, g, e)}
              style={{
                cursor: 'pointer',
                margin: '10px'
              }}
            >
              <div
                style={{
                  width: 'clamp(68px, 8vw, 84px)',
                  height: 'clamp(86px, 10vw, 105px)',
                  borderRadius: '50% 50% 48% 48% / 58% 58% 42% 42%',
                  background: `radial-gradient(circle at 30% 24%, rgba(255,255,255,.85), transparent 30%), ${colors[i % colors.length]}`,
                  boxShadow: 'inset -10px -12px 20px rgba(0,0,0,.25), 0 10px 22px rgba(0,0,0,0.2)',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    width: '1.5px',
                    height: '90px',
                    background: 'rgba(255,255,255,0.75)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gift reveal modal card */}
      {currentGift && !showBigHeart && (
        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '7%',
            transform: 'translateX(-50%)',
            width: 'min(90%, 460px)',
            background: 'rgba(255,255,255,0.96)',
            color: '#4a1734',
            borderRadius: '24px',
            padding: '20px 24px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,.45)',
            zIndex: 15,
            backdropFilter: 'blur(12px)'
          }}
        >
          <div style={{ fontSize: '48px' }}>{currentGift.e}</div>
          <div style={{ fontSize: '17px', marginTop: '6px', fontWeight: 600 }}>{currentGift.t}</div>
        </div>
      )}

      {/* Giant heart balloon after all are popped */}
      {showBigHeart && (
        <div
          ref={bigHeartRef}
          onClick={handleBigHeartPop}
          style={{
            position: 'absolute',
            top: '32%',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            textAlign: 'center',
            zIndex: 20
          }}
        >
          <div style={{ fontSize: 'clamp(120px, 16vw, 170px)', filter: 'drop-shadow(0 15px 35px rgba(220,10,70,0.6))' }}>
            💖
          </div>
          <div
            style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              marginTop: '10px'
            }}
          >
            Pop the final giant heart! ✨
          </div>
        </div>
      )}
    </div>
  );
};
