import React, { useEffect, useRef } from 'react';
import { CONFIG } from '../config/storyConfig';

export const MusicPlayer = ({ onFirstInteraction, isMutedByVideo = false }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Setup and load Tum Se Hi audio file directly
    const audio = new Audio();
    audio.src = CONFIG.music.localAudio;
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudio = () => {
      if (audioRef.current && !isMutedByVideo) {
        audioRef.current.play().catch(() => {
          // Browser autoplay fallback
        });
      }
    };

    if (onFirstInteraction) {
      onFirstInteraction.current = startAudio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Pause / Resume audio when the sunset video scene is active
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMutedByVideo) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isMutedByVideo]);

  // Audio player UI buttons completely removed per request
  return null;
};
