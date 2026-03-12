import React, { useEffect } from "react";
import { Col } from "react-bootstrap";

const toolStyles = `
  .bjp-achiev-card {
    position: relative;
    border-radius: 16px;
    padding: 24px 16px 20px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(212,175,55,0.12);
    text-align: center;
    cursor: default;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    margin: 8px 0;
    animation: achievIn 0.6s ease both;
  }
  .bjp-achiev-card:hover {
    background: rgba(212,175,55,0.07);
    border-color: rgba(212,175,55,0.4);
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 16px 40px rgba(212,175,55,0.1);
  }

  .bjp-achiev-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.07), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  .bjp-achiev-card:hover::after { left: 160%; }

  .bjp-achiev-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .bjp-achiev-card:hover::before { opacity: 1; }

  @keyframes achievIn {
    from { opacity:0; transform: translateY(18px) scale(0.95); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  .bjp-achiev-icon {
    font-size: 2.2em;
    margin-bottom: 10px;
    display: block;
    transition: transform 0.35s ease;
  }
  .bjp-achiev-card:hover .bjp-achiev-icon {
    transform: scale(1.18) rotate(-8deg);
    filter: drop-shadow(0 0 8px rgba(212,175,55,0.5));
  }

  .bjp-achiev-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    transition: color 0.3s ease;
    line-height: 1.3;
  }
  .bjp-achiev-card:hover .bjp-achiev-label { color: #D4AF37; }

  .bjp-achiev-year {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62em;
    color: rgba(212,175,55,0.4);
    margin-top: 3px;
    display: block;
    transition: color 0.3s ease;
  }
  .bjp-achiev-card:hover .bjp-achiev-year { color: rgba(212,175,55,0.7); }
`;

const achievements = [
  { icon: "🏆", label: "Best MLA Award", year: "2018" },
  { icon: "🥇", label: "Development Excellence", year: "2019" },
  { icon: "🌟", label: "BJP State President", year: "2016" },
  { icon: "📜", label: "Parliamentary Honour", year: "2021" },
  { icon: "🏅", label: "Kisan Mitra Award", year: "2020" },
  { icon: "🎖️", label: "Public Service Medal", year: "2022" },
];

function Toolstack() {
  useEffect(() => {
    if (!document.getElementById("bjp-tool-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-tool-styles";
      tag.innerHTML = toolStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("bjp-tool-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      {achievements.map((a, i) => (
        <Col
          xs={4}
          md={2}
          className="bjp-achiev-card"
          key={i}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <span className="bjp-achiev-icon">{a.icon}</span>
          <span className="bjp-achiev-label">{a.label}</span>
          <span className="bjp-achiev-year">{a.year}</span>
        </Col>
      ))}
    </>
  );
}

export default Toolstack;
