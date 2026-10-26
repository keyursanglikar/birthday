// Intelligent Image Preloader and Cache Manager for Instant Scene Transitions
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
    targetUrls.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  });
};
