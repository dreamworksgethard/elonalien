(function () {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let tick = 0;

  const STAR_COUNT = 420;
  const LAYER_SPEED = [0.08, 0.18, 0.32];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const layer = Math.floor(Math.random() * 3);
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (layer === 0 ? 1.2 : layer === 1 ? 1.6 : 2) + 0.3,
        base: Math.random() * Math.PI * 2,
        speed: LAYER_SPEED[layer] * (0.6 + Math.random() * 0.8),
        twinkle: 0.35 + Math.random() * 0.65,
        layer,
      });
    }
  }

  function draw() {
    tick += 0.012;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y += s.speed;
      if (s.y > h + 4) {
        s.y = -4;
        s.x = Math.random() * w;
      }

      const pulse = 0.55 + 0.45 * Math.sin(tick * 2.2 + s.base * s.twinkle);
      const alpha = (0.15 + s.layer * 0.18) * pulse;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      if (s.layer === 2 && pulse > 0.92) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 255, 100, ${alpha * 0.22})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
