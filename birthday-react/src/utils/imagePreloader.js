// Intelligent Media Preloader for Instant Images and Video Playback
export const preloadImages = (urls = []) => {
  if (typeof window === 'undefined') return;

  const defaultUrls = [
    '/boy-face.png',
    '/girl-face.png',
    '/college.jpg',
    '/hands-joined.jpg',
    '/bouquet-real.jpg',
    '/video-thumb.jpg'
  ];

  const targetUrls = urls.length > 0 ? urls : defaultUrls;

  // Use requestIdleCallback if available, fallback to setTimeout
  const schedulePreload = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));

  schedulePreload(() => {
    // 1. Preload key images
    targetUrls.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });

    // 2. Warm up video buffer asynchronously in background
    try {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = '/story-video.mp4';
      video.load();
    } catch (e) {
      // Ignore background warm up errors
    }
  });
};
