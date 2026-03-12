import React, { useEffect, useState } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;600;700;800&family=Tiro+Devanagari+Hindi&display=swap');

  .bjp-about-card {
    position: relative;
    border-radius: 20px;
    background: rgba(10,8,20,0.9);
    border: 1px solid rgba(255,153,51,0.2);
    box-shadow:
      0 0 0 1px rgba(255,153,51,0.06),
      0 20px 60px rgba(255,153,51,0.08),
      0 8px 20px rgba(0,0,0,0.5);
    backdrop-filter: blur(14px);
    overflow: hidden;
    animation: cardSlideIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes cardSlideIn {
    from { opacity:0; transform: translateY(30px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  /* Corner brackets */
  .bjp-card-corner {
    position: absolute;
    width: 22px; height: 22px;
    border-color: rgba(255,153,51,0.5);
    border-style: solid;
    transition: all 0.4s ease;
    z-index: 2;
  }
  .bjp-card-corner-tl { top:-1px; left:-1px; border-width: 2px 0 0 2px; border-radius: 8px 0 0 0; }
  .bjp-card-corner-tr { top:-1px; right:-1px; border-width: 2px 2px 0 0; border-radius: 0 8px 0 0; }
  .bjp-card-corner-bl { bottom:-1px; left:-1px; border-width: 0 0 2px 2px; border-radius: 0 0 0 8px; }
  .bjp-card-corner-br { bottom:-1px; right:-1px; border-width: 0 2px 2px 0; border-radius: 0 0 8px 0; }
  .bjp-about-card:hover .bjp-card-corner {
    width: 30px; height: 30px;
    border-color: rgba(255,153,51,0.9);
  }

  /* Header */
  .bjp-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    background: rgba(255,153,51,0.05);
    border-bottom: 1px solid rgba(255,153,51,0.1);
    position: relative;
  }
  .bjp-card-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.4), transparent);
  }

  .bjp-dot { width: 12px; height: 12px; border-radius: 50%; }
  .bjp-dot-r { background: #ff5f57; }
  .bjp-dot-y { background: #febc2e; }
  .bjp-dot-g { background: #28c840; }

  .bjp-card-header-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.74em;
    color: rgba(255,255,255,0.4);
    margin-left: 6px;
    letter-spacing: 0.5px;
  }

  .bjp-cursor {
    display: inline-block;
    width: 7px; height: 13px;
    background: #FF9933;
    border-radius: 1px;
    margin-left: 5px;
    vertical-align: middle;
    animation: cursorBlink 1.1s step-end infinite;
    box-shadow: 0 0 8px rgba(255,153,51,0.8);
  }
  @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* Body */
  .bjp-card-body { padding: 24px 24px 20px; }

  /* Profile rows */
  .bjp-profile-row {
    display: flex;
    align-items: flex-start;
    padding: 9px 12px;
    border-radius: 8px;
    margin-bottom: 3px;
    transition: all 0.25s ease;
    animation: rowSlide 0.5s ease both;
    cursor: default;
  }
  .bjp-profile-row:hover {
    background: rgba(255,153,51,0.07);
    transform: translateX(5px);
  }
  @keyframes rowSlide {
    from { opacity:0; transform: translateX(-12px); }
    to   { opacity:1; transform: translateX(0); }
  }
  .bjp-profile-row:nth-child(1){animation-delay:0.15s}
  .bjp-profile-row:nth-child(2){animation-delay:0.22s}
  .bjp-profile-row:nth-child(3){animation-delay:0.29s}
  .bjp-profile-row:nth-child(4){animation-delay:0.36s}
  .bjp-profile-row:nth-child(5){animation-delay:0.43s}
  .bjp-profile-row:nth-child(6){animation-delay:0.50s}

  .bjp-pkey {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8em;
    font-weight: 600;
    color: #FF9933;
    min-width: 120px;
    flex-shrink: 0;
    text-shadow: 0 0 10px rgba(255,153,51,0.25);
  }
  .bjp-psep {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8em;
    color: rgba(255,255,255,0.2);
    margin: 0 10px;
    flex-shrink: 0;
  }
  .bjp-pval {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8em;
    color: rgba(255,255,255,0.75);
    line-height: 1.5;
    flex: 1;
  }

  /* Status badge */
  .bjp-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,153,51,0.1);
    border: 1px solid rgba(255,153,51,0.3);
    border-radius: 20px;
    padding: 3px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72em;
    color: #FF9933;
    font-weight: 500;
  }
  .bjp-live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #FF9933;
    box-shadow: 0 0 6px rgba(255,153,51,0.8);
    animation: livePulse 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* Divider */
  .bjp-card-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.2), transparent);
    margin: 12px 0;
  }

  /* Quote */
  .bjp-card-quote {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.85em;
    color: rgba(255,255,255,0.35);
    text-align: center;
    padding: 12px 12px 4px;
    letter-spacing: 0.2px;
    font-style: italic;
    animation: rowSlide 0.5s ease 0.65s both;
  }
  .bjp-card-quote span { color: rgba(255,153,51,0.5); }

  .bjp-card-glow {
    position: absolute;
    bottom: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.5), transparent);
    box-shadow: 0 0 8px rgba(255,153,51,0.4);
  }
`;

const profileRows = [
  { key: "Name", val: "Vikram Singh Chauhan" },
  { key: "Born", val: "12 March 1969, Sehore, MP 🇮🇳" },
  { key: "Education", val: "MA Political Science, BU Bhopal" },
  { key: "Party", val: "भारतीय जनता पार्टी (BJP)" },
  { key: "Position", val: "Deputy Chief Minister, MP" },
  { key: "Ministry", val: "PWD + Rural Development" },
  { key: "Constituency", val: "Bhopal North (3× MLA)" },
];

function AboutCard() {
  const [typed, setTyped] = useState("");
  const full = "neta_profile.exe";

  useEffect(() => {
    if (!document.getElementById("bjp-about-card-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-about-card-styles";
      tag.innerHTML = cardStyles;
      document.head.appendChild(tag);
    }
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, ++i));
      if (i >= full.length) clearInterval(iv);
    }, 65);
    return () => {
      clearInterval(iv);
      const el = document.getElementById("bjp-about-card-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="bjp-about-card">
      <div className="bjp-card-corner bjp-card-corner-tl" />
      <div className="bjp-card-corner bjp-card-corner-tr" />
      <div className="bjp-card-corner bjp-card-corner-bl" />
      <div className="bjp-card-corner bjp-card-corner-br" />

      {/* Header */}
      <div className="bjp-card-header">
        <div className="bjp-dot bjp-dot-r" />
        <div className="bjp-dot bjp-dot-y" />
        <div className="bjp-dot bjp-dot-g" />
        <span className="bjp-card-header-title">
          {typed}
          <span className="bjp-cursor" />
        </span>
      </div>

      <div className="bjp-card-body">
        {profileRows.map((r, i) => (
          <div className="bjp-profile-row" key={i}>
            <span className="bjp-pkey">{r.key}</span>
            <span className="bjp-psep">::</span>
            <span className="bjp-pval">{r.val}</span>
          </div>
        ))}

        {/* Status row */}
        <div className="bjp-profile-row">
          <span className="bjp-pkey">Status</span>
          <span className="bjp-psep">::</span>
          <span className="bjp-pval">
            <span className="bjp-status-badge">
              <span className="bjp-live-dot" />
              Serving the People of MP
            </span>
          </span>
        </div>

        <div className="bjp-card-divider" />

        <p className="bjp-card-quote">
          <span>{"//"}</span> &quot;विकास की राह पर, जनता के साथ हमेशा&quot;
        </p>

        <div className="bjp-card-glow" />
      </div>
    </div>
  );
}

export default AboutCard;
