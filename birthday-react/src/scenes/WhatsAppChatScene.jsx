import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../components/SoundManager';
import confetti from 'canvas-confetti';
import { Phone, Video, MoreVertical, Send, CheckCheck, Sun, Moon, Smile, Paperclip, Camera, Mic, ArrowDown, Sparkles } from 'lucide-react';
import { CONFIG } from '../config/storyConfig';

export const WhatsAppChatScene = ({ onNext }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  // Full day-to-night chronological WhatsApp conversation
  const chats = [
    {
      id: 1,
      timePhase: 'morning',
      phaseLabel: 'Morning ☀️ 8:15 AM',
      sender: 'boy',
      text: 'Good morning birthday girl! ☀️🎂 Hope your special day starts with the biggest smile!',
      time: '8:15 AM'
    },
    {
      id: 2,
      timePhase: 'morning',
      phaseLabel: 'Morning ☀️ 8:17 AM',
      sender: 'girl',
      text: 'Good morning Durvank!! 🌸 Aww thank you so much! Already feeling so blessed today 😊✨',
      time: '8:17 AM'
    },
    {
      id: 3,
      timePhase: 'afternoon',
      phaseLabel: 'Afternoon ☕ 1:30 PM',
      sender: 'boy',
      text: 'Chai break between lectures? Your favorite cutting chai is on me today ☕😉',
      time: '1:30 PM'
    },
    {
      id: 4,
      timePhase: 'afternoon',
      phaseLabel: 'Afternoon ☕ 1:32 PM',
      sender: 'girl',
      text: 'Haha you never have to ask twice! Extra ginger chai, please! 🏃‍♀️☕',
      time: '1:32 PM'
    },
    {
      id: 5,
      timePhase: 'sunset',
      phaseLabel: 'Golden Hour 🌅 6:10 PM',
      sender: 'boy',
      text: 'Look at the sky right now… reminds me of all our highway drives 🚗🌅',
      time: '6:10 PM'
    },
    {
      id: 6,
      timePhase: 'sunset',
      phaseLabel: 'Golden Hour 🌅 6:12 PM',
      sender: 'girl',
      text: 'It’s so pretty! Sitting under the same sky, forever & always… 💕',
      time: '6:12 PM'
    },
    {
      id: 7,
      timePhase: 'night',
      phaseLabel: 'Late Night 🌙 11:58 PM',
      sender: 'boy',
      text: 'Before this day ends, I just want you to know how grateful I am for you. You make every day brighter ❤️',
      time: '11:58 PM'
    },
    {
      id: 8,
      timePhase: 'night',
      phaseLabel: 'Midnight 🌙 12:00 AM',
      sender: 'girl',
      text: 'You are the truest friend and my favorite person, Durvank. Thank you for making my birthday so unforgettable 💖🎂✨',
      time: '12:00 AM'
    }
  ];

  // Auto-reveal messages sequentially with typing sound
  useEffect(() => {
    sounds.chime();

    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => {
        if (prev < chats.length - 1) {
          sounds.pop();
          return prev + 1;
        } else {
          clearInterval(interval);
          setCanProceed(true);
          sounds.tada();
          confetti({
            particleCount: 65,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#25D366', '#F6D58A', '#FFB6CB', '#ffffff']
          });
          return prev;
        }
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom as new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeMessageIndex]);

  const currentChat = chats[activeMessageIndex];
  const isNight = currentChat.timePhase === 'night';
  const isSunset = currentChat.timePhase === 'sunset';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, #300c1e 0%, #17040d 65%, #070104 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(6px, 1.8vw, 16px)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'min(92vw, 750px)',
          height: 'min(70vh, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,211,102,0.15) 0%, rgba(157,18,56,0.15) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Realistic Smartphone Shell with Dynamic Island & Speaker Notch */}
      <div
        ref={cardRef}
        style={{
          width: 'min(98%, 430px)',
          height: 'clamp(460px, 92vh, 670px)',
          background: '#0b141a',
          borderRadius: 'clamp(24px, 4vw, 38px)',
          border: '3px solid rgba(246, 213, 138, 0.85)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(37, 211, 102, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
          position: 'relative'
        }}
      >
        {/* Smartphone Top Speaker Notch & Dynamic Island */}
        <div
          style={{
            background: '#202c33',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px'
          }}
        >
          {/* Speaker pill */}
          <div
            style={{
              width: '54px',
              height: '4px',
              borderRadius: '2px',
              background: '#0b141a'
            }}
          />
        </div>

        {/* Authentic WhatsApp Top Header */}
        <div
          style={{
            background: '#202c33',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Sayali Avatar */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F6D58A, #f472b6)',
                padding: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                flexShrink: 0
              }}
            >
              <img
                src="/girl-face.png"
                alt="Sayali"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain', background: '#fff' }}
              />
            </div>

            <div style={{ overflow: 'hidden' }}>
              <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#e9edef', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {CONFIG.girlName || "Sayali"} 🌸
              </span>
              <span style={{ fontSize: '0.7rem', color: '#25D366', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#25D366' }} />
                online • typing memories...
              </span>
            </div>
          </div>

          {/* Action Call & Camera Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#aebac1' }}>
            <Video size={18} style={{ cursor: 'pointer' }} />
            <Phone size={16} style={{ cursor: 'pointer' }} />
            <MoreVertical size={17} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Day to Night Timeline Milestone Banner */}
        <div
          style={{
            background: isNight
              ? 'linear-gradient(90deg, #1e1b4b, #31103f)'
              : isSunset
              ? 'linear-gradient(90deg, #7c2d12, #9a3412)'
              : 'linear-gradient(90deg, #134e4a, #065f46)',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#F6D58A',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            transition: 'all 0.5s ease'
          }}
        >
          {isNight ? <Moon size={12} /> : <Sun size={12} />}
          <span>{currentChat.phaseLabel}</span>
        </div>

        {/* WhatsApp Chat Wallpaper Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: '#0b141a',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        >
          {/* Encryption Notice */}
          <div
            style={{
              alignSelf: 'center',
              background: 'rgba(24, 34, 41, 0.85)',
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '0.68rem',
              color: '#ffe599',
              textAlign: 'center',
              maxWidth: '85%',
              marginBottom: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            🔒 Messages between Durvank & Sayali are sealed with love & lifelong friendship
          </div>

          {chats.slice(0, activeMessageIndex + 1).map((msg) => {
            const isMe = msg.sender === 'boy';

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  width: '100%',
                  animation: 'popIn 0.28s ease'
                }}
              >
                <div
                  style={{
                    maxWidth: '84%',
                    background: isMe ? '#005c4b' : '#202c33',
                    color: '#e9edef',
                    padding: '7px 11px 5px 11px',
                    borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                    position: 'relative',
                    wordBreak: 'break-word'
                  }}
                >
                  <p style={{ margin: '0 0 3px 0', fontSize: '0.84rem', lineHeight: 1.4 }}>
                    {msg.text}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '4px',
                      fontSize: '0.65rem',
                      color: 'rgba(255, 255, 255, 0.55)'
                    }}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck size={13} color="#53bdeb" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Instruction Banner pointing directly to Send Button when unlocked */}
        {canProceed && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '12px',
              paddingBottom: '4px',
              background: 'linear-gradient(180deg, transparent, rgba(11, 20, 26, 0.95))',
              zIndex: 20
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
                animation: 'pulse 1.8s infinite'
              }}
            >
              <span>Tap the green Send button to continue ➜</span>
              <ArrowDown size={14} style={{ animation: 'bounce 1s infinite' }} />
            </div>
          </div>
        )}

        {/* WhatsApp Mobile Chat Input Bar */}
        <div
          style={{
            background: '#202c33',
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative'
          }}
        >
          {/* Input Capsule with Emoji and Attachment Icons */}
          <div
            style={{
              flex: 1,
              background: '#2a3942',
              borderRadius: '24px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Smile size={18} color="#8696a0" style={{ cursor: 'pointer', flexShrink: 0 }} />
            <span
              style={{
                flex: 1,
                fontSize: '0.82rem',
                color: canProceed ? '#F6D58A' : '#8696a0',
                fontWeight: canProceed ? 700 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {canProceed ? '👉 Click the green Send button!' : 'Durvank & Sayali chatting...'}
            </span>
            <Paperclip size={17} color="#8696a0" style={{ cursor: 'pointer', flexShrink: 0 }} />
          </div>

          {/* WhatsApp Green Send Button with animated attention pulse */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={onNext}
              disabled={!canProceed}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: canProceed
                  ? 'linear-gradient(135deg, #25D366, #128C7E)'
                  : '#2a3942',
                border: canProceed ? '2px solid #ffffff' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                opacity: canProceed ? 1 : 0.45,
                boxShadow: canProceed
                  ? '0 0 20px rgba(37, 211, 102, 0.8), 0 4px 15px rgba(0,0,0,0.4)'
                  : 'none',
                transform: canProceed ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.25s ease',
                flexShrink: 0
              }}
              title={canProceed ? "Tap to continue to our sunset drive" : "Chat in progress"}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
