import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { CONFIG } from '../config/storyConfig';
import { NextPointer } from '../components/NextPointer';

export const ScratchCardScene = ({ onNext, onRestart }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [isClaimed, setIsClaimed] = useState(false);

  // 4 Exclusive Birthday Gifts
  const gifts = [
    {
      id: 'gift-1',
      title: 'Romantic Candlelight Dinner',
      desc: 'An evening reserved just for us with your favorite cuisine & acoustic music.',
      icon: '🕯️',
      color: '#e11d48'
    },
    {
      id: 'gift-2',
      title: 'Weekend Nature Getaway',
      desc: 'A road trip to the misty hills of Mahabaleshwar / Panchgani.',
      icon: '🚗',
      color: '#0284c7'
    },
    {
      id: 'gift-3',
      title: 'Handcrafted Memory Scrapbook',
      desc: 'A physical album curated with all our candid photos, tickets & letters.',
      icon: '📖',
      color: '#d97706'
    },
    {
      id: 'gift-4',
      title: 'Any Wish of Your Choice',
      desc: 'A golden coupon valid forever — whatever you ask for, unconditionally granted!',
      icon: '👑',
      color: '#7c3aed'
    }
  ];

  // Set up Scratch Canvas (Silver & Gold Shimmer Scratch Surface)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Draw shimmering scratch surface
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#cbd5e1');
    grad.addColorStop(0.3, '#f1f5f9');
    grad.addColorStop(0.5, '#F6D58A');
    grad.addColorStop(0.7, '#94a3b8');
    grad.addColorStop(1, '#e2e8f0');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative scratch pattern & instructions
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 18px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', width / 2, height / 2 - 12);

    ctx.font = '13px Poppins, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Rub or drag your finger / mouse', width / 2, height / 2 + 16);

    let isDrawing = false;
    let scratchedPixels = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e) => {
      if (!isDrawing || isScratched) return;
      const { x, y } = getPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels += 1;
      if (scratchedPixels % 12 === 0) {
        sounds.pop();
        // Check transparent ratio
        const imgData = ctx.getImageData(0, 0, width, height);
        let clearCount = 0;
        for (let i = 3; i < imgData.data.length; i += 32) {
          if (imgData.data[i] === 0) clearCount++;
        }
        const pct = Math.round((clearCount / (imgData.data.length / 32)) * 100);
        setScratchPercent(pct);

        if (pct >= 45 && !isScratched) {
          revealAll();
        }
      }
    };

    const startScratch = (e) => {
      isDrawing = true;
      scratch(e);
    };

    const stopScratch = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', stopScratch);

    canvas.addEventListener('touchstart', startScratch, { passive: true });
    canvas.addEventListener('touchmove', scratch, { passive: true });
    window.addEventListener('touchend', stopScratch);

    return () => {
      canvas.removeEventListener('mousedown', startScratch);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', stopScratch);

      canvas.removeEventListener('touchstart', startScratch);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', stopScratch);
    };
  }, [isScratched]);

  const revealAll = () => {
    setIsScratched(true);
    sounds.tada();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F6D58A', '#FFB6CB', '#9D1238', '#FFFFFF']
    });

    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (canvasRef.current) canvasRef.current.style.display = 'none';
        }
      });
    }
  };

  const handleClaim = (gift) => {
    setSelectedGiftId(gift.id);
    setIsClaimed(true);
    sounds.tada();
    sounds.boom();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F6D58A', '#FFB6CB', '#FF9A76', '#9D1238', '#FFFFFF']
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, #300a1c 0%, #17040d 65%, #080105 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px, 2.2vw, 22px)',
        overflow: 'hidden'
      }}
    >
      {/* Golden Stage Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'min(92vw, 750px)',
          height: 'min(65vh, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,213,138,0.2) 0%, rgba(157,18,56,0.15) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Card Container */}
      <div
        style={{
          width: 'min(96%, 740px)',
          maxHeight: '94vh',
          overflowY: 'auto',
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: 'clamp(20px, 3.5vw, 30px)',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(246, 213, 138, 0.35)',
          padding: 'clamp(12px, 2.5vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Crown Badge */}
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
            marginBottom: '10px'
          }}
        >
          <Sparkles size={15} />
          <span>Birthday Surprise Scratch Card</span>
          <Sparkles size={15} />
        </div>

        <h2
          className="script"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#9D1238',
            margin: '0 0 6px 0',
            fontWeight: 800
          }}
        >
          Scratch & Claim Your Birthday Gift! 🎁✨
        </h2>

        <p style={{ fontSize: 'clamp(0.88rem, 1.8vw, 1.02rem)', color: '#475569', maxWidth: '580px', margin: '0 0 20px 0' }}>
          {isClaimed
            ? '🎉 Congratulations! Your chosen birthday gift has been claimed.'
            : isScratched
            ? '4 special gifts have been unlocked below! Choose and claim one for your birthday.'
            : 'Rub the silver scratch card with your finger/mouse to reveal 4 exclusive birthday surprises!'}
        </p>

        {/* SCRATCH AREA OR REVEALED 4-GIFT GRID */}
        {!isScratched ? (
          <div
            style={{
              position: 'relative',
              width: 'min(90vw, 420px)',
              height: '210px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
              border: '2px solid rgba(246, 213, 138, 0.7)'
            }}
          >
            {/* Hidden Underneath preview */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}
            >
              <span style={{ fontSize: '3rem' }}>🎁</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9D1238', marginTop: '6px' }}>
                4 Surprises Unlocking...
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Scratched: {scratchPercent}%</span>
            </div>

            {/* Interactive Canvas */}
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                touchAction: 'none'
              }}
            />
          </div>
        ) : (
          /* 4 UNLOCKED GIFTS GRID */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(8px, 1.8vw, 14px)',
              width: '100%',
              marginBottom: '14px',
              maxHeight: 'clamp(280px, 48vh, 420px)',
              overflowY: 'auto',
              padding: '4px'
            }}
          >
            {gifts.map((g) => {
              const isSelected = selectedGiftId === g.id;

              return (
                <div
                  key={g.id}
                  onClick={() => !isClaimed && handleClaim(g)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(145deg, #fff1f2, #ffe4e6)'
                      : '#ffffff',
                    borderRadius: '20px',
                    border: isSelected
                      ? '2.5px solid #9D1238'
                      : '1.5px solid rgba(226, 232, 240, 0.9)',
                    padding: '16px',
                    boxShadow: isSelected
                      ? '0 12px 30px rgba(157, 18, 56, 0.25)'
                      : '0 6px 18px rgba(0,0,0,0.06)',
                    cursor: isClaimed ? 'default' : 'pointer',
                    transition: 'all 0.25s ease',
                    textAlign: 'center',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '10px', width: '100%' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '16px',
                        background: `${g.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.9rem',
                        boxShadow: `0 4px 12px ${g.color}25`
                      }}
                    >
                      {g.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#1e293b', fontWeight: 700, textAlign: 'center' }}>
                        {g.title}
                      </h4>
                      <span style={{ fontSize: '0.74rem', color: g.color, fontWeight: 700, letterSpacing: '0.04em' }}>Exclusive Gift</span>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 14px 0', fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55, textAlign: 'center' }}>
                    {g.desc}
                  </p>

                  <button
                    disabled={isClaimed && !isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isClaimed) handleClaim(g);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 14px',
                      borderRadius: '999px',
                      border: 'none',
                      background: isSelected
                        ? 'linear-gradient(135deg, #15803d, #16a34a)'
                        : isClaimed
                        ? '#e2e8f0'
                        : 'linear-gradient(135deg, #9D1238, #be123c)',
                      color: isClaimed && !isSelected ? '#94a3b8' : '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: isClaimed ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 size={15} /> Claimed by Sayali! 💖
                      </>
                    ) : isClaimed ? (
                      'Locked'
                    ) : (
                      'Claim This Gift 🎁'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Skip scratching button if user prefers instant reveal */}
        {!isScratched && (
          <button
            onClick={revealAll}
            style={{
              marginTop: '14px',
              background: 'transparent',
              border: 'none',
              color: '#9D1238',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Or tap here to instant-reveal all gifts ➜
          </button>
        )}

        {/* After claiming gift: forward to Special Gratitude & Blessing section */}
        {isClaimed && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {onNext && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <NextPointer direction="right" label="Tap here for final blessings" pulse={true} />
                <button
                  onClick={onNext}
                  className="btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(157, 18, 56, 0.35)',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  Special Blessings & Gratitude For Sayali 💖 <ArrowRight size={18} />
                </button>
              </div>
            )}

            <button
              onClick={onRestart}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              <RotateCcw size={14} /> Replay From Beginning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
