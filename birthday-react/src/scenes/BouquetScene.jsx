import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const BouquetScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const boyAvatarRef = useRef(null);
  const girlAvatarRef = useRef(null);
  const bouquetRef = useRef(null);
  const heartFloatRef = useRef(null);
  const noteRef = useRef(null);
  const [canProceed, setCanProceed] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    sounds.whoosh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Card entrance
      tl.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out'
      })
      // Boy glides forward offering bouquet
      .fromTo(boyAvatarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        '-=0.4'
      )
      // Girl appears anticipating
      .fromTo(girlAvatarRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        '-=0.9'
      )
      // Bouquet blooms & floats into center
      .fromTo(bouquetRef.current,
        { scale: 0.4, opacity: 0, y: 30, rotation: -12 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.3,
          ease: 'elastic.out(1, 0.65)',
          onComplete: () => {
            sounds.chime();
          }
        },
        '-=0.5'
      )
      // Note reveal
      .fromTo(noteRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

      // Continuous gentle hover on bouquet
      gsap.to(bouquetRef.current, {
        y: -6,
        rotation: 2,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Floating heart pulse
      gsap.to(heartFloatRef.current, {
        scale: 1.25,
        opacity: 0.9,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAcceptBouquet = () => {
    if (isAccepted) return;
    setIsAccepted(true);
    sounds.tada();
    sounds.pop();

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFB6CB', '#e11d48', '#F6D58A', '#ffffff']
    });

    if (bouquetRef.current) {
      gsap.to(bouquetRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    }

    setTimeout(() => {
      setCanProceed(true);
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 35%, #3a0d20 0%, #150610 70%, #080208 100%)'
      }}
    >
      {/* Background ambient sparkles */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.28) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Elegant Presentation Card */}
      <div
        ref={cardRef}
        style={{
          width: 'min(92%, 460px)',
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: '28px',
          padding: 'clamp(20px, 4vw, 26px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(225, 29, 72, 0.25)',
          border: '1px solid rgba(255, 182, 203, 0.7)',
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        {/* Crown Ribbon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #9D1238, #5A0B20)',
            color: '#F6D58A',
            padding: '5px 16px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(157, 18, 56, 0.35)',
            marginBottom: '10px'
          }}
        >
          <Sparkles size={14} /> Flowers For You • Fresh Red Roses <Sparkles size={14} />
        </div>

        {/* Heading */}
        <h2
          className="script"
          style={{
            fontSize: 'clamp(30px, 6.5vw, 38px)',
            color: '#351021',
            lineHeight: 1.15,
            margin: '0 0 4px'
          }}
        >
          A Bouquet Just For You, Sayali 💐
        </h2>

        {/* Avatars & Offering Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(14px, 4vw, 24px)',
            margin: '12px 0 10px',
            width: '100%'
          }}
        >
          {/* Durvank Avatar */}
          <div ref={boyAvatarRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                border: '3px solid #9D1238',
                boxShadow: '0 6px 16px rgba(157, 18, 56, 0.35)',
                overflow: 'hidden',
                background: '#fff'
              }}
            >
              <img
                src="/boy-face.png"
                alt="Durvank"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9D1238', marginTop: '4px' }}>
              Durvank 🌸
            </span>
          </div>

          {/* Central Animated Floating Heart */}
          <div
            ref={heartFloatRef}
            style={{
              color: '#e11d48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart size={28} fill="#e11d48" />
          </div>

          {/* Sayali Avatar */}
          <div ref={girlAvatarRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                border: '3px solid #db2777',
                boxShadow: '0 6px 16px rgba(219, 39, 119, 0.35)',
                overflow: 'hidden',
                background: '#fff'
              }}
            >
              <img
                src="/girl-face.png"
                alt="Sayali"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#db2777', marginTop: '4px' }}>
              Sayali 👑
            </span>
          </div>
        </div>

        {/* Real Fresh Flower Bouquet Image Container */}
        <div
          ref={bouquetRef}
          onClick={handleAcceptBouquet}
          style={{
            position: 'relative',
            width: 'clamp(180px, 50vw, 220px)',
            height: 'clamp(170px, 46vw, 210px)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(157, 18, 56, 0.35)',
            border: '3px solid #fff',
            cursor: isAccepted ? 'default' : 'pointer',
            margin: '8px 0',
            transition: 'transform 0.25s ease'
          }}
        >
          <img
            src="/bouquet-real.jpg"
            alt="Rose Bouquet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Shimmer gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(53, 16, 33, 0.55) 100%)'
            }}
          />

          {/* Tap Prompt Badge */}
          {!isAccepted && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(157, 18, 56, 0.9)',
                color: '#fff',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                letterSpacing: '0.04em'
              }}
            >
              Tap to accept bouquet 🌹
            </div>
          )}

          {isAccepted && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(21, 128, 61, 0.95)',
                color: '#fff',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              Accepted with love 💖
            </div>
          )}
        </div>

        {/* Romantic Sentiment Note */}
        <p
          ref={noteRef}
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.5,
            color: '#47142b',
            margin: '6px 0 10px',
            fontStyle: 'italic',
            maxWidth: '380px'
          }}
        >
          {isAccepted
            ? "“Every flower in this bouquet whispers of your grace, your warmth, and how effortlessly you make the world beautiful.”"
            : "“May your birthday bloom with every color of joy, peace, and endless love.”"}
        </p>

        {/* Accept Button or Proceed CTA */}
        {!isAccepted ? (
          <button
            onClick={handleAcceptBouquet}
            className="btn-gold"
            style={{
              padding: '10px 28px',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '999px'
            }}
          >
            Accept Bouquet from Durvank 💐
          </button>
        ) : (
          <div style={{ position: 'relative', display: 'inline-block', marginTop: '4px' }}>
            {canProceed && (
              <NextPointer direction="right" label="Tap here to continue" pulse={true} />
            )}
            <button
              onClick={onNext}
              className="btn-gold"
              disabled={!canProceed}
              style={{
                padding: '11px 30px',
                fontSize: '0.94rem',
                fontWeight: 700,
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Continue Our Story 💖 <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
