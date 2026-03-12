import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Tiro+Devanagari+Hindi&display=swap');

  .bjp-resume-section {
    position: relative;
    padding: 100px 0 60px !important;
    min-height: 100vh;
    overflow: hidden;
  }
  .bjp-resume-orb1 {
    position: absolute; top: -120px; left: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,153,51,0.07) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
    animation: orbDrift1 14s ease-in-out infinite;
  }
  .bjp-resume-orb2 {
    position: absolute; bottom: -100px; right: -80px;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
    animation: orbDrift2 18s ease-in-out infinite;
  }
  @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
  @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-30px)} }

  .bjp-resume-title {
    font-family: 'Outfit', sans-serif;
    font-size: 2.8em; font-weight: 800; color: #fff;
    text-align: center; letter-spacing: -0.5px; margin-bottom: 6px;
    position: relative; z-index: 1;
    animation: titleIn 0.9s ease both;
  }
  @keyframes titleIn { from{opacity:0;transform:translateY(-22px)} to{opacity:1;transform:translateY(0)} }

  .bjp-resume-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1em; color: rgba(255,153,51,0.5);
    text-align: center; margin-bottom: 12px;
    position: relative; z-index: 1;
  }

  .bjp-resume-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.92em; font-weight: 700; letter-spacing: 0.5px;
    padding: 12px 30px; border-radius: 40px;
    background: linear-gradient(135deg, #FF6B00, #FF9933);
    border: none; color: #fff;
    box-shadow: 0 4px 22px rgba(255,153,51,0.35);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative; z-index: 1; cursor: pointer;
  }
  .bjp-resume-btn:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 10px 36px rgba(255,153,51,0.55);
    color: #fff;
  }

  /* Timeline */
  .bjp-tl-wrap {
    max-width: 720px; margin: 0 auto 50px;
    position: relative; z-index: 1; padding: 0 10px;
  }
  .bjp-tl-line {
    position: absolute; left: 28px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #FF9933, rgba(255,153,51,0.05));
    border-radius: 2px;
  }
  .bjp-tl-item {
    display: flex; gap: 18px; margin-bottom: 24px;
    position: relative; animation: tlSlide 0.6s ease both;
  }
  .bjp-tl-item:nth-child(1){animation-delay:0.10s}
  .bjp-tl-item:nth-child(2){animation-delay:0.18s}
  .bjp-tl-item:nth-child(3){animation-delay:0.26s}
  .bjp-tl-item:nth-child(4){animation-delay:0.34s}
  .bjp-tl-item:nth-child(5){animation-delay:0.42s}
  .bjp-tl-item:nth-child(6){animation-delay:0.50s}
  .bjp-tl-item:nth-child(7){animation-delay:0.58s}
  @keyframes tlSlide { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

  .bjp-tl-dot {
    width: 34px; height: 34px; flex-shrink: 0;
    border-radius: 50%;
    background: rgba(255,153,51,0.1);
    border: 2px solid rgba(255,153,51,0.35);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95em; position: relative; z-index: 1;
    transition: all 0.3s ease;
  }
  .bjp-tl-item:hover .bjp-tl-dot {
    background: rgba(255,153,51,0.2); border-color: #FF9933;
    box-shadow: 0 0 16px rgba(255,153,51,0.4);
  }
  .bjp-tl-box {
    flex: 1;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.1);
    border-radius: 14px; padding: 14px 18px;
    transition: all 0.3s ease;
  }
  .bjp-tl-item:hover .bjp-tl-box {
    background: rgba(255,153,51,0.05);
    border-color: rgba(255,153,51,0.3);
    transform: translateX(4px);
  }
  .bjp-tl-year {
    font-family: 'Outfit', sans-serif;
    font-size: 0.7em; font-weight: 700;
    color: #FF9933; letter-spacing: 1px; margin-bottom: 3px;
  }
  .bjp-tl-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.92em; font-weight: 700; color: #fff; margin-bottom: 4px;
  }
  .bjp-tl-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em; color: rgba(255,255,255,0.5); line-height: 1.55;
  }

  .bjp-resume-btn-row {
    display: flex; justify-content: center;
    position: relative; z-index: 1; margin-bottom: 20px;
  }
`;

const timeline = [
  {
    icon: "🌱",
    year: "2002",
    title: "Entered Politics",
    desc: "Joined BJP as active grassroots member in Bhopal North. Built booth-level party network.",
  },
  {
    icon: "📋",
    year: "2007",
    title: "District President",
    desc: "Elected District President, BJP Bhopal. Network expanded to 200+ booths.",
  },
  {
    icon: "🏛️",
    year: "2013",
    title: "First MLA Election",
    desc: "Elected MLA from Bhopal North with 24,000+ vote margin.",
  },
  {
    icon: "⭐",
    year: "2016",
    title: "State Committee Member",
    desc: "Appointed to BJP State Executive Committee. Led state-wide farmer outreach.",
  },
  {
    icon: "🏆",
    year: "2018",
    title: "Re-elected as MLA",
    desc: "Won second term with expanded majority of 38,000+ votes.",
  },
  {
    icon: "🌟",
    year: "2020",
    title: "National Secretariat",
    desc: "Nominated to BJP National Secretariat. Represented MP at national level.",
  },
  {
    icon: "🏅",
    year: "2023",
    title: "Deputy Chief Minister",
    desc: "Sworn in as Deputy CM of Madhya Pradesh. Heads PWD + Rural Development Ministry.",
  },
];

function ResumeNew() {
  useEffect(() => {
    if (!document.getElementById("bjp-resume-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-resume-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("bjp-resume-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div>
      <Container fluid className="bjp-resume-section">
        <Particle />
        <div className="bjp-resume-orb1" />
        <div className="bjp-resume-orb2" />

        <h1 className="bjp-resume-title">
          उपलब्धियाँ · <span className="purple">Achievements</span>
        </h1>
        <p className="bjp-resume-hindi">राजनीतिक यात्रा और कार्य</p>

        <div
          className="saffron-divider"
          style={{ position: "relative", zIndex: 1, marginBottom: "44px" }}
        >
          <span />
          <span />
          <span />
        </div>

        {/* Timeline */}
        <div className="bjp-tl-wrap">
          <div className="bjp-tl-line" />
          {timeline.map((t, i) => (
            <div className="bjp-tl-item" key={i}>
              <div className="bjp-tl-dot">{t.icon}</div>
              <div className="bjp-tl-box">
                <div className="bjp-tl-year">{t.year}</div>
                <div className="bjp-tl-title">{t.title}</div>
                <div className="bjp-tl-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Download button */}
        <div className="bjp-resume-btn-row">
          <button
            className="bjp-resume-btn"
            onClick={() =>
              alert("PDF will be linked when you add the document!")
            }
          >
            <AiOutlineDownload /> Download Full Profile
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ResumeNew;
