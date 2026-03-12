import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CSS = `
  .inc-impact-sec { padding:60px 0; }
  .inc-ic {
    text-align:center; padding:32px 20px; border-radius:20px;
    background:rgba(255,255,255,0.025); border:1px solid rgba(0,85,165,0.12);
    transition:all 0.3s ease;
  }
  .inc-ic:hover { background:rgba(0,85,165,0.07); border-color:rgba(0,85,165,0.3); transform:translateY(-4px); }
  .inc-ic-icon { font-size:1.8em; margin-bottom:10px; display:block; }
  .inc-ic-n { font-family:'Outfit',sans-serif; font-size:2.6em; font-weight:900; line-height:1; color:#0055A5; display:block; }
  .inc-ic-l { font-family:'Outfit',sans-serif; font-size:0.78em; font-weight:600; color:rgba(255,255,255,0.32); margin-top:5px; display:block; }
`;

const STATS = [
  { icon: "👩", target: 500000, suffix: "5L+", label: "Women Empowered" },
  { icon: "🌿", target: 500, suffix: "500+", label: "Villages Covered" },
  { icon: "📚", target: 100, suffix: "100+", label: "Schools Built" },
  { icon: "🏆", target: 18, suffix: "18+", label: "Years of Service" },
];

function Github() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        STATS.forEach((s, i) => {
          let frame = 0;
          const step = () => {
            frame++;
            const pct = Math.min(frame / 60, 1);
            const ease = 1 - (1 - pct) ** 3;
            setCounts((prev) => {
              const n = [...prev];
              n[i] = Math.round(s.target * ease);
              return n;
            });
            if (frame < 60) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        obs.disconnect();
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function display(i, v) {
    const s = STATS[i];
    if (v >= s.target) return s.suffix;
    if (s.target >= 100000)
      return v >= 1000 ? Math.floor(v / 1000) + "K" : v.toString();
    return v.toString();
  }

  return (
    <>
      <style>{CSS}</style>
      <section className="inc-impact-sec" ref={ref}>
        <Container>
          <Row className="g-3">
            {STATS.map((s, i) => (
              <Col md={3} sm={6} key={s.label}>
                <div className="inc-ic">
                  <span className="inc-ic-icon">{s.icon}</span>
                  <span className="inc-ic-n">{display(i, counts[i])}</span>
                  <span className="inc-ic-l">{s.label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Github;
