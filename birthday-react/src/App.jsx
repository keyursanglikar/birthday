import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { StoryProgress } from './components/StoryProgress';
import { ParticleCanvas } from './components/ParticleCanvas';
import { MusicPlayer } from './components/MusicPlayer';

// Import All Scenes in Story Order
import { IntroScene } from './scenes/IntroScene';               // 1: Tap to Begin
import { CollegeScene } from './scenes/CollegeScene';           // 2: Dnyanshree College Memories
import { JourneyScene } from './scenes/JourneyScene';           // 3: Friendship Route (2022 to 2026)
import { CurtainScene } from './scenes/CurtainScene';           // 4: Heart Ribbon & Red Curtains
import { NameRevealScene } from './scenes/NameRevealScene';     // 5: Name Reveal (Sayali)
import { NameDissolveScene } from './scenes/NameDissolveScene'; // 6: Name Dissolves & Tap here
import { MapScene } from './scenes/MapScene';                   // 7: Three-City Map (Satara, Karad, Kolhapur)
import { TravelScene } from './scenes/TravelScene';             // 8: Both Travel to Karad
import { MeetingScene } from './scenes/MeetingScene';           // 9: Meet in Karad & 25 November Split Heart
import { BirthdayBlastScene } from './scenes/BirthdayBlastScene'; // 10: Confetti, Fireworks & Wishes
import { BalloonScene } from './scenes/BalloonScene';           // 11: 6 Balloons & Gifts
import { HandshakeScene } from './scenes/HandshakeScene';       // 12: Real Handshake
import { BouquetScene } from './scenes/BouquetScene';           // 13: Flowers Bouquet Offering
import { WhatsAppChatScene } from './scenes/WhatsAppChatScene';   // 14: Day to Night WhatsApp Chatting
import { DriveScene } from './scenes/DriveScene';               // 15: Sunset Drive & Chai Hangout
import { CinematicVideoScene } from './scenes/CinematicVideoScene'; // 16: Cinematic Video Memory (Muted)
import { PhotoBookScene } from './scenes/PhotoBookScene';           // 17: Memory Scrapbook with Auto Flip
import { LettersScene } from './scenes/LettersScene';               // 18: Romantic Letters (Mail Envelope)
import { FinaleScene } from './scenes/FinaleScene';                 // 19: Grand Birthday Celebration Finale
import { ScratchCardScene } from './scenes/ScratchCardScene';       // 20: Scratch Card & 4 Claimable Gifts
import { GratitudeBlessingScene } from './scenes/GratitudeBlessingScene'; // 21: Heartfelt Blessings & Gratitude

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const sceneContainerRef = useRef(null);
  const triggerMusicRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const scenes = [
    IntroScene,             // 0
    CollegeScene,           // 1
    JourneyScene,           // 2
    CurtainScene,           // 3
    NameRevealScene,        // 4
    NameDissolveScene,      // 5
    MapScene,               // 6
    TravelScene,            // 7
    MeetingScene,           // 8
    BirthdayBlastScene,     // 9
    BalloonScene,           // 10
    HandshakeScene,         // 11
    BouquetScene,           // 12 (Flower Bouquet Giving)
    WhatsAppChatScene,      // 13 (Day to Night WhatsApp Chat)
    DriveScene,             // 14
    CinematicVideoScene,    // 15 (Video Scene)
    PhotoBookScene,         // 16 (Photo Collage Auto-flip Book)
    LettersScene,           // 17 (Mail Envelope Scene)
    FinaleScene,            // 18 (Birthday Celebration Stage)
    ScratchCardScene,       // 19 (Scratch Card & 4 Gift Claim)
    GratitudeBlessingScene  // 20 (Blessings, Gratitude & Forever Signoff)
  ];

  const CurrentScene = scenes[sceneIndex];
  const isVideoScene = sceneIndex === 15; // CinematicVideoScene

  const changeScene = (nextIdx) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (sceneIndex === 0 && triggerMusicRef.current) {
      triggerMusicRef.current();
    }

    if (sceneContainerRef.current) {
      gsap.to(sceneContainerRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setSceneIndex(nextIdx);
          gsap.fromTo(
            sceneContainerRef.current,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => {
                isTransitioningRef.current = false;
              }
            }
          );
        }
      });
    } else {
      setSceneIndex(nextIdx);
      isTransitioningRef.current = false;
    }
  };

  const handleNext = () => {
    changeScene((sceneIndex + 1) % scenes.length);
  };

  const handleRestart = () => {
    changeScene(0);
  };

  return (
    <div className="stage-outer">
      <div className="stage-container">
        {/* Particle Canvas Overlay */}
        <ParticleCanvas enabled={true} count={35} />

        {/* Scene Progress Indicator - hide section number per user request */}
        {/* <StoryProgress
          currentScene={sceneIndex}
          totalScenes={scenes.length}
          onSelectScene={changeScene}
        /> */}

        {/* Background "Tum Se Hi" Audio Player (Buttons hidden, pauses automatically during video) */}
        <MusicPlayer
          onFirstInteraction={triggerMusicRef}
          isMutedByVideo={isVideoScene}
        />

        {/* Active Animated Scene Component */}
        <div
          ref={sceneContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <CurrentScene onNext={handleNext} onRestart={handleRestart} />
        </div>
      </div>
    </div>
  );
}
