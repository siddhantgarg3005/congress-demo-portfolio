import React, { useEffect } from "react";
import { Col } from "react-bootstrap";

const techStyles = `
  .bjp-commit-card {
    position: relative;
    border-radius: 16px;
    padding: 24px 16px 20px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.12);
    text-align: center;
    cursor: default;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    margin: 8px 0;
    animation: commitIn 0.6s ease both;
  }
  .bjp-commit-card:hover {
    background: rgba(255,153,51,0.07);
    border-color: rgba(255,153,51,0.4);
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 16px 40px rgba(255,153,51,0.12);
  }

  /* shimmer */
  .bjp-commit-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.07), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  .bjp-commit-card:hover::after { left: 160%; }

  .bjp-commit-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.7), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .bjp-commit-card:hover::before { opacity: 1; }

  @keyframes commitIn {
    from { opacity:0; transform: translateY(18px) scale(0.95); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  .bjp-commit-icon {
    font-size: 2.2em;
    margin-bottom: 10px;
    display: block;
    transition: transform 0.35s ease;
    filter: grayscale(0.2);
  }
  .bjp-commit-card:hover .bjp-commit-icon {
    transform: scale(1.18) rotate(-8deg);
    filter: grayscale(0) drop-shadow(0 0 8px rgba(255,153,51,0.5));
  }

  .bjp-commit-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    transition: color 0.3s ease;
    line-height: 1.3;
  }
  .bjp-commit-card:hover .bjp-commit-label {
    color: #FF9933;
  }

  .bjp-commit-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.65em;
    color: rgba(255,153,51,0.4);
    margin-top: 3px;
    display: block;
    transition: color 0.3s ease;
  }
  .bjp-commit-card:hover .bjp-commit-hindi {
    color: rgba(255,153,51,0.7);
  }
`;

const commitments = [
  { icon: "🛣️", label: "Roads & PWD", hindi: "सड़क निर्माण" },
  { icon: "🏘️", label: "Village Dev", hindi: "ग्राम विकास" },
  { icon: "👨‍🌾", label: "Farmer Welfare", hindi: "किसान कल्याण" },
  { icon: "🎓", label: "Education", hindi: "शिक्षा" },
  { icon: "🏥", label: "Healthcare", hindi: "स्वास्थ्य" },
  { icon: "💧", label: "Clean Water", hindi: "स्वच्छ जल" },
  { icon: "⚡", label: "Power for All", hindi: "बिजली" },
  { icon: "🌱", label: "Youth Empowerment", hindi: "युवा शक्ति" },
  { icon: "🏗️", label: "Infrastructure", hindi: "आधारभूत ढांचा" },
  { icon: "🇮🇳", label: "Nation First", hindi: "राष्ट्र प्रथम" },
  { icon: "⚖️", label: "Justice for All", hindi: "न्याय" },
  { icon: "🙏", label: "Public Service", hindi: "जन सेवा" },
];

function Techstack() {
  useEffect(() => {
    if (!document.getElementById("bjp-tech-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-tech-styles";
      tag.innerHTML = techStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("bjp-tech-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      {commitments.map((c, i) => (
        <Col
          xs={4}
          md={2}
          className="bjp-commit-card"
          key={i}
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <span className="bjp-commit-icon">{c.icon}</span>
          <span className="bjp-commit-label">{c.label}</span>
          <span className="bjp-commit-hindi">{c.hindi}</span>
        </Col>
      ))}
    </>
  );
}

export default Techstack;
