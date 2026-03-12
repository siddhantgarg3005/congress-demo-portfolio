import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";

const statsStyles = `
  .bjp-impact-section {
    justify-content: center;
    padding-bottom: 60px;
    position: relative;
    text-align: center;
  }

  .bjp-impact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    max-width: 900px;
    margin: 0 auto;
  }
  @media(max-width:768px) {
    .bjp-impact-grid { grid-template-columns: repeat(2,1fr); }
  }

  .bjp-impact-card {
    position: relative;
    border-radius: 18px;
    padding: 30px 16px 24px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.12);
    overflow: hidden;
    cursor: default;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    animation: impactIn 0.7s ease both;
  }
  .bjp-impact-card:nth-child(1){animation-delay:0.1s}
  .bjp-impact-card:nth-child(2){animation-delay:0.2s}
  .bjp-impact-card:nth-child(3){animation-delay:0.3s}
  .bjp-impact-card:nth-child(4){animation-delay:0.4s}

  @keyframes impactIn {
    from { opacity:0; transform: translateY(28px) scale(0.94); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  .bjp-impact-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.07), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }
  .bjp-impact-card:hover::after { left: 160%; }

  .bjp-impact-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.8), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    box-shadow: 0 0 8px rgba(255,153,51,0.5);
  }
  .bjp-impact-card:hover::before { opacity: 1; }

  .bjp-impact-card:hover {
    background: rgba(255,153,51,0.06);
    border-color: rgba(255,153,51,0.4);
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 18px 50px rgba(255,153,51,0.12);
  }

  .bjp-impact-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,153,51,0.1);
    border: 1px solid rgba(255,153,51,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2em;
    margin: 0 auto 14px;
    transition: all 0.35s ease;
  }
  .bjp-impact-card:hover .bjp-impact-icon {
    background: rgba(255,153,51,0.2);
    border-color: rgba(255,153,51,0.5);
    box-shadow: 0 0 18px rgba(255,153,51,0.3);
    transform: scale(1.12) rotate(-5deg);
  }

  .bjp-impact-number {
    font-family: 'Outfit', sans-serif;
    font-size: 2.1em;
    font-weight: 800;
    color: #FF9933;
    line-height: 1;
    margin-bottom: 6px;
    text-shadow: 0 0 20px rgba(255,153,51,0.35);
    transition: text-shadow 0.3s ease;
  }
  .bjp-impact-card:hover .bjp-impact-number {
    text-shadow: 0 0 30px rgba(255,153,51,0.7), 0 0 60px rgba(255,153,51,0.3);
  }

  .bjp-impact-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    line-height: 1.4;
    transition: color 0.3s ease;
  }
  .bjp-impact-card:hover .bjp-impact-label {
    color: rgba(255,255,255,0.85);
  }

  .bjp-impact-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.65em;
    color: rgba(255,153,51,0.4);
    margin-top: 4px;
    display: block;
  }

  .bjp-impact-bar {
    position: absolute;
    bottom: 0; left: 30%; right: 30%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FF9933, transparent);
    border-radius: 2px;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 0 8px rgba(255,153,51,0.6);
  }
  .bjp-impact-card:hover .bjp-impact-bar {
    opacity: 1; left: 10%; right: 10%;
  }

  .bjp-impact-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 0.82em;
    color: rgba(255,255,255,0.35);
    max-width: 600px;
    margin: 0 auto 44px;
    line-height: 1.75;
    animation: fadeUp 0.8s ease 0.2s both;
  }
  @keyframes fadeUp {
    from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)}
  }
`;

const stats = [
  {
    icon: "🏛️",
    number: "47L+",
    suffix: "",
    label: "Facebook Followers",
    hindi: "फेसबुक अनुयायी",
  },
  {
    icon: "🏘️",
    number: "58K+",
    suffix: "",
    label: "Villages Reached",
    hindi: "गाँव जोड़े",
  },
  {
    icon: "📅",
    number: "20+",
    suffix: "",
    label: "Years of Public Service",
    hindi: "जन सेवा के वर्ष",
  },
  {
    icon: "🏆",
    number: "3×",
    suffix: "",
    label: "Elected as MLA",
    hindi: "विधायक चुने गए",
  },
];

function Github() {
  const sectionRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!document.getElementById("bjp-impact-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-impact-styles";
      tag.innerHTML = statsStyles;
      document.head.appendChild(tag);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) setCounted(true);
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      const el = document.getElementById("bjp-impact-styles");
      if (el) el.remove();
      observer.disconnect();
    };
  }, [counted]);

  return (
    <Row className="bjp-impact-section" ref={sectionRef}>
      <h1 className="project-heading">
        जन <strong className="purple">प्रभाव</strong>
        <span
          style={{
            display: "block",
            fontSize: "0.45em",
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            marginTop: "4px",
          }}
        >
          Public Impact & Reach
        </span>
      </h1>

      <div className="saffron-divider">
        <span />
        <span />
        <span />
      </div>

      <p className="bjp-impact-sub">
        Numbers that reflect real work, real dedication, and real impact on the
        lives of people of Madhya Pradesh.
      </p>

      <div className="bjp-impact-grid">
        {stats.map((s, i) => (
          <div className="bjp-impact-card" key={i}>
            <div className="bjp-impact-icon">{s.icon}</div>
            <div className="bjp-impact-number">{s.number}</div>
            <div className="bjp-impact-label">
              {s.label}
              <span className="bjp-impact-hindi">{s.hindi}</span>
            </div>
            <div className="bjp-impact-bar" />
          </div>
        ))}
      </div>
    </Row>
  );
}

export default Github;
