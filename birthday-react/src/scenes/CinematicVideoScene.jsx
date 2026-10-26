import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { NextPointer } from '../components/NextPointer';

export const CinematicVideoScene = ({ onNext }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    sounds.chime();

    // Trigger subtle sparkles
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F6D58A', '#FFB6CB', '#FF9A76']
    });

    const ctx = gsap.context(() => {
      gsap.from('.cinema-frame', {
        scale: 0.92,
        opacity: 0,
        y: 25,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, containerRef);

    // Auto-play the video muted
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
    sounds.tada();
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 45%, #351021 0%, #170718 65%, #07020a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)',
        overflow: 'hidden'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '14px', zIndex: 10 }}>
        <div style={{ color: '#F6D58A', fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          🎬 OUR CINEMATIC MEMORY
        </div>
        <h2 className="script" style={{ fontSize: 'clamp(30px, 4.5vw, 40px)', color: '#ffd1e3', textShadow: '0 0 16px rgba(255, 77, 141, 0.6)', marginTop: '2px' }}>
          Moments That Stand Still 💕
        </h2>
      </div>

      {/* Cinematic Video Player Frame */}
      <div
        className="cinema-frame"
        style={{
          position: 'relative',
          width: 'min(94vw, 760px)',
          aspectRatio: '16 / 9',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 77, 141, 0.35)',
          border: '2px solid rgba(246, 213, 138, 0.4)',
          background: '#000',
          zIndex: 10
        }}
      >
        <video
          ref={videoRef}
          src="/story-video.mp4"
          poster="/video-thumb.jpg"
          preload="auto"
          playsInline
          autoPlay
          muted
          onEnded={handleEnded}
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer'
          }}
        />

        {/* Play/Pause Overlay Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            zIndex: 15
          }}
        >
          <button
            onClick={togglePlay}
            className="glass-ctrl"
            style={{ width: '36px', height: '36px' }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
          </button>

          {hasEnded && (
            <button
              onClick={handleReplay}
              className="glass-ctrl"
              style={{ width: '36px', height: '36px' }}
              aria-label="Replay video"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Subtitle */}
      <p
        className="script"
        style={{
          marginTop: '16px',
          fontSize: 'clamp(20px, 3vw, 26px)',
          color: '#ffd1e3',
          textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          textAlign: 'center',
          maxWidth: '500px'
        }}
      >
        “Every second with you feels like a cherished movie scene…” ✨
      </p>

      {/* Next Scene Button */}
      {hasEnded && (
        <NextPointer label="Tap below to open memory scrapbook" />
      )}

      <button
        onClick={onNext}
        disabled={!hasEnded}
        className="btn-gold"
        style={{
          marginTop: '10px',
          padding: '12px 34px',
          fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
          borderRadius: '999px',
          boxShadow: hasEnded ? '0 8px 24px rgba(246, 213, 138, 0.45)' : 'none'
        }}
      >
        {hasEnded ? 'Continue to Memory Scrapbook 📖 ➜' : 'Watching our sunset moment... 🌅'}
      </button>
    </div>
  );
};
