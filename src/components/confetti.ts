export function fireConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.getElementById("confetti") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#0052FF", "#3B76FF", "#7BA3FF", "#00D4A1", "#FFFFFF"];
  const pieces: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    color: string;
    rot: number;
    vr: number;
    life: number;
    decay: number;
  }[] = [];
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.38;

  for (let i = 0; i < 120; i++) {
    const angle = (Math.PI * 2 * i) / 120 + Math.random() * 0.7;
    const spread = 0.35 + Math.random() * 0.65;
    pieces.push({
      x: cx + Math.cos(angle) * 90 * spread,
      y: cy + Math.sin(angle) * 60 * spread,
      vx: Math.cos(angle) * (1.6 + Math.random() * 3.2),
      vy: Math.sin(angle) * (1.6 + Math.random() * 3.2) - 1.8,
      w: 4 + Math.random() * 4,
      h: 2.6 + Math.random() * 3,
      color: colors[(Math.random() * colors.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.24,
      life: 1,
      decay: 0.011 + Math.random() * 0.011,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      if (p.life <= 0) return;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.055;
      p.vx *= 0.99;
      p.rot += p.vr;
      p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 160) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}