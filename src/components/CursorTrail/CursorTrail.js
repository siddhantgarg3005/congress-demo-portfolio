import { useEffect } from "react";

function CursorTrail() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "bjp-cursor-trail";

    style.innerHTML = `
      .bjp-spark {
        position: fixed;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99997;
        transform: translate(-50%, -50%);
        animation: sparkFade 0.75s ease forwards;
      }

      @keyframes sparkFade {
        0% {
          opacity: 0.9;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
      }
    `;

    document.head.appendChild(style);

    const COLORS = ["#FF9933", "#FF6B00", "#D4AF37", "#FFB347", "#FFA500"];

    let last = 0;

    function onMove(e) {
      const now = Date.now();
      if (now - last < 40) return;
      last = now;

      const count = 2 + Math.floor(Math.random() * 2);

      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const el = document.createElement("div");
          el.className = "bjp-spark";

          const size = 4 + Math.random() * 6;

          el.style.left = e.clientX + "px";
          el.style.top = e.clientY + "px";
          el.style.width = size + "px";
          el.style.height = size + "px";
          el.style.background =
            COLORS[Math.floor(Math.random() * COLORS.length)];

          document.body.appendChild(el);

          const dx = (Math.random() - 0.5) * 28;
          const dy = (Math.random() - 0.5) * 28;

          requestAnimationFrame(() => {
            el.style.transform =
              "translate(calc(-50% + " +
              dx +
              "px), calc(-50% + " +
              dy +
              "px)) scale(0)";
            el.style.opacity = "0";
          });

          setTimeout(() => el.remove(), 750);
        }, i * 15);
      }
    }

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);

      const el = document.getElementById("bjp-cursor-trail");
      if (el) el.remove();
    };
  }, []);

  return null;
}

export default CursorTrail;
