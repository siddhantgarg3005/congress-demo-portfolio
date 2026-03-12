import React, { useState } from "react";
import workImg1 from "../../Assets/Projects/work-mahila.png";
import workImg2 from "../../Assets/Projects/work-kisan.png";
import workImg3 from "../../Assets/Projects/work-school.png";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,800&family=Tiro+Devanagari+Hindi&display=swap');

  .vis-page { min-height:100vh; padding:110px 0 80px; position:relative; overflow:hidden; }
  .vis-page::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(ellipse 55% 55% at 5% 30%, rgba(0,85,165,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 95% 70%, rgba(19,136,8,0.04) 0%, transparent 55%);
  }

  .vis-wrap { max-width:1100px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }

  /* ── HEADER ── */
  .vis-super {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    letter-spacing:3px; text-transform:uppercase; color:rgba(0,85,165,0.55); margin-bottom:12px;
  }
  .vis-super::before,.vis-super::after { content:''; display:block; width:36px; height:1px; background:rgba(0,85,165,0.3); }
  .vis-title { font-family:'Playfair Display',serif; font-size:clamp(2em,4vw,3em); font-weight:900; color:#fff; margin-bottom:10px; }
  .vis-title span { color:#0055A5; }
  .vis-sub { font-family:'Outfit',sans-serif; font-size:0.9em; color:rgba(255,255,255,0.35); max-width:500px; line-height:1.72; margin-bottom:60px; }

  /* ── HERO WORK CARD (expandable) ── */
  .vis-works { display:flex; flex-direction:column; gap:0; margin-bottom:60px; border-radius:22px; overflow:hidden; border:1px solid rgba(0,85,165,0.12); }

  .vis-work {
    display:grid; grid-template-columns:380px 1fr;
    cursor:pointer; position:relative; overflow:hidden;
    border-bottom:1px solid rgba(0,85,165,0.1);
    transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
    min-height:110px;
  }
  .vis-work:last-child { border-bottom:none; }
  .vis-work.open { grid-template-columns:360px 1fr; min-height:280px; }
  .vis-work:hover:not(.open) { background:rgba(0,85,165,0.04); }

  /* left img panel */
  .vis-work-img {
    position:relative; overflow:hidden;
    background:rgba(0,0,0,0.4);
  }
  .vis-work-img img {
    width:100%; height:100%; object-fit:cover;
    filter:brightness(0.55) saturate(0.8);
    transition:all 0.5s ease;
  }
  .vis-work.open  .vis-work-img img { filter:brightness(0.75) saturate(1.1); }
  .vis-work:hover .vis-work-img img { filter:brightness(0.65) saturate(0.9); }

  /* img overlay number */
  .vis-work-num {
    position:absolute; bottom:16px; left:16px;
    font-family:'Playfair Display',serif; font-size:3.5em; font-weight:900;
    color:rgba(255,255,255,0.08); line-height:1; pointer-events:none;
  }
  /* tag on img */
  .vis-work-img-tag {
    position:absolute; top:14px; left:14px;
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:20px;
    background:rgba(0,85,165,0.8); backdrop-filter:blur(8px);
    font-family:'Outfit',sans-serif; font-size:0.68em; font-weight:700; color:#fff;
  }

  /* right content panel */
  .vis-work-body {
    padding:24px 28px; display:flex; flex-direction:column; justify-content:center;
    position:relative;
  }
  .vis-work-top { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .vis-work-title { font-family:'Outfit',sans-serif; font-weight:900; color:#fff; font-size:1.1em; }
  .vis-work-arrow {
    width:36px; height:36px; border-radius:50%; flex-shrink:0;
    background:rgba(0,85,165,0.1); border:1px solid rgba(0,85,165,0.2);
    display:flex; align-items:center; justify-content:center;
    font-size:0.9em; transition:all 0.3s ease; color:rgba(255,255,255,0.5);
  }
  .vis-work.open .vis-work-arrow { background:#0055A5; border-color:#0055A5; color:#fff; transform:rotate(180deg); }
  .vis-work:hover .vis-work-arrow { background:rgba(0,85,165,0.2); }

  /* expandable content */
  .vis-work-expand { overflow:hidden; max-height:0; transition:max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease; opacity:0; }
  .vis-work.open .vis-work-expand { max-height:200px; opacity:1; transition:max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease 0.1s; }
  .vis-work-desc { font-family:'Outfit',sans-serif; font-size:0.83em; color:rgba(255,255,255,0.45); line-height:1.72; padding-top:12px; }

  /* stats inside */
  .vis-work-stats { display:flex; gap:20px; flex-wrap:wrap; padding-top:14px; }
  .vis-ws { font-family:'Outfit',sans-serif; font-size:0.82em; }
  .vis-ws strong { color:#0055A5; font-size:1.2em; font-weight:900; }
  .vis-ws span { color:rgba(255,255,255,0.3); margin-left:4px; }

  /* ── VISION TICKER ── */
  .vis-ticker-wrap {
    overflow:hidden; border-radius:14px; margin-bottom:48px;
    background:rgba(0,85,165,0.06); border:1px solid rgba(0,85,165,0.14);
    padding:14px 0; position:relative;
  }
  .vis-ticker-wrap::before,.vis-ticker-wrap::after {
    content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none;
  }
  .vis-ticker-wrap::before { left:0; background:linear-gradient(90deg,rgba(3,9,22,0.9),transparent); }
  .vis-ticker-wrap::after  { right:0; background:linear-gradient(-90deg,rgba(3,9,22,0.9),transparent); }
  .vis-ticker {
    display:flex; gap:0; width:max-content;
    animation:tickerScroll 25s linear infinite;
  }
  .vis-ticker:hover { animation-play-state:paused; }
  @keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .vis-tick-item {
    display:inline-flex; align-items:center; gap:8px; padding:0 28px;
    font-family:'Outfit',sans-serif; font-size:0.82em; font-weight:600;
    color:rgba(255,255,255,0.45); white-space:nowrap; border-right:1px solid rgba(0,85,165,0.15);
  }
  .vis-tick-item:last-child { border-right:none; }
  .vis-tick-dot { width:5px; height:5px; border-radius:50%; background:#0055A5; flex-shrink:0; }

  /* ── PILLARS GRID ── */
  .vis-pillars-title { font-family:'Outfit',sans-serif; font-weight:800; color:#fff; font-size:1.1em; text-align:center; margin-bottom:22px; }
  .vis-pillars-title span { color:#0055A5; }
  .vis-pillars { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:48px; }
  .vis-pillar {
    padding:22px 12px; border-radius:16px; text-align:center;
    background:rgba(255,255,255,0.02); border:1px solid rgba(0,85,165,0.09);
    transition:all 0.35s cubic-bezier(0.22,1,0.36,1); cursor:default;
  }
  .vis-pillar:hover { background:rgba(0,85,165,0.1); border-color:rgba(0,85,165,0.35); transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,85,165,0.15); }
  .vis-pillar-icon { font-size:1.8em; display:block; margin-bottom:8px; }
  .vis-pillar-name { font-family:'Outfit',sans-serif; font-weight:700; color:rgba(255,255,255,0.6); font-size:0.76em; line-height:1.3; }
  .vis-pillar:hover .vis-pillar-name { color:#fff; }

  /* ── CTA BLOCK ── */
  .vis-cta {
    padding:44px 40px; border-radius:22px; text-align:center;
    background:linear-gradient(135deg, rgba(0,53,128,0.22) 0%, rgba(0,85,165,0.1) 100%);
    border:1px solid rgba(0,85,165,0.22);
    box-shadow:inset 0 1px 0 rgba(0,85,165,0.12);
  }
  .vis-cta-title { font-family:'Playfair Display',serif; font-size:1.5em; font-weight:900; color:#fff; margin-bottom:10px; }
  .vis-cta-sub { font-family:'Outfit',sans-serif; font-size:0.88em; color:rgba(255,255,255,0.4); margin-bottom:22px; line-height:1.65; }
  .vis-cta-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 28px; border-radius:40px;
    background:linear-gradient(135deg,#003580,#0055A5);
    color:#fff; text-decoration:none;
    font-family:'Outfit',sans-serif; font-weight:700; font-size:0.9em;
    box-shadow:0 6px 24px rgba(0,85,165,0.4); transition:all 0.3s ease;
  }
  .vis-cta-btn:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(0,85,165,0.55); color:#fff; }

  @media(max-width:768px) {
    .vis-work,.vis-work.open { grid-template-columns:1fr; }
    .vis-work-img { height:160px; }
    .vis-pillars { grid-template-columns:repeat(3,1fr); }
  }
  @media(max-width:480px) {
    .vis-pillars { grid-template-columns:repeat(2,1fr); }
    .vis-cta { padding:28px 20px; }
  }
`;

const WORKS = [
  {
    tag: "👩 Women Empowerment",
    img: workImg1,
    num: "01",
    title: "Mahila Shakti Abhiyan",
    desc: "Rajasthan's most ambitious grassroots women empowerment program — skill development, micro-credit access, legal aid and 2,400 active self-help groups spanning 500+ villages across 8 districts.",
    stats: [
      { n: "5L+", l: "Women" },
      { n: "500+", l: "Villages" },
      { n: "2,400", l: "SHGs" },
      { n: "₹240Cr", l: "Credit" },
    ],
  },
  {
    tag: "👨‍🌾 Farmer Welfare",
    img: workImg2,
    num: "02",
    title: "Kisan Jan Andolan",
    desc: "A sustained fight in the Rajasthan Assembly for complete farmer loan waivers, fair MSP implementation across 12 crops, and irrigation network expansion — delivering real relief to 22 lakh farmers.",
    stats: [
      { n: "22L+", l: "Farmers" },
      { n: "12", l: "Crops" },
      { n: "₹800Cr", l: "Waived" },
      { n: "42", l: "Dams" },
    ],
  },
  {
    tag: "📚 Education & Youth",
    img: workImg3,
    num: "03",
    title: "Shiksha Samriddhi Mission",
    desc: "Pushed for 100+ new government schools, free textbooks & uniforms for girls up to Class 12, digital classrooms in 240 rural schools, and a Youth Employment Portal connecting graduates with 15,000+ jobs.",
    stats: [
      { n: "100+", l: "Schools" },
      { n: "3L+", l: "Girls" },
      { n: "15K+", l: "Jobs" },
      { n: "₹180Cr", l: "Invested" },
    ],
  },
];

const TICKERS = [
  "Mahila Shakti",
  "Kisan Nyay",
  "Free Education",
  "Healthcare For All",
  "Clean Villages",
  "Youth Jobs",
  "Anti-Corruption",
  "Environment",
  "Water Access",
  "Gram Swaraj",
  "Digital Rajasthan",
  "Jan Awaaz",
];
const PILLARS = [
  { icon: "👩", name: "Mahila Shakti" },
  { icon: "👨‍🌾", name: "Kisan Nyay" },
  { icon: "📚", name: "Shiksha" },
  { icon: "🏥", name: "Swasthya" },
  { icon: "🌱", name: "Paryavaran" },
  { icon: "⚖️", name: "Nyay" },
];

export default function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <style>{CSS}</style>
      <section className="vis-page">
        <div className="vis-wrap">
          <div style={{ textAlign: "center" }}>
            <div className="vis-super">Vision &amp; Work</div>
            <h1 className="vis-title">
              Promises Made. <span>Promises Kept.</span>
            </h1>
            <p className="vis-sub" style={{ margin: "0 auto 60px" }}>
              Three flagship missions that define Priya Sharma Yadav's
              relentless commitment — click each to explore the full story.
            </p>
          </div>

          {/* Accordion work cards */}
          <div className="vis-works">
            {WORKS.map((w, i) => (
              <div
                key={w.title}
                className={`vis-work${open === i ? " open" : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className="vis-work-img">
                  <img src={w.img} alt={w.title} />
                  <div className="vis-work-num">{w.num}</div>
                  <span className="vis-work-img-tag">{w.tag}</span>
                </div>
                <div className="vis-work-body">
                  <div className="vis-work-top">
                    <div className="vis-work-title">{w.title}</div>
                    <div className="vis-work-arrow">▾</div>
                  </div>
                  <div className="vis-work-expand">
                    <p className="vis-work-desc">{w.desc}</p>
                    <div className="vis-work-stats">
                      {w.stats.map((s) => (
                        <div className="vis-ws" key={s.l}>
                          <strong>{s.n}</strong>
                          <span>{s.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scrolling ticker */}
          <div className="vis-ticker-wrap">
            <div className="vis-ticker">
              {[...TICKERS, ...TICKERS].map((t, i) => (
                <div className="vis-tick-item" key={i}>
                  <div className="vis-tick-dot" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="vis-pillars-title">
            Our 6 Core <span>Vision Pillars</span>
          </div>
          <div className="vis-pillars">
            {PILLARS.map((p) => (
              <div className="vis-pillar" key={p.name}>
                <span className="vis-pillar-icon">{p.icon}</span>
                <div className="vis-pillar-name">{p.name}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="vis-cta">
            <div className="vis-cta-title">See the Full Record</div>
            <p className="vis-cta-sub">
              Explore awards, party positions, and the complete impact of 18
              years of dedicated service.
            </p>
            <a href="/achievements" className="vis-cta-btn">
              🏆 View Achievements
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
