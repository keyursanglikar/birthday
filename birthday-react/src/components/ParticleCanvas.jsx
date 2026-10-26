import React, { useRef, useEffect } from 'react';

export const ParticleCanvas = ({ enabled = true, count = 45 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const roseColors = ['#e11d48', '#be123c', '#9f1239', '#fb7185', '#fda4af', '#F6D58A', '#ffe4e6'];
    const particles = [];

    for (let i = 0; i < count; i++) {
      const typeRoll = Math.random();
      let type = 'rosePetal';
      if (typeRoll < 0.2) type = 'sparkle';
      else if (typeRoll < 0.35) type = 'miniFlower';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2.5,
        speedX: (Math.random() - 0.4) * 0.7,
        speedY: Math.random() * 0.9 + 0.4, // Gentle downward drift like real falling petals
        color: roseColors[Math.floor(Math.random() * roseColors.length)],
        opacity: Math.random() * 0.65 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        swaySpeed: Math.random() * 0.03 + 0.01,
        swayVal: Math.random() * Math.PI * 2,
        type
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.swayVal += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayVal) * 0.6;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Wrap around smoothly
        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'rosePetal') {
          // Curving realistic velvety red rose petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 2);
          ctx.bezierCurveTo(p.size * 2, -p.size * 2, p.size * 2.4, p.size, 0, p.size * 2.2);
          ctx.bezierCurveTo(-p.size * 2.4, p.size, -p.size * 2, -p.size * 2, 0, -p.size * 2);
          ctx.fill();

          // Subtle inner petal fold highlight
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size * 1.5);
          ctx.stroke();
        } else if (p.type === 'miniFlower') {
          // Mini 5-petal blossom
          ctx.fillStyle = p.color;
          for (let petal = 0; petal < 5; petal++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.ellipse(0, p.size * 1.1, p.size * 0.7, p.size * 1.2, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          // Golden center pistil
          ctx.fillStyle = '#F6D58A';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Warm golden fairy sparkle
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F6D58A';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
};
