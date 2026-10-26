import React, { useRef, useEffect } from 'react';

export const ParticleCanvas = ({ enabled = true, count = 55 }) => {
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
    const fireworkColors = ['#F6D58A', '#FFB6CB', '#ff4d6d', '#38bdf8', '#a855f7', '#fbbf24', '#ffffff'];

    // 1. Regular Particles: Rose petals, Floating hearts, 4-Point Sparkle Stars, Glimmering Diamonds, Mini Teddy Faces, Butterflies
    const particles = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.random();
      let type = 'rosePetal';
      if (roll < 0.16) type = 'star';
      else if (roll < 0.32) type = 'heart';
      else if (roll < 0.46) type = 'diamond';
      else if (roll < 0.60) type = 'butterfly';
      else if (roll < 0.74) type = 'teddy';
      else if (roll < 0.88) type = 'rosePetal';
      else type = 'miniFlower';

      const isUpward = type === 'heart' || type === 'butterfly';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'teddy' ? Math.random() * 4 + 7 : type === 'butterfly' ? Math.random() * 3 + 6 : Math.random() * 3.5 + 2,
        speedX: type === 'butterfly' ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.45) * 0.7,
        speedY: isUpward ? -(Math.random() * 0.7 + 0.35) : Math.random() * 0.8 + 0.4,
        color: roseColors[Math.floor(Math.random() * roseColors.length)],
        opacity: Math.random() * 0.65 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: type === 'butterfly' ? (Math.random() - 0.5) * 0.02 : (Math.random() - 0.5) * 0.035,
        swaySpeed: type === 'butterfly' ? Math.random() * 0.06 + 0.04 : Math.random() * 0.03 + 0.015,
        swayVal: Math.random() * Math.PI * 2,
        wingFlap: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.2 + 0.15,
        shimmerVal: Math.random() * Math.PI * 2,
        shimmerSpeed: Math.random() * 0.06 + 0.03,
        type
      });
    }

    // 2. Ambient Gentle Fireworks System (Fires periodically in background)
    const fireworkSparks = [];
    const spawnFirework = () => {
      const fx = Math.random() * (width * 0.8) + width * 0.1;
      const fy = Math.random() * (height * 0.45) + height * 0.1;
      const sparkCount = Math.floor(Math.random() * 18) + 16;
      const fwColor = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

      for (let s = 0; s < sparkCount; s++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2.8 + 1.2;
        fireworkSparks.push({
          x: fx,
          y: fy,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: fwColor,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.012,
          size: Math.random() * 2.5 + 1.2
        });
      }
    };

    let lastFwTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodically trigger a gentle romantic background firework burst every 3.2 seconds
      if (Date.now() - lastFwTime > 3200) {
        spawnFirework();
        lastFwTime = Date.now();
      }

      // Draw & Update Firework Sparks
      for (let i = fireworkSparks.length - 1; i >= 0; i--) {
        const spark = fireworkSparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.035; // gentle gravity
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          fireworkSparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Floating Animated Elements
      particles.forEach((p) => {
        p.swayVal += p.swaySpeed;
        p.shimmerVal += p.shimmerSpeed;
        if (p.type === 'butterfly') {
          p.wingFlap += p.wingSpeed;
          p.x += p.speedX + Math.sin(p.swayVal) * 1.4;
        } else {
          p.x += p.speedX + Math.sin(p.swayVal) * 0.6;
        }
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Wrap around smoothly
        if (p.speedY > 0 && p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        } else if (p.speedY < 0 && p.y < -25) {
          p.y = height + 25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Shimmering brightness
        const dynamicAlpha = Math.max(0.2, Math.min(1, p.opacity * (0.7 + 0.3 * Math.sin(p.shimmerVal))));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = dynamicAlpha;

        if (p.type === 'star') {
          // 4-Point Diamond Sparkle Star
          ctx.fillStyle = '#F6D58A';
          const r1 = p.size * 2.2;
          const r2 = p.size * 0.45;
          ctx.beginPath();
          for (let pt = 0; pt < 4; pt++) {
            ctx.lineTo(Math.cos(pt * Math.PI * 0.5) * r1, Math.sin(pt * Math.PI * 0.5) * r1);
            ctx.lineTo(Math.cos(pt * Math.PI * 0.5 + Math.PI * 0.25) * r2, Math.sin(pt * Math.PI * 0.5 + Math.PI * 0.25) * r2);
          }
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'heart') {
          // Delicate Floating Pink/Rose Heart
          ctx.fillStyle = '#ff6b8b';
          const hs = p.size * 0.9;
          ctx.beginPath();
          ctx.moveTo(0, hs * 0.3);
          ctx.bezierCurveTo(-hs, -hs * 0.8, -hs * 1.8, hs * 0.2, 0, hs * 1.8);
          ctx.bezierCurveTo(hs * 1.8, hs * 0.2, hs, -hs * 0.8, 0, hs * 0.3);
          ctx.fill();
        } else if (p.type === 'diamond') {
          // Sparkling Faceted Diamond Rhombus
          ctx.fillStyle = '#ffffff';
          const ds = p.size * 1.6;
          ctx.beginPath();
          ctx.moveTo(0, -ds);
          ctx.lineTo(ds * 0.7, 0);
          ctx.lineTo(0, ds);
          ctx.lineTo(-ds * 0.7, 0);
          ctx.closePath();
          ctx.fill();

          // Internal jewel facet line
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-ds * 0.7, 0);
          ctx.lineTo(ds * 0.7, 0);
          ctx.stroke();
        } else if (p.type === 'teddy') {
          // Cute Mini Teddy Bear Face
          const tr = p.size;
          // Ears
          ctx.fillStyle = '#b45309';
          ctx.beginPath();
          ctx.arc(-tr * 0.7, -tr * 0.7, tr * 0.42, 0, Math.PI * 2);
          ctx.arc(tr * 0.7, -tr * 0.7, tr * 0.42, 0, Math.PI * 2);
          ctx.fill();

          // Inner Ears
          ctx.fillStyle = '#fde68a';
          ctx.beginPath();
          ctx.arc(-tr * 0.7, -tr * 0.7, tr * 0.22, 0, Math.PI * 2);
          ctx.arc(tr * 0.7, -tr * 0.7, tr * 0.22, 0, Math.PI * 2);
          ctx.fill();

          // Head
          ctx.fillStyle = '#d97706';
          ctx.beginPath();
          ctx.arc(0, 0, tr * 0.85, 0, Math.PI * 2);
          ctx.fill();

          // Muzzle
          ctx.fillStyle = '#fef3c7';
          ctx.beginPath();
          ctx.ellipse(0, tr * 0.22, tr * 0.42, tr * 0.32, 0, 0, Math.PI * 2);
          ctx.fill();

          // Nose & Eyes
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.arc(0, tr * 0.12, tr * 0.12, 0, Math.PI * 2); // Nose
          ctx.arc(-tr * 0.32, -tr * 0.1, tr * 0.1, 0, Math.PI * 2); // Left eye
          ctx.arc(tr * 0.32, -tr * 0.1, tr * 0.1, 0, Math.PI * 2); // Right eye
          ctx.fill();

          // Cheeks (blush)
          ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
          ctx.beginPath();
          ctx.arc(-tr * 0.46, tr * 0.18, tr * 0.14, 0, Math.PI * 2);
          ctx.arc(tr * 0.46, tr * 0.18, tr * 0.14, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'butterfly') {
          // Romantic Floating Butterfly with Fluttering Wings
          const bs = p.size;
          const flap = Math.abs(Math.sin(p.wingFlap));

          // Butterfly Wings
          ctx.fillStyle = '#ff80bf';

          // Left Wing
          ctx.save();
          ctx.scale(flap * 0.85 + 0.15, 1);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-bs * 1.8, -bs * 1.6, -bs * 2.2, -bs * 0.4, -bs * 1.5, bs * 0.3);
          ctx.bezierCurveTo(-bs * 1.6, bs * 1.2, -bs * 0.6, bs * 1.4, 0, 0);
          ctx.fill();

          // Right Wing
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(bs * 1.8, -bs * 1.6, bs * 2.2, -bs * 0.4, bs * 1.5, bs * 0.3);
          ctx.bezierCurveTo(bs * 1.6, bs * 1.2, bs * 0.6, bs * 1.4, 0, 0);
          ctx.fill();

          // Inner Wing Glow
          ctx.fillStyle = '#fff0f7';
          ctx.beginPath();
          ctx.ellipse(-bs * 0.8, -bs * 0.4, bs * 0.45, bs * 0.25, -0.4, 0, Math.PI * 2);
          ctx.ellipse(bs * 0.8, -bs * 0.4, bs * 0.45, bs * 0.25, 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Slender Body & Antennae
          ctx.fillStyle = '#4a0428';
          ctx.beginPath();
          ctx.ellipse(0, 0, bs * 0.18, bs * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rosePetal') {
          // Realistic Curved Velvety Red Rose Petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 2);
          ctx.bezierCurveTo(p.size * 2, -p.size * 2, p.size * 2.4, p.size, 0, p.size * 2.2);
          ctx.bezierCurveTo(-p.size * 2.4, p.size, -p.size * 2, -p.size * 2, 0, -p.size * 2);
          ctx.fill();

          // Fold highlight
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size * 1.5);
          ctx.stroke();
        } else {
          // Mini 5-petal flower blossom
          ctx.fillStyle = p.color;
          for (let petal = 0; petal < 5; petal++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.ellipse(0, p.size * 1.1, p.size * 0.7, p.size * 1.2, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#F6D58A';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
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
