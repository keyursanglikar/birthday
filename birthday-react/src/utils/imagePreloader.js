// Intelligent Media Preloader with Immediate Concurrent Cache Fetching
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

  // Immediate eager cache warmup
  targetUrls.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });

  // Warm up video stream buffer immediately so it plays without lag
  try {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = '/story-video.mp4';
    video.load();
  } catch (e) {
    // Ignore background video load exceptions
  }
};
