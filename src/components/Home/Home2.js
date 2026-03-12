import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const home2Styles = `
  .bjp-vision-section {
    padding: 60px 0 80px;
    position: relative;
    overflow: hidden;
  }

  .bjp-vision-intro {
    text-align: center;
    margin-bottom: 50px;
    position: relative;
    z-index: 1;
  }

  .bjp-vision-tag {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255,153,51,0.6);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .bjp-vision-tag::before,
  .bjp-vision-tag::after {
    content: '';
    display: block;
    width: 40px; height: 1px;
    background: rgba(255,153,51,0.3);
  }

  .bjp-vision-title {
    font-family: 'Outfit', sans-serif;
    font-size: 2.4em;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .bjp-vision-title span { color: #FF9933; }

  .bjp-vision-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 0.95em;
    color: rgba(255,255,255,0.45);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Cards grid */
  .bjp-pillars-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    position: relative;
    z-index: 1;
  }
  @media(max-width:1100px) { .bjp-pillars-grid { grid-template-columns: repeat(3,1fr); } }
  @media(max-width:700px)  { .bjp-pillars-grid { grid-template-columns: repeat(2,1fr); } }

  .bjp-pillar-card {
    position: relative;
    border-radius: 20px;
    padding: 30px 16px 24px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.12);
    text-align: center;
    cursor: default;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    animation: pillarIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }

  .bjp-pillar-card:nth-child(1){animation-delay:0.1s}
  .bjp-pillar-card:nth-child(2){animation-delay:0.2s}
  .bjp-pillar-card:nth-child(3){animation-delay:0.3s}
  .bjp-pillar-card:nth-child(4){animation-delay:0.4s}
  .bjp-pillar-card:nth-child(5){animation-delay:0.5s}

  @keyframes pillarIn {
    from { opacity:0; transform: translateY(28px) scale(0.94); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  /* shimmer */
  .bjp-pillar-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.07), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }
  .bjp-pillar-card:hover::after { left: 160%; }

  /* top glow line */
  .bjp-pillar-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.8), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    box-shadow: 0 0 8px rgba(255,153,51,0.5);
  }
  .bjp-pillar-card:hover::before { opacity: 1; }

  .bjp-pillar-card:hover {
    background: rgba(255,153,51,0.07);
    border-color: rgba(255,153,51,0.4);
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 50px rgba(255,153,51,0.14);
  }

  .bjp-pillar-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: rgba(255,153,51,0.1);
    border: 1px solid rgba(255,153,51,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6em;
    margin: 0 auto 16px;
    transition: all 0.35s ease;
  }
  .bjp-pillar-card:hover .bjp-pillar-icon-wrap {
    background: rgba(255,153,51,0.2);
    border-color: rgba(255,153,51,0.5);
    box-shadow: 0 0 20px rgba(255,153,51,0.3);
    transform: scale(1.1) rotate(-5deg);
  }

  .bjp-pillar-name {
    font-family: 'Outfit', sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .bjp-pillar-card:hover .bjp-pillar-name { color: #FF9933; }

  .bjp-pillar-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
    transition: color 0.3s ease;
  }
  .bjp-pillar-card:hover .bjp-pillar-desc {
    color: rgba(255,255,255,0.7);
  }

  .bjp-pillar-bottom-bar {
    position: absolute;
    bottom: 0; left: 30%; right: 30%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FF9933, transparent);
    opacity: 0;
    transition: all 0.3s ease;
  }
  .bjp-pillar-card:hover .bjp-pillar-bottom-bar {
    opacity: 1; left: 15%; right: 15%;
    box-shadow: 0 0 8px rgba(255,153,51,0.6);
  }

  /* quote section */
  .bjp-quote-section {
    margin-top: 70px;
    position: relative;
    z-index: 1;
    border-radius: 24px;
    overflow: hidden;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bjp-quote-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,107,0,0.12), rgba(212,175,55,0.08));
    border: 1px solid rgba(255,153,51,0.15);
    border-radius: 24px;
  }
  .bjp-quote-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 50px 40px;
  }
  .bjp-quote-mark {
    font-size: 5em;
    color: rgba(255,153,51,0.15);
    line-height: 0.5;
    font-family: Georgia, serif;
    display: block;
    margin-bottom: 16px;
  }
  .bjp-quote-text {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.6em;
    color: #fff;
    line-height: 1.6;
    margin-bottom: 16px;
    text-shadow: 0 0 30px rgba(255,153,51,0.2);
  }
  .bjp-quote-author {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85em;
    font-weight: 600;
    color: #FF9933;
    letter-spacing: 1px;
  }
`;

const pillars = [
  {
    icon: "🛣️",
    name: "Infrastructure",
    desc: "Roads, bridges & connectivity for every village",
  },
  {
    icon: "🏘️",
    name: "Village Development",
    desc: "Gaon ka vikas, Bharat ka vikas",
  },
  {
    icon: "👨‍🌾",
    name: "Farmer Welfare",
    desc: "Kisan ki samridhi, desh ki unnati",
  },
  {
    icon: "🎓",
    name: "Education & Youth",
    desc: "Empowering youth with skills & opportunities",
  },
  {
    icon: "🇮🇳",
    name: "Nation First",
    desc: "Sabka Saath, Sabka Vikas, Sabka Vishwas",
  },
];

function Home2() {
  useEffect(() => {
    if (!document.getElementById("bjp-home2-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-home2-styles";
      tag.innerHTML = home2Styles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("bjp-home2-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <section className="bjp-vision-section">
      <Container>
        {/* Header */}
        <div className="bjp-vision-intro">
          <div className="bjp-vision-tag">Vision Pillars</div>
          <h2 className="bjp-vision-title">
            पाँच <span>संकल्प</span>
          </h2>
          <p className="bjp-vision-sub">
            Five core pillars that drive every decision, every policy, and every
            action — for the people of Madhya Pradesh.
          </p>
          <div className="saffron-divider" style={{ marginTop: "20px" }}>
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Pillar cards */}
        <div className="bjp-pillars-grid">
          {pillars.map((p, i) => (
            <div className="bjp-pillar-card" key={i}>
              <div className="bjp-pillar-icon-wrap">{p.icon}</div>
              <div className="bjp-pillar-name">{p.name}</div>
              <div className="bjp-pillar-desc">{p.desc}</div>
              <div className="bjp-pillar-bottom-bar" />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="bjp-quote-section">
          <div className="bjp-quote-bg" />
          <div className="bjp-quote-content">
            <span className="bjp-quote-mark">"</span>
            <p className="bjp-quote-text">विकास की राह पर, जनता के साथ हमेशा</p>
            <div className="bjp-quote-author">
              — Vikram Singh Chauhan · विक्रम सिंह चौहान
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Home2;
