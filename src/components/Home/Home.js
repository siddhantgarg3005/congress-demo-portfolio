import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Type from "./Type";
import Particle from "../Particle";
import bjpLogo from "../../Assets/bjp-logo.png";
import politicianImg from "../../Assets/politician-hero.png";
import CitizenQuiz from "./CitizenQuiz";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Tiro+Devanagari+Hindi&display=swap');

  /* ── HERO ── */
  .bjp-hero {
    min-height: 100vh;
    padding: 110px 0 70px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .bjp-hero::before {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(255,153,51,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,153,51,0.025) 1px, transparent 1px);
    background-size: 70px 70px;
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black, transparent);
    pointer-events:none; z-index:0;
  }
  .bjp-hero-orb1 {
    position:absolute; top:-150px; left:-120px;
    width:600px; height:600px;
    background:radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%);
    border-radius:50%; pointer-events:none;
    animation: oh1 16s ease-in-out infinite;
  }
  .bjp-hero-orb2 {
    position:absolute; bottom:-120px; right:-100px;
    width:500px; height:500px;
    background:radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%);
    border-radius:50%; pointer-events:none;
    animation: oh2 20s ease-in-out infinite;
  }
  @keyframes oh1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes oh2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-35px)} }

  /* ── LEFT CONTENT ── */
  .bjp-hero-left {
    position:relative; z-index:1;
    animation: hLeft 0.9s ease 0.1s both;
  }
  @keyframes hLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }

  .bjp-badge {
    display:inline-flex; align-items:center; gap:9px;
    background:rgba(255,153,51,0.07);
    border:1px solid rgba(255,153,51,0.22);
    border-radius:30px; padding:5px 16px 5px 8px;
    margin-bottom:20px;
    animation: fd 0.7s ease 0.3s both;
  }
  @keyframes fd { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  .bjp-badge img { width:22px; height:22px; object-fit:contain; }
  .bjp-badge span {
    font-family:'Outfit',sans-serif;
    font-size:0.72em; font-weight:700;
    color:#FF9933; letter-spacing:1.2px; text-transform:uppercase;
  }

  .bjp-hero-name {
    font-family:'Outfit',sans-serif;
    font-size: clamp(2.8em, 5.2vw, 4.4em);
    font-weight:900; color:#fff;
    line-height:1.0; letter-spacing:-1.5px;
    margin-bottom:18px;
    animation: fu 0.8s ease 0.4s both;
  }
  .bjp-hero-name .sf {
    color:#FF9933; position:relative; display:inline-block;
  }
  .bjp-hero-name .sf::after {
    content:'';
    position:absolute; bottom:-2px; left:0;
    width:0; height:3px;
    background:linear-gradient(90deg, #FF6B00, #D4AF37);
    border-radius:2px;
    animation: lg 1s ease 1.2s forwards;
  }
  @keyframes lg { to { width:100%; } }
  @keyframes fu { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  .bjp-hero-desig {
    display:inline-flex; align-items:center; gap:9px;
    background:rgba(255,153,51,0.06);
    border:1px solid rgba(255,153,51,0.18);
    border-radius:8px; padding:9px 18px;
    margin-bottom:20px;
    font-family:'Outfit',sans-serif; font-size:0.9em; font-weight:600;
    color:rgba(255,255,255,0.75);
    animation: fu 0.8s ease 0.5s both;
  }
  .bjp-hero-dot {
    width:7px; height:7px; border-radius:50%;
    background:#FF9933; box-shadow:0 0 10px rgba(255,153,51,1);
    animation: dp 2s ease-in-out infinite; flex-shrink:0;
  }
  @keyframes dp { 0%,100%{box-shadow:0 0 8px rgba(255,153,51,0.8)} 50%{box-shadow:0 0 18px rgba(255,153,51,1)} }

  .bjp-hero-type {
    font-family:'Outfit',sans-serif;
    font-size:1.2em; font-weight:700;
    color:#FF9933; text-shadow:0 0 22px rgba(255,153,51,0.25);
    margin-bottom:14px; min-height:1.8em;
    animation: fu 0.8s ease 0.6s both;
  }
  .bjp-hero-motto {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:0.92em; color:rgba(255,153,51,0.42);
    margin-bottom:28px; font-style:italic;
    animation: fu 0.8s ease 0.65s both;
  }

  .bjp-hero-stats {
    display:flex; width:fit-content;
    border:1px solid rgba(255,153,51,0.1);
    border-radius:14px; overflow:hidden;
    margin-bottom:28px;
    animation: fu 0.8s ease 0.7s both;
  }
  .bjp-hero-stat {
    padding:12px 20px; text-align:center;
    border-right:1px solid rgba(255,153,51,0.1);
  }
  .bjp-hero-stat:last-child { border-right:none; }
  .bjp-hn { font-family:'Outfit',sans-serif; font-size:1.55em; font-weight:900; color:#FF9933; line-height:1; display:block; }
  .bjp-hl { font-family:'Outfit',sans-serif; font-size:0.6em; font-weight:500; color:rgba(255,255,255,0.32); margin-top:3px; display:block; }

  .bjp-hero-ctas {
    display:flex; flex-wrap:wrap; gap:12px;
    animation: fu 0.8s ease 0.78s both;
  }

  /* ── RIGHT PHOTO ── */
  .bjp-hero-right {
    display:flex; justify-content:center; align-items:center;
    position:relative; z-index:1;
    padding: 30px 10px;
    animation: hRight 0.9s ease 0.3s both;
  }
  @keyframes hRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }

  .bjp-frame {
    position:relative;
    width: clamp(280px, 34vw, 420px);
    height: clamp(280px, 34vw, 420px);
    display:flex; align-items:center; justify-content:center;
    margin: 20px auto;
  }

  /* aurora ring */
  .bjp-ring-a {
    position:absolute; inset:-14px; border-radius:50%;
    background: conic-gradient(
      from 0deg,
      #FF6B00 0%, #FF9933 18%, #D4AF37 35%,
      #FFF3C0 45%, #D4AF37 55%, #FF9933 72%,
      #FF6B00 85%, #FF9933 100%
    );
    animation: rSpin 7s linear infinite; opacity:0.95;
  }
  .bjp-ring-a::after {
    content:''; position:absolute; inset:7px;
    border-radius:50%; background:#07060f;
  }
  @keyframes rSpin { to { transform:rotate(360deg); } }

  .bjp-ring-b {
    position:absolute; inset:-6px; border-radius:50%;
    background: conic-gradient(
      from 90deg,
      transparent 0%, rgba(255,153,51,0.5) 25%,
      transparent 50%, rgba(212,175,55,0.35) 75%, transparent 100%
    );
    animation: rSpin 4s linear infinite reverse;
    filter:blur(8px);
  }

  .bjp-halo {
    position:absolute; inset:-50px; border-radius:50%;
    background: radial-gradient(circle, transparent 36%, rgba(255,153,51,0.1) 50%, rgba(255,107,0,0.06) 62%, transparent 72%);
    animation: hBr 3.5s ease-in-out infinite;
  }
  @keyframes hBr { 0%,100%{opacity:0.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }

  .bjp-spark {
    position:absolute; inset:0; border-radius:50%;
    animation: rSpin 10s linear infinite;
  }
  .bjp-spark::before {
    content:''; position:absolute; width:10px; height:10px; border-radius:50%;
    top:-5px; left:50%; transform:translateX(-50%);
    background:#D4AF37;
    box-shadow:0 0 8px 3px rgba(212,175,55,0.9), 0 0 18px 6px rgba(212,175,55,0.4);
  }
  .bjp-spark::after {
    content:''; position:absolute; width:7px; height:7px; border-radius:50%;
    bottom:-3px; right:20%;
    background:#FF9933;
    box-shadow:0 0 6px 2px rgba(255,153,51,0.9);
  }

  .bjp-photo {
    position:relative; z-index:2;
    width:86%; height:86%;
    border-radius:50%; object-fit:cover; object-position:top center;
    display:block;
  }

  /* floating cards */
  .bjp-fc {
    position:absolute; z-index:4;
    background:rgba(7,6,15,0.92);
    border:1px solid rgba(255,153,51,0.3);
    border-radius:14px; padding:10px 16px;
    backdrop-filter:blur(16px);
    box-shadow:0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,153,51,0.08);
  }
  .bjp-fc.bl {
    bottom:-2%; left:-6%;
    animation: fcA 4s ease-in-out infinite;
  }
  .bjp-fc.tr {
    top:2%; right:-6%;
    background:linear-gradient(135deg, #FF6B00, #FF9933);
    border:none; box-shadow:0 8px 28px rgba(255,107,0,0.45);
    animation: fcB 5s ease-in-out infinite; text-align:center;
  }
  @keyframes fcA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fcB { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-7px) rotate(1deg)} }
  .bjp-fc-label { font-family:'Outfit',sans-serif; font-size:0.63em; font-weight:600; color:rgba(255,153,51,0.7); display:block; }
  .bjp-fc-val   { font-family:'Outfit',sans-serif; font-size:0.88em; font-weight:800; color:#fff; margin-top:2px; display:block; }
  .bjp-fc-emoji { font-size:1.4em; display:block; }
  .bjp-fc-role  { font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:800; color:#fff; margin-top:3px; white-space:nowrap; }

  /* ornaments */
  .bjp-orn {
    position:absolute; z-index:3; font-size:1em;
    filter:drop-shadow(0 0 6px rgba(255,153,51,0.7));
    animation: ornF 3.5s ease-in-out infinite;
  }
  .bjp-orn.tl { top:3%;  left:10%;  animation-delay:0s; }
  .bjp-orn.tr { top:3%;  right:10%; animation-delay:0.8s; }
  .bjp-orn.bl { bottom:3%; left:10%;  animation-delay:1.6s; }
  .bjp-orn.br { bottom:3%; right:10%; animation-delay:2.4s; }
  @keyframes ornF { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-5px) scale(1.12)} }

  /* responsive */
  @media (max-width:991px) {
    .bjp-fc.bl { left:0; bottom:-6%; }
    .bjp-fc.tr { right:0; top:-6%; }
    .bjp-frame { width:clamp(240px, 58vw, 340px); height:clamp(240px, 58vw, 340px); }
    .bjp-hero-right { padding: 50px 10px 20px; }
  }
  @media (max-width:767px) {
    .bjp-hero-name  { font-size:2.5em; }
    .bjp-hero-stats { flex-wrap:wrap; }
    .bjp-hero       { padding:100px 0 50px; }
  }
`;

function Home() {
  useEffect(() => {
    if (!document.getElementById("bjp-home-s")) {
      const t = document.createElement("style");
      t.id = "bjp-home-s";
      t.innerHTML = S;
      document.head.appendChild(t);
    }
    return () => {
      document.getElementById("bjp-home-s")?.remove();
    };
  }, []);

  return (
    <>
      <section className="bjp-hero">
        <div className="bjp-hero-orb1" />
        <div className="bjp-hero-orb2" />
        <Particle />
        <Container>
          <Row className="align-items-center">
            {/* LEFT */}
            <Col lg={6} md={12} className="bjp-hero-left mb-5 mb-lg-0">
              <div className="bjp-badge">
                <img src={bjpLogo} alt="BJP" />
                <span>भारतीय जनता पार्टी · BJP</span>
              </div>
              <h1 className="bjp-hero-name">
                Vikram Singh
                <br />
                <span className="sf">Chauhan</span>
              </h1>
              <div className="bjp-hero-desig">
                <span className="bjp-hero-dot" />
                Deputy Chief Minister · Madhya Pradesh
              </div>
              <div className="bjp-hero-type">
                <Type />
              </div>
              <p className="bjp-hero-motto">
                "विकास की राह पर, जनता के साथ हमेशा"
              </p>
              <div className="bjp-hero-stats">
                {[
                  ["47L+", "Followers"],
                  ["58K+", "Villages"],
                  ["3×", "MLA"],
                  ["20+", "Yrs"],
                ].map(([n, l]) => (
                  <div className="bjp-hero-stat" key={l}>
                    <span className="bjp-hn">{n}</span>
                    <span className="bjp-hl">{l}</span>
                  </div>
                ))}
              </div>
              <div className="bjp-hero-ctas">
                <Link to="/vision" className="bjp-btn-primary">
                  🏛️ जानिए विजन
                </Link>
                <Link to="/journey" className="bjp-btn-outline">
                  📖 Journey
                </Link>
              </div>
            </Col>

            {/* RIGHT */}
            <Col lg={6} md={12} className="bjp-hero-right">
              <div className="bjp-frame">
                <div className="bjp-halo" />
                <div className="bjp-ring-b" />
                <div className="bjp-ring-a" />
                <div className="bjp-spark" />
                <img
                  src={politicianImg}
                  alt="Vikram Singh Chauhan"
                  className="bjp-photo"
                />
                <span className="bjp-orn tl">🪷</span>
                <span className="bjp-orn tr">🪷</span>
                <span className="bjp-orn bl">🪷</span>
                <span className="bjp-orn br">🪷</span>
                <div className="bjp-fc bl">
                  <span className="bjp-fc-label">📍 Constituency</span>
                  <span className="bjp-fc-val">Bhopal North, MP</span>
                </div>
                <div className="bjp-fc tr">
                  <span className="bjp-fc-emoji">🏛️</span>
                  <span className="bjp-fc-role">Deputy CM</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FUN QUIZ SECTION */}
      <CitizenQuiz />
    </>
  );
}

export default Home;
