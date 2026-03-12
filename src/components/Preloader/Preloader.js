import React, { useEffect, useState } from "react";

const preloaderStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Outfit:wght@300;400;600;700;800;900&display=swap');

  .bjp-preloader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #07060f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.9s ease, visibility 0.9s ease;
  }
  .bjp-preloader.hide {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .bjp-lotus-wrap {
    position: relative;
    width: 160px; height: 160px;
    margin-bottom: 36px;
  }
  .bjp-lotus-svg {
    width: 160px; height: 160px;
    filter: drop-shadow(0 0 24px rgba(255,153,51,0.6));
  }

  .lotus-petal {
    opacity: 0;
    transform-origin: 80px 95px;
    animation: petalBloom 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .lotus-petal:nth-child(1) { animation-delay:0.10s; }
  .lotus-petal:nth-child(2) { animation-delay:0.20s; }
  .lotus-petal:nth-child(3) { animation-delay:0.30s; }
  .lotus-petal:nth-child(4) { animation-delay:0.40s; }
  .lotus-petal:nth-child(5) { animation-delay:0.50s; }
  .lotus-petal:nth-child(6) { animation-delay:0.60s; }
  .lotus-petal:nth-child(7) { animation-delay:0.70s; }
  .lotus-petal:nth-child(8) { animation-delay:0.80s; }

  @keyframes petalBloom {
    from { opacity:0; transform: scale(0.2) rotate(-20deg); }
    to   { opacity:1; transform: scale(1) rotate(0deg); }
  }

  .lotus-center {
    opacity: 0;
    animation: centerIn 0.5s ease 1s forwards;
  }
  @keyframes centerIn {
    from { opacity:0; transform: scale(0); }
    to   { opacity:1; transform: scale(1); }
  }

  /* Rings */
  .bjp-ring {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 1px solid rgba(255,153,51,0.25);
    opacity: 0;
    animation: ringIn 0.4s ease 1.1s forwards, ringSpin 10s linear 1.1s infinite;
  }
  .bjp-ring2 {
    position: absolute;
    inset: -30px;
    border-radius: 50%;
    border: 1px dashed rgba(212,175,55,0.12);
    opacity: 0;
    animation: ringIn 0.4s ease 1.3s forwards, ringSpinRev 16s linear 1.3s infinite;
  }
  @keyframes ringIn    { to { opacity:1; } }
  @keyframes ringSpin  { to { transform: rotate(360deg); } }
  @keyframes ringSpinRev { to { transform: rotate(-360deg); } }

  /* Name block */
  .bjp-pre-name-block {
    text-align: center;
    opacity: 0;
    animation: nameIn 0.8s ease 1.2s forwards;
  }
  @keyframes nameIn {
    from { opacity:0; transform: translateY(16px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .bjp-pre-tag-line {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255,153,51,0.5);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .bjp-pre-tag-line::before,
  .bjp-pre-tag-line::after {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: rgba(255,153,51,0.3);
  }

  .bjp-pre-fullname {
    font-family: 'Outfit', sans-serif;
    font-size: 2.3em;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.5px;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .bjp-pre-fullname span { color: #FF9933; text-shadow: 0 0 30px rgba(255,153,51,0.5); }

  .bjp-pre-designation {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85em;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }
  .bjp-pre-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.95em;
    color: rgba(255,153,51,0.55);
    margin-top: 2px;
  }

  /* Progress bar */
  .bjp-progress-wrap {
    width: 200px; height: 2px;
    background: rgba(255,255,255,0.07);
    border-radius: 2px;
    margin-top: 28px;
    overflow: hidden;
    opacity: 0;
    animation: fadeIn 0.3s ease 1.5s forwards;
  }
  @keyframes fadeIn { to { opacity:1; } }
  .bjp-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #FF6B00, #FF9933, #D4AF37);
    border-radius: 2px;
    width: 0%;
    animation: progFill 1.4s cubic-bezier(0.22,1,0.36,1) 1.6s forwards;
    box-shadow: 0 0 8px rgba(255,153,51,0.6);
  }
  @keyframes progFill { to { width: 100%; } }

  .bjp-jai-bharat {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.75em;
    color: rgba(255,153,51,0.28);
    letter-spacing: 4px;
    margin-top: 18px;
    opacity: 0;
    animation: fadeIn 0.5s ease 1.8s forwards;
  }
`;

const PETALS = [
  { d: "M80,80 C72,58 62,36 80,16 C98,36 88,58 80,80Z", fill: "#FF9933" },
  { d: "M80,80 C102,72 122,58 132,72 C118,86 96,88 80,80Z", fill: "#FF8C00" },
  { d: "M80,80 C88,102 98,122 84,132 C70,118 68,96 80,80Z", fill: "#FFA500" },
  { d: "M80,80 C58,88 36,98 26,84 C40,70 62,68 80,80Z", fill: "#FF9933" },
  { d: "M80,80 C74,58 58,42 44,50 C52,64 66,76 80,80Z", fill: "#FFB347" },
  { d: "M80,80 C102,74 118,58 110,44 C96,52 84,66 80,80Z", fill: "#FF8C00" },
  { d: "M80,80 C86,102 102,118 116,110 C108,96 92,84 80,80Z", fill: "#D4AF37" },
  { d: "M80,80 C58,86 42,102 50,116 C64,108 76,92 80,80Z", fill: "#FF9933" },
];

function Preloader({ load, onComplete }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!load) return;
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 900);
    }, 3500);
    return () => clearTimeout(timer);
  }, [load, onComplete]);

  if (!load && !hiding) return null;

  return (
    <>
      <style>{preloaderStyles}</style>
      <div className={`bjp-preloader${hiding ? " hide" : ""}`}>
        {/* Lotus */}
        <div className="bjp-lotus-wrap">
          <div className="bjp-ring" />
          <div className="bjp-ring2" />
          <svg className="bjp-lotus-svg" viewBox="0 0 160 160">
            <defs>
              <radialGradient id="petalGrad" cx="50%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#FFB347" />
                <stop offset="100%" stopColor="#FF6B00" />
              </radialGradient>
            </defs>
            {PETALS.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="url(#petalGrad)"
                opacity="0.9"
                className="lotus-petal"
              />
            ))}
            <circle
              cx="80"
              cy="80"
              r="16"
              fill="#FF6B00"
              className="lotus-center"
            />
            <circle
              cx="80"
              cy="80"
              r="9"
              fill="#D4AF37"
              className="lotus-center"
              style={{ animationDelay: "1.1s" }}
            />
            <circle
              cx="80"
              cy="80"
              r="4"
              fill="#fff"
              className="lotus-center"
              style={{ animationDelay: "1.2s", opacity: 0.8 }}
            />
          </svg>
        </div>

        {/* Name */}
        <div className="bjp-pre-name-block">
          <div className="bjp-pre-tag-line">BJP · भारतीय जनता पार्टी</div>
          <div className="bjp-pre-fullname">
            Vikram Singh <span>Chauhan</span>
          </div>
          <div className="bjp-pre-designation">
            Deputy Chief Minister · Madhya Pradesh
          </div>
          <div className="bjp-pre-hindi">उप मुख्यमंत्री · मध्य प्रदेश</div>
        </div>

        {/* Progress */}
        <div className="bjp-progress-wrap">
          <div className="bjp-progress-bar" />
        </div>

        <div className="bjp-jai-bharat">जय भारत · जय BJP</div>
      </div>
    </>
  );
}

export default Preloader;
