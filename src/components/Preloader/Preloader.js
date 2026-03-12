import React, { useEffect } from "react";
import congressLogo from "../../Assets/congress-logo.png";

const css = `
  .inc-preloader {
    position:fixed; inset:0; z-index:9999;
    background:#030916;
    display:flex; align-items:center; justify-content:center;
    transition: opacity 0.6s ease, visibility 0.6s ease;
  }
  .inc-preloader.hidden { opacity:0; visibility:hidden; pointer-events:none; }
  .inc-pre-inner { text-align:center; }

  /* Hand symbol pulse */
  .inc-hand-wrap {
    width:90px; height:90px; margin:0 auto 20px;
    position:relative;
    animation: handIn 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
  }
  @keyframes handIn { from{transform:scale(0) rotate(-20deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
  .inc-hand-ring {
    position:absolute; inset:-10px; border-radius:50%;
    border:2px solid transparent;
    border-top-color:#0055A5; border-right-color:#FF9933;
    border-bottom-color:#138808;
    animation: ringSpinPre 1.6s linear infinite;
  }
  @keyframes ringSpinPre { to{transform:rotate(360deg)} }
  .inc-hand-logo {
    width:90px; height:90px; object-fit:contain;
    border-radius:50%;
    position:relative; z-index:1;
    filter: drop-shadow(0 0 16px rgba(0,85,165,0.5));
  }

  .inc-pre-name {
    font-family:'Outfit',sans-serif; font-size:1.45em; font-weight:900;
    color:#fff; letter-spacing:-0.5px;
    animation:fadeUp 0.6s ease 0.6s both;
  }
  .inc-pre-party {
    font-size:0.68em; font-weight:700; letter-spacing:3px;
    text-transform:uppercase; color:#0055A5; margin-top:4px;
    animation:fadeUp 0.6s ease 0.8s both;
  }

  /* tricolor loading bar */
  .inc-pre-bar-wrap {
    width:200px; height:4px; border-radius:4px;
    background:rgba(255,255,255,0.06); margin:22px auto 0;
    overflow:hidden; animation:fadeUp 0.6s ease 1s both;
  }
  .inc-pre-bar {
    height:100%; border-radius:4px;
    background: linear-gradient(90deg, #FF9933 0%, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%, #138808 100%);
    background-size: 200px 4px;
    animation: barSlide 2.4s ease 1.1s forwards;
    width:0;
  }
  @keyframes barSlide { to{width:100%} }
  .inc-pre-tagline {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:0.82em; color:rgba(255,255,255,0.25);
    margin-top:14px; animation:fadeUp 0.6s ease 1.2s both;
  }
`;

function Preloader({ load }) {
  useEffect(() => {
    if (!document.getElementById("inc-pre-css")) {
      const t = document.createElement("style");
      t.id = "inc-pre-css";
      t.innerHTML = css;
      document.head.appendChild(t);
    }
  }, []);

  return (
    <div className={`inc-preloader${load ? "" : " hidden"}`}>
      <div className="inc-pre-inner">
        <div className="inc-hand-wrap">
          <div className="inc-hand-ring" />
          <img src={congressLogo} alt="INC" className="inc-hand-logo" />
        </div>
        <div className="inc-pre-name">Priya Sharma Yadav</div>
        <div className="inc-pre-party">Indian National Congress</div>
        <div className="inc-pre-bar-wrap">
          <div className="inc-pre-bar" />
        </div>
        <div className="inc-pre-tagline">जन जन की आवाज़ · हाथ से हाथ मिलाओ</div>
      </div>
    </div>
  );
}

export default Preloader;
