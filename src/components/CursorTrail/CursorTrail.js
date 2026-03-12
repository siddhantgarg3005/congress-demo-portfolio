import { useEffect } from "react";

function CursorTrail() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;pointer-events:none;z-index:9998;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: -200, y: -200 };
    let particles = [];
    const COLORS = ["#0055A5", "#FF9933", "#138808", "#4A9EDB", "#fff"];
    let animId;

    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function spawn() {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          r: Math.random() * 3 + 1.5,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.6,
          alpha: 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      spawn();
      particles = particles.filter((p) => p.alpha > 0.02);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.r *= 0.97;
        p.alpha *= 0.93;
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      cancelAnimationFrame(animId);
      canvas.remove();
    };
  }, []);
  return null;
}

export default CursorTrail;
