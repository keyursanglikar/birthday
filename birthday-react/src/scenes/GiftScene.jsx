import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { sounds } from '../audio';
import confetti from 'canvas-confetti';

export const GiftScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const letterRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        y: '-=16',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenGift = () => {
    if (opened) return;
    setOpened(true);
    sounds.tada();
    sounds.boom();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 }
    });

    const tl = gsap.timeline();
    tl.to(boxRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.7,
      ease: 'back.in(1.7)'
    }).fromTo(
      letterRef.current,
      { scale: 0.6, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.5)' }
    );
  };

  const handleNextLetter = () => {
    sounds.chime();
    if (letterIndex < CONFIG.letters.length - 1) {
      setLetterIndex((prev) => prev + 1);
      gsap.fromTo(
        letterRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      onNext();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 45%, #681f75, #15071f 75%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(18px, 4vw, 36px)',
        overflow: 'hidden'
      }}
    >
      {!opened && (
        <div
          ref={boxRef}
          onClick={handleOpenGift}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <div style={{ fontSize: 'clamp(100px, 14vw, 150px)', filter: 'drop-shadow(0 15px 35px rgba(255,45,120,0.6))' }}>
            🎁
          </div>
          <div
            style={{
              marginTop: '16px',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 600,
              color: '#ffe2ee',
              textShadow: '0 0 14px #ff2d78'
            }}
          >
            Tap to open the special gift 💖
          </div>
        </div>
      )}

      {opened && (
        <div
          ref={letterRef}
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '80%',
            overflowY: 'auto',
            background: '#fffdf9 repeating-linear-gradient(transparent 0 29px, rgba(190,140,110,.25) 29px 30px)',
            color: '#3b1e1e',
            borderRadius: '16px',
            padding: 'clamp(20px, 3.5vw, 34px)',
            fontSize: 'clamp(19px, 2.2vw, 24px)',
            lineHeight: '34px',
            boxShadow: '0 25px 65px rgba(0,0,0,.65)',
            borderLeft: '6px solid #ff4d8d',
            zIndex: 10
          }}
          className="handwriting"
        >
          <div style={{ fontSize: '14px', letterSpacing: '0.2em', opacity: 0.7, marginBottom: '10px', fontFamily: 'Outfit, sans-serif' }}>
            LETTER {letterIndex + 1} OF {CONFIG.letters.length}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {CONFIG.letters[letterIndex]}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <button className="btn-primary" onClick={handleNextLetter} style={{ fontSize: '15px', padding: '12px 28px' }}>
              {letterIndex < CONFIG.letters.length - 1 ? 'Next Letter ✉️' : 'Forever Under The Stars ✨'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
