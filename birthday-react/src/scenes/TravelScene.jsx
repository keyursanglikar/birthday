import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CartoonBoy } from '../components/CartoonBoy';
import { CartoonGirl } from '../components/CartoonGirl';
import { sounds } from '../components/SoundManager';
import { Navigation } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const TravelScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    sounds.chime();

    const tl = gsap.timeline({
      onComplete: () => {
        setCanProceed(true);
        setTimeout(onNext, 1800);
      }
    });

    tl.to({}, {
      duration: 5.5,
      ease: 'power1.inOut',
      onUpdate: function () {
        setProgress(this.progress());
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, #30103b 0%, #15061c 65%, #08020a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: 'min(94%, 720px)',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '32px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.75), 0 0 45px rgba(246, 213, 138, 0.35)',
          border: '2px solid rgba(246, 213, 138, 0.7)',
          textAlign: 'center',
          color: '#351021',
          zIndex: 10,
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #1d4ed8, #be185d)',
            color: '#fff',
            borderRadius: '24px',
            padding: '6px 18px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}
        >
          <Navigation size={14} /> CHAPTER 8 · TRAVELING TO MEET IN KARAD 🛣️
        </div>

        <h2 className="script" style={{ fontSize: 'clamp(32px, 5.5vw, 44px)', color: '#9D1238', margin: '4px 0' }}>
          Traveling across every mile… to meet in the middle
        </h2>

        {/* Dynamic moving avatars converging toward center Karad milestone */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            margin: '18px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Track line */}
          <div
            style={{
              position: 'absolute',
              width: '85%',
              height: '10px',
              borderRadius: '5px',
              background: '#e2e8f0',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />

          {/* Durvank colored trail (Blue) from Left */}
          <div
            style={{
              position: 'absolute',
              left: '7.5%',
              width: `${progress * 42.5}%`,
              height: '10px',
              borderRadius: '5px',
              background: 'linear-gradient(90deg, #2563eb, #3b82f6)'
            }}
          />

          {/* Sayali colored trail (Pink) from Right */}
          <div
            style={{
              position: 'absolute',
              right: '7.5%',
              width: `${progress * 42.5}%`,
              height: '10px',
              borderRadius: '5px',
              background: 'linear-gradient(90deg, #ec4899, #db2777)'
            }}
          />

          {/* Center Karad Meeting Point Landmark */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#9D1238',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                boxShadow: '0 0 20px rgba(157, 18, 56, 0.6)',
                border: '3px solid #F6D58A',
                margin: '0 auto'
              }}
            >
              💖
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#9D1238', marginTop: '4px', display: 'block' }}>
              Karad
            </span>
          </div>

          {/* Durvank Moving Avatar (Left -> Middle) */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `calc(7.5% + ${progress * 35}%)`,
              zIndex: 10,
              textAlign: 'center'
            }}
          >
            <CartoonBoy width={68} height={105} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8' }}>Durvank</div>
          </div>

          {/* Sayali Moving Avatar (Right -> Middle) */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: `calc(7.5% + ${progress * 35}%)`,
              zIndex: 10,
              textAlign: 'center'
            }}
          >
            <CartoonGirl width={68} height={105} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#db2777' }}>Sayali</div>
          </div>
        </div>

        {canProceed && (
          <NextPointer label="Tap below to meet in Karad" style={{ marginBottom: '4px' }} />
        )}

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-gold"
          style={{
            padding: '12px 34px',
            fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
            borderRadius: '999px',
            boxShadow: canProceed ? '0 8px 24px rgba(157, 18, 56, 0.35)' : 'none'
          }}
        >
          {canProceed ? 'Meet in Karad 💕 ➜' : `Traveling on the road (${Math.round(progress * 100)}%)...`}
        </button>
      </div>
    </div>
  );
};
