import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { NextPointer } from '../components/NextPointer';

export const PhotoBookScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const bookCardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);

  // Collage book pages with sweet memory chapters & placeholders for photos
  const pages = [
    {
      pageNumber: 1,
      title: "First Steps & College Days",
      subtitle: "Where our story softly began",
      date: "2022 • Dnyanshree Campus",
      img1: "/college.jpg",
      img1Caption: "Campus mornings & shared lectures",
      img2: "/boy-face.png",
      img2Caption: "Durvank's perspective",
      note: "Every hallway had a memory waiting to be made... our quiet laughter between classes."
    },
    {
      pageNumber: 2,
      title: "Shared Laughs & Golden Chai",
      subtitle: "Highway roadside stops",
      date: "2023 • Karad Highway",
      img1: "/girl-face.png",
      img1Caption: "Sayali's radiant smile",
      img2: "/college.jpg",
      img2Caption: "Sunny afternoon memories",
      note: "Steaming hot cutting chai, cool evening breezes, and stories that felt endless."
    },
    {
      pageNumber: 3,
      title: "Adventures & Long Drives",
      subtitle: "Chasing golden hour sunsets",
      date: "2024 • Satara Ghats",
      img1: "/video-thumb.jpg",
      img1Caption: "Sunset road trips",
      img2: "/girl-face.png",
      img2Caption: "Cherished moments",
      note: "Miles melted away into songs we sang together on the open road."
    },
    {
      pageNumber: 4,
      title: "Birthday Chapters & Forever",
      subtitle: "Celebrating you, today & always",
      date: "25 November • The Best Day",
      img1: "/boy-face.png",
      img1Caption: "Durvank's wish",
      img2: "/girl-face.png",
      img2Caption: "Birthday Queen Sayali",
      note: "Here's to a lifetime of new chapters, countless photographs, and unconditional companionship! 💖"
    }
  ];

  // Auto flip pages every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextPage();
    }, 4800);

    return () => clearInterval(timer);
  }, [currentPage]);

  // Entrance Animation
  useEffect(() => {
    sounds.chime();
    const ctx = gsap.context(() => {
      gsap.from(bookCardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 35,
        duration: 1.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    sounds.whoosh();

    gsap.to('.book-spread', {
      rotateY: -8,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        setCurrentPage((prev) => {
          const next = (prev + 1) % pages.length;
          if (next === pages.length - 1) {
            setHasCompletedTour(true);
          }
          return next;
        });
        setIsFlipping(false);
      }
    });
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    sounds.whoosh();

    gsap.to('.book-spread', {
      rotateY: 8,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
        setIsFlipping(false);
      }
    });
  };

  const page = pages[currentPage];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 35%, #2a0a18 0%, #15050c 60%, #060103 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(12px, 2.5vw, 24px)'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'min(92vw, 800px)',
          height: 'min(70vh, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,213,138,0.2) 0%, rgba(157,18,56,0.15) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Collage Book Shell */}
      <div
        ref={bookCardRef}
        style={{
          width: 'min(96%, 860px)',
          maxHeight: '94vh',
          background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 248, 0.96))',
          borderRadius: '34px',
          border: '2px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(246, 213, 138, 0.3)',
          padding: 'clamp(16px, 2.8vw, 30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          perspective: '1200px',
          zIndex: 10,
          backdropFilter: 'blur(16px)',
          overflowY: 'auto'
        }}
      >
        {/* Top Header Ribbon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(157, 18, 56, 0.15)',
            paddingBottom: '8px'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#9D1238' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: 'clamp(0.82rem, 1.7vw, 0.96rem)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              OUR MEMORY SCRAPBOOK • AUTO FLIPPING
            </span>
          </div>

          {/* Page Indicators */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {pages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage(idx)}
                style={{
                  width: idx === currentPage ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentPage ? '#9D1238' : '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* The Open Book (Spread) */}
        <div
          className="book-spread"
          style={{
            width: '100%',
            background: '#faf4ea',
            borderRadius: '22px',
            border: '2px solid #ecd5b8',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05), 0 12px 35px rgba(0,0,0,0.15)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            padding: 'clamp(14px, 2.5vw, 24px)',
            gap: 'clamp(14px, 2.5vw, 22px)',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease'
          }}
        >
          {/* Book Spine Center Dividing Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '50%',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(180,140,100,0.1), rgba(180,140,100,0.35), rgba(180,140,100,0.1))',
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          />

          {/* LEFT PAGE: Photo Collage Polaroid Grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Polaroid 1 */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '8px 8px 16px 8px',
                  borderRadius: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  transform: 'rotate(-3deg)',
                  width: '48%',
                  maxWidth: '175px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    background: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={page.img1}
                    alt={page.img1Caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  {page.img1Caption}
                </p>
              </div>

              {/* Polaroid 2 */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '8px 8px 16px 8px',
                  borderRadius: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  transform: 'rotate(4deg)',
                  width: '48%',
                  maxWidth: '175px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    background: '#f8fafc',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={page.img2}
                    alt={page.img2Caption}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  {page.img2Caption}
                </p>
              </div>
            </div>

            {/* Vintage Stamp / Tape */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(254, 243, 199, 0.8)',
                border: '1px dashed #d97706',
                padding: '4px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#92400e',
                fontWeight: 700
              }}
            >
              <Sparkles size={13} />
              <span>{page.date}</span>
            </div>
          </div>

          {/* RIGHT PAGE: Handwritten Story & Memory Note */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(4px, 1vw, 12px)',
              color: '#351021'
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                color: '#9D1238',
                fontWeight: 700
              }}
            >
              Chapter {page.pageNumber} of {pages.length}
            </span>

            <h3
              className="script"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                color: '#9D1238',
                margin: '4px 0 2px 0',
                lineHeight: 1.2
              }}
            >
              {page.title}
            </h3>

            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.8vw, 0.98rem)',
                color: '#713f12',
                fontStyle: 'italic',
                margin: '0 0 10px 0'
              }}
            >
              "{page.subtitle}"
            </p>

            {/* Handwritten style notebook note */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderLeft: '3px solid #9D1238',
                borderRadius: '0 12px 12px 0',
                padding: '10px 14px',
                fontSize: 'clamp(0.85rem, 1.7vw, 0.98rem)',
                lineHeight: 1.55,
                color: '#334155',
                fontFamily: 'serif',
                boxShadow: '0 3px 10px rgba(0,0,0,0.04)'
              }}
            >
              {page.note}
            </div>

            {/* Quick manual flip controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '14px'
              }}
            >
              <button
                onClick={handlePrevPage}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155'
                }}
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={handleNextPage}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155'
                }}
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>

              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Auto-flipping in seconds...
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Pointer & Luxury Button */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {hasCompletedTour && (
            <NextPointer label="Tap below to read romantic letters" />
          )}

          <button
            onClick={onNext}
            disabled={!hasCompletedTour}
            className="btn-gold"
            style={{
              padding: '12px 34px',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              borderRadius: '999px',
              cursor: hasCompletedTour ? 'pointer' : 'not-allowed',
              opacity: hasCompletedTour ? 1 : 0.65
            }}
          >
            {hasCompletedTour ? 'Continue to Romantic Letters 💌 ➜' : 'Flipping through our memories... 📖'}
          </button>
        </div>
      </div>
    </div>
  );
};
