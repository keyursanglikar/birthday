import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { Heart, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GalleryScene = ({ onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const photoCardRef = useRef(null);

  const photos = CONFIG.photos;

  useEffect(() => {
    if (photoCardRef.current) {
      gsap.fromTo(
        photoCardRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 36px)',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#e02974', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Camera size={14} /> Our Memory Keepsakes
        </div>
        <h2 className="script" style={{ fontSize: 'clamp(32px, 4.5vw, 42px)', color: '#4a1530', marginTop: '2px' }}>
          Moments With You ✨
        </h2>
      </div>

      {/* Polaroid Photo Frame */}
      <div
        ref={photoCardRef}
        style={{
          background: '#fff',
          padding: '16px 16px 26px 16px',
          borderRadius: '20px',
          boxShadow: '0 16px 45px rgba(220, 110, 155, 0.28)',
          border: '1px solid rgba(255, 230, 240, 0.9)',
          width: 'min(90vw, 420px)',
          textAlign: 'center',
          position: 'relative',
          transition: 'transform 0.3s'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'clamp(210px, 32vh, 290px)',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ffd3e0 0%, #ffedf2 100%)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Real Photo or Romantic Placeholder */}
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            onError={(e) => {
              // Graceful placeholder fallback if custom photo file hasn't been pasted yet
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              color: '#904265'
            }}
          >
            <Heart size={44} color="#ff4f8b" fill="#ffb4cc" />
            <div style={{ marginTop: '12px', fontSize: '15px', fontWeight: 600 }}>
              {currentPhoto.tag}
            </div>
            <div style={{ fontSize: '12.5px', opacity: 0.8, marginTop: '4px' }}>
              Add '{currentPhoto.url.replace('/photos/', '')}' into public/photos/
            </div>
          </div>
        </div>

        {/* Caption */}
        <p
          className="handwriting"
          style={{
            marginTop: '16px',
            fontSize: 'clamp(20px, 2.8vw, 24px)',
            color: '#4e1933',
            lineHeight: '28px',
            minHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          "{currentPhoto.caption}"
        </p>

        {/* Carousel indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
          {photos.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentIndex ? '#ff4f8b' : 'rgba(255, 120, 160, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Left / Right Carousel arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          style={{
            position: 'absolute',
            left: '-16px',
            top: '42%',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid rgba(255, 180, 205, 0.6)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            color: '#ff4f8b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: '-16px',
            top: '42%',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid rgba(255, 180, 205, 0.6)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            color: '#ff4f8b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-bottom-bar">
        <button className="btn-secondary" onClick={onPrev}>
          ‹ Previous
        </button>
        <button className="btn-primary" onClick={onNext} style={{ padding: '12px 28px', fontSize: '15px' }}>
          Blow The Candles 🎂 ➜
        </button>
      </div>
    </div>
  );
};
