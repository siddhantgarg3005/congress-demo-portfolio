import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Type from "./Type";
import Particle from "../Particle";
import congressLogo from "../../Assets/congress-logo.png";
import politicianImg from "../../Assets/politician.png";
import JanAwaaz from "./JanAwaaz";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Tiro+Devanagari+Hindi&display=swap');

  /* ── HERO ── */
  .inc-hero {
    min-height: 100vh;
    padding: 120px 0 80px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .inc-hero-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 65% 55% at 10% 50%,  rgba(0,85,165,0.07)  0%, transparent 60%),
      radial-gradient(ellipse 45% 40% at 90% 25%,  rgba(19,136,8,0.04)  0%, transparent 55%),
      radial-gradient(ellipse 40% 45% at 55% 90%,  rgba(255,153,51,0.04) 0%, transparent 55%);
  }
  .inc-hero-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(0,85,165,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,85,165,0.028) 1px, transparent 1px);
    background-size: 66px 66px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }

  .inc-hero-container {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; align-items: center;
    gap: 48px; position: relative; z-index: 1;
    width: 100%;
  }

  /* ── LEFT ── */
  .inc-hero-left {
    flex: 1; min-width: 0;
    animation: iLeft 0.9s ease 0.1s both;
  }
  @keyframes iLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }

  .inc-ribbon {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
    animation: iDown 0.7s ease 0.3s both;
  }
  @keyframes iDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  .inc-ribbon-bar {
    width: 40px; height: 4px; border-radius: 2px; flex-shrink: 0;
    background: linear-gradient(90deg, #FF9933 33%, #fff 33% 66%, #138808 66%);
  }
  .inc-ribbon-txt {
    font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(0,85,165,0.65);
  }

  .inc-badge {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(0,85,165,0.07);
    border: 1px solid rgba(0,85,165,0.22);
    border-radius: 30px; padding: 6px 16px 6px 8px;
    margin-bottom: 22px;
    animation: iDown 0.7s ease 0.4s both;
  }
  .inc-badge img { width: 24px; height: 24px; object-fit: contain; }
  .inc-badge span {
    font-family: 'Outfit', sans-serif; font-size: 0.72em; font-weight: 700;
    color: #0055A5; letter-spacing: 1px; text-transform: uppercase;
  }

  .inc-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8em, 5vw, 4.4em);
    font-weight: 900; color: #fff;
    line-height: 1.04; letter-spacing: -1px;
    margin: 0 0 18px 0;
    animation: iUp 0.8s ease 0.45s both;
  }
  .inc-name .inc-hl {
    color: #0055A5; position: relative; display: inline-block;
  }
  .inc-name .inc-hl::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 3px;
    background: linear-gradient(90deg, #FF9933 33%, #fff 33% 66%, #138808 66%);
    border-radius: 2px; animation: lineW 1s ease 1.3s forwards;
  }
  @keyframes lineW { to { width: 100%; } }
  @keyframes iUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  .inc-desig {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(0,85,165,0.06);
    border: 1px solid rgba(0,85,165,0.18);
    border-radius: 10px; padding: 10px 20px;
    margin-bottom: 20px;
    font-family: 'Outfit', sans-serif; font-size: 0.9em; font-weight: 600;
    color: rgba(255,255,255,0.72);
    animation: iUp 0.8s ease 0.55s both;
  }
  .inc-desig-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #0055A5;
    box-shadow: 0 0 10px rgba(0,85,165,1);
    animation: dp 2s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes dp { 0%,100%{box-shadow:0 0 8px rgba(0,85,165,0.8)} 50%{box-shadow:0 0 18px rgba(0,85,165,1)} }

  .inc-typewriter {
    font-family: 'Outfit', sans-serif;
    font-size: 1.2em; font-weight: 700; color: #0055A5;
    text-shadow: 0 0 22px rgba(0,85,165,0.25);
    margin-bottom: 14px; min-height: 2em;
    animation: iUp 0.8s ease 0.6s both;
  }

  .inc-motto {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.92em; color: rgba(0,85,165,0.42);
    margin-bottom: 28px; font-style: italic;
    animation: iUp 0.8s ease 0.65s both;
  }

  .inc-stats {
    display: flex; flex-wrap: wrap;
    border: 1px solid rgba(0,85,165,0.14);
    border-radius: 14px; overflow: hidden;
    width: fit-content; margin-bottom: 28px;
    animation: iUp 0.8s ease 0.7s both;
  }
  .inc-stat-item {
    padding: 12px 22px; text-align: center;
    border-right: 1px solid rgba(0,85,165,0.12);
  }
  .inc-stat-item:last-child { border-right: none; }
  .inc-stat-n { font-family: 'Outfit', sans-serif; font-size: 1.55em; font-weight: 900; color: #0055A5; line-height: 1; display: block; }
  .inc-stat-l { font-family: 'Outfit', sans-serif; font-size: 0.6em; font-weight: 500; color: rgba(255,255,255,0.32); margin-top: 3px; display: block; }

  .inc-ctas {
    display: flex; flex-wrap: wrap; gap: 12px;
    animation: iUp 0.8s ease 0.78s both;
  }
  .inc-cta-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 40px;
    background: linear-gradient(135deg, #003580, #0055A5);
    color: #fff; text-decoration: none;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.92em;
    border: none; cursor: pointer; transition: all 0.3s ease;
    box-shadow: 0 6px 24px rgba(0,85,165,0.4);
  }
  .inc-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,85,165,0.55); color: #fff; }
  .inc-cta-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 40px; background: transparent;
    color: rgba(255,255,255,0.72); text-decoration: none;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.92em;
    border: 1.5px solid rgba(255,255,255,0.18); cursor: pointer; transition: all 0.3s ease;
  }
  .inc-cta-outline:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.4); color: #fff; transform: translateY(-2px); }

  /* ── RIGHT PHOTO ── */
  .inc-hero-right {
    flex-shrink: 0;
    display: flex; justify-content: center; align-items: center;
    padding: 20px;
    animation: iRight 0.9s ease 0.3s both;
  }
  @keyframes iRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }

  .inc-frame {
    position: relative;
    width: clamp(280px, 32vw, 400px);
    height: clamp(280px, 32vw, 400px);
    display: flex; align-items: center; justify-content: center;
  }

  /* tricolor aurora ring */
  .inc-ring-a {
    position: absolute; inset: -14px; border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #FF9933 0%, #FF9933 28%,
      #ffffff 28%, #ffffff 38%,
      #0055A5 38%, #0055A5 62%,
      #ffffff 62%, #ffffff 72%,
      #138808 72%, #138808 100%
    );
    animation: ringCW 8s linear infinite; opacity: 0.9;
  }
  .inc-ring-a::after {
    content: ''; position: absolute; inset: 7px;
    border-radius: 50%; background: #030916;
  }
  @keyframes ringCW { to { transform: rotate(360deg); } }

  .inc-ring-b {
    position: absolute; inset: -6px; border-radius: 50%;
    background: conic-gradient(
      from 45deg,
      transparent 0%, rgba(0,85,165,0.45) 25%,
      transparent 50%, rgba(255,153,51,0.3) 75%, transparent 100%
    );
    animation: ringCW 5s linear infinite reverse;
    filter: blur(10px);
  }

  .inc-halo {
    position: absolute; inset: -55px; border-radius: 50%;
    background: radial-gradient(circle, transparent 34%, rgba(0,85,165,0.08) 50%, rgba(0,85,165,0.04) 62%, transparent 72%);
    animation: haloB 4s ease-in-out infinite;
  }
  @keyframes haloB { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }

  .inc-spark1 { position: absolute; inset: 0; border-radius: 50%; animation: ringCW 12s linear infinite; }
  .inc-spark1::before {
    content: ''; position: absolute; width: 11px; height: 11px; border-radius: 50%;
    top: -5px; left: 50%; transform: translateX(-50%);
    background: #FF9933; box-shadow: 0 0 10px 3px rgba(255,153,51,0.9);
  }
  .inc-spark2 { position: absolute; inset: 0; border-radius: 50%; animation: ringCW 9s linear infinite reverse; }
  .inc-spark2::before {
    content: ''; position: absolute; width: 9px; height: 9px; border-radius: 50%;
    bottom: -4px; right: 16%;
    background: #138808; box-shadow: 0 0 8px 2px rgba(19,136,8,0.9);
  }
  .inc-spark2::after {
    content: ''; position: absolute; width: 8px; height: 8px; border-radius: 50%;
    top: 16%; left: -4px;
    background: #0055A5; box-shadow: 0 0 8px 2px rgba(0,85,165,0.9);
  }

  .inc-photo {
    position: relative; z-index: 2;
    width: 86%; height: 86%;
    border-radius: 50%; object-fit: cover; object-position: top center;
    display: block;
  }

  /* floating info cards */
  .inc-fcard {
    position: absolute; z-index: 4;
    background: rgba(3,9,22,0.92);
    border: 1px solid rgba(0,85,165,0.3);
    border-radius: 14px; padding: 10px 16px;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .inc-fcard.bl { bottom: -4%; left: -8%; animation: fcA 4s ease-in-out infinite; }
  .inc-fcard.tr {
    top: 2%; right: -8%;
    background: linear-gradient(135deg, #003580, #0055A5);
    border: none; box-shadow: 0 8px 28px rgba(0,85,165,0.5);
    animation: fcB 5s ease-in-out infinite; text-align: center;
  }
  @keyframes fcA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fcB { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-7px) rotate(1deg)} }
  .inc-fcl { font-family:'Outfit',sans-serif; font-size:0.63em; font-weight:600; color:rgba(0,85,165,0.75); display:block; }
  .inc-fcv { font-family:'Outfit',sans-serif; font-size:0.88em; font-weight:800; color:#fff; margin-top:2px; display:block; }
  .inc-fce { font-size:1.4em; display:block; }
  .inc-fcr { font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:800; color:#fff; margin-top:3px; white-space:nowrap; }

  /* ornaments */
  .inc-orn {
    position: absolute; z-index: 3; font-size: 1em;
    filter: drop-shadow(0 0 6px rgba(0,85,165,0.8));
    animation: ornF 3.5s ease-in-out infinite;
    pointer-events: none;
  }
  .inc-orn.tl{top:3%;left:10%;animation-delay:0s}
  .inc-orn.tr{top:3%;right:10%;animation-delay:0.8s}
  .inc-orn.bl{bottom:3%;left:10%;animation-delay:1.6s}
  .inc-orn.br{bottom:3%;right:10%;animation-delay:2.4s}
  @keyframes ornF { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-5px) scale(1.12)} }

  /* ── RESPONSIVE ── */
  @media (max-width: 992px) {
    .inc-hero-container { flex-direction: column; text-align: center; gap: 32px; }
    .inc-hero-left { display: flex; flex-direction: column; align-items: center; }
    .inc-ribbon, .inc-badge, .inc-stats, .inc-ctas { justify-content: center; }
    .inc-frame { width: clamp(240px, 55vw, 340px); height: clamp(240px, 55vw, 340px); }
    .inc-fcard.bl { left: 0%; bottom: -6%; }
    .inc-fcard.tr { right: 0%; top: -6%; }
    .inc-hero { padding: 100px 0 60px; }
  }
  @media (max-width: 600px) {
    .inc-name { font-size: 2.4em; }
    .inc-stat-item { padding: 10px 14px; }
    .inc-hero { padding: 90px 0 50px; }
  }
`;

function Home() {
  useEffect(() => {
    const id = "inc-home-css";
    if (!document.getElementById(id)) {
      const t = document.createElement("style");
      t.id = id;
      t.innerHTML = S;
      document.head.appendChild(t);
    }
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <>
      <section className="inc-hero">
        <div className="inc-hero-bg" />
        <div className="inc-hero-grid" />
        <Particle />

        <div className="inc-hero-container">
          {/* LEFT */}
          <div className="inc-hero-left">
            <div className="inc-ribbon">
              <div className="inc-ribbon-bar" />
              <span className="inc-ribbon-txt">Indian National Congress</span>
            </div>

            <div className="inc-badge">
              <img src={congressLogo} alt="INC" />
              <span>INC · हाथ से हाथ मिलाओ</span>
            </div>

            <h1 className="inc-name">
              Priya Sharma
              <br />
              <span className="inc-hl">Yadav</span>
            </h1>

            <div className="inc-desig">
              <span className="inc-desig-dot" />
              Leader of Opposition · Rajasthan
            </div>

            <div className="inc-typewriter">
              <Type />
            </div>

            <p className="inc-motto">
              "जब जनता साथ हो, तो कोई मंज़िल दूर नहीं"
            </p>

            <div className="inc-stats">
              {[
                ["32L+", "Followers"],
                ["18+", "Yrs Service"],
                ["2×", "MLA"],
                ["500+", "Villages"],
              ].map(([n, l]) => (
                <div className="inc-stat-item" key={l}>
                  <span className="inc-stat-n">{n}</span>
                  <span className="inc-stat-l">{l}</span>
                </div>
              ))}
            </div>

            <div className="inc-ctas">
              <Link to="/vision" className="inc-cta-primary">
                🕊️ हमारा विजन
              </Link>
              <Link to="/journey" className="inc-cta-outline">
                🌿 My Journey
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="inc-hero-right">
            <div className="inc-frame">
              <div className="inc-halo" />
              <div className="inc-ring-b" />
              <div className="inc-ring-a" />
              <div className="inc-spark1" />
              <div className="inc-spark2" />
              <img
                src={politicianImg}
                alt="Priya Sharma Yadav"
                className="inc-photo"
              />
              <span className="inc-orn tl">🕊️</span>
              <span className="inc-orn tr">🪷</span>
              <span className="inc-orn bl">🌿</span>
              <span className="inc-orn br">🕊️</span>
              <div className="inc-fcard bl">
                <span className="inc-fcl">📍 Constituency</span>
                <span className="inc-fcv">Jaipur Central, RJ</span>
              </div>
              <div className="inc-fcard tr">
                <span className="inc-fce">👑</span>
                <span className="inc-fcr">Leader of Opp.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JanAwaaz />
    </>
  );
}

export default Home;
