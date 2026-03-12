import React, { useEffect, useRef } from "react";
import JanAwaaz from "./JanAwaaz";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,800&family=Tiro+Devanagari+Hindi&display=swap');

  /* ── JOURNEY PAGE ── */
  .jny-page {
    min-height: 100vh;
    padding: 110px 0 80px;
    position: relative; overflow: hidden;
  }
  .jny-page::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(ellipse 55% 55% at 0% 30%,  rgba(0,85,165,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 45% 45% at 100% 70%, rgba(19,136,8,0.05) 0%, transparent 55%);
  }

  .jny-wrap { max-width:1100px; margin:0 auto; padding:0 24px; }

  /* header */
  .jny-super {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    letter-spacing:3px; text-transform:uppercase;
    color:rgba(0,85,165,0.55); margin-bottom:12px;
  }
  .jny-super::before,.jny-super::after { content:''; display:block; width:36px; height:1px; background:rgba(0,85,165,0.3); }

  .jny-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2em,4vw,3em); font-weight:900; color:#fff;
    margin-bottom:10px; letter-spacing:-0.5px;
  }
  .jny-title span { color:#0055A5; }
  .jny-sub {
    font-family:'Outfit',sans-serif; font-size:0.9em;
    color:rgba(255,255,255,0.35); max-width:480px; line-height:1.72;
    margin-bottom:72px;
  }

  /* ── ZIGZAG TIMELINE ── */
  .jny-timeline { position:relative; }

  /* center spine */
  .jny-spine {
    position:absolute; left:50%; top:0; bottom:0;
    width:2px; transform:translateX(-50%);
    background:linear-gradient(180deg, rgba(0,85,165,0.5) 0%, rgba(19,136,8,0.3) 60%, transparent 100%);
  }
  @media(max-width:768px) { .jny-spine { left:20px; } }

  .jny-item {
    display:grid; grid-template-columns:1fr 60px 1fr;
    gap:0; margin-bottom:60px; position:relative;
    align-items:center;
  }
  .jny-item:last-child { margin-bottom:0; }

  /* even items: content right, empty left */
  .jny-item.even .jny-content { grid-column:3; grid-row:1; }
  .jny-item.even .jny-node   { grid-column:2; grid-row:1; }
  .jny-item.even .jny-empty  { grid-column:1; grid-row:1; }

  /* odd items: content left, empty right */
  .jny-item.odd  .jny-content { grid-column:1; grid-row:1; }
  .jny-item.odd  .jny-node   { grid-column:2; grid-row:1; }
  .jny-item.odd  .jny-empty  { grid-column:3; grid-row:1; }

  .jny-empty { min-height:10px; }

  /* center node */
  .jny-node {
    display:flex; flex-direction:column; align-items:center; gap:8px;
    z-index:2; position:relative;
  }
  .jny-icon {
    width:52px; height:52px; border-radius:50%; flex-shrink:0;
    background:rgba(3,9,22,0.95);
    border:2px solid rgba(0,85,165,0.4);
    display:flex; align-items:center; justify-content:center; font-size:1.2em;
    box-shadow:0 0 0 6px rgba(0,85,165,0.07), 0 0 0 12px rgba(0,85,165,0.03);
    transition:all 0.3s ease;
  }
  .jny-item:hover .jny-icon {
    border-color:rgba(0,85,165,0.8);
    box-shadow:0 0 0 6px rgba(0,85,165,0.12), 0 0 20px rgba(0,85,165,0.3);
  }
  .jny-year {
    font-family:'Outfit',sans-serif; font-size:0.62em; font-weight:800;
    color:#0055A5; letter-spacing:1.5px; white-space:nowrap;
  }

  /* content card */
  .jny-content {
    padding:22px 26px; border-radius:18px;
    background:rgba(255,255,255,0.025);
    border:1px solid rgba(0,85,165,0.1);
    position:relative; overflow:hidden;
    transition:all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor:default;
  }
  .jny-content::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg, rgba(0,85,165,0.06) 0%, transparent 60%);
    opacity:0; transition:opacity 0.35s ease;
  }
  .jny-item:hover .jny-content {
    border-color:rgba(0,85,165,0.3);
    box-shadow:0 16px 40px rgba(0,85,165,0.12);
    transform:scale(1.02);
  }
  .jny-item:hover .jny-content::before { opacity:1; }

  /* connector arrow */
  .jny-item.odd  .jny-content::after {
    content:''; position:absolute; right:-10px; top:50%;
    transform:translateY(-50%);
    border:10px solid transparent;
    border-left-color:rgba(0,85,165,0.15);
  }
  .jny-item.even .jny-content::after {
    content:''; position:absolute; left:-10px; top:50%;
    transform:translateY(-50%);
    border:10px solid transparent;
    border-right-color:rgba(0,85,165,0.15);
  }

  .jny-ctag {
    display:inline-flex; align-items:center; gap:6px;
    padding:3px 10px; border-radius:20px;
    background:rgba(0,85,165,0.1); border:1px solid rgba(0,85,165,0.2);
    font-family:'Outfit',sans-serif; font-size:0.62em; font-weight:700;
    color:#0055A5; letter-spacing:1px; text-transform:uppercase; margin-bottom:10px;
  }
  .jny-ctitle {
    font-family:'Outfit',sans-serif; font-weight:800; color:#fff;
    font-size:1.05em; margin-bottom:6px; line-height:1.3;
  }
  .jny-cdesc {
    font-family:'Outfit',sans-serif; font-size:0.82em;
    color:rgba(255,255,255,0.4); line-height:1.65;
  }
  .jny-cbadge {
    display:inline-flex; align-items:center; gap:5px; margin-top:10px;
    padding:4px 10px; border-radius:8px;
    background:rgba(19,136,8,0.08); border:1px solid rgba(19,136,8,0.2);
    font-family:'Outfit',sans-serif; font-size:0.68em; font-weight:700; color:#138808;
  }

  /* about left column */
  .jny-about-col {
    position:sticky; top:120px; align-self:flex-start;
  }
  .jny-quote-block {
    padding:28px; border-radius:20px; margin-bottom:24px;
    background:rgba(0,85,165,0.06);
    border:1px solid rgba(0,85,165,0.15);
    border-left:4px solid #0055A5;
  }
  .jny-q-text {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:1em; color:rgba(255,255,255,0.65);
    line-height:1.7; font-style:italic; margin-bottom:10px;
  }
  .jny-q-author {
    font-family:'Outfit',sans-serif; font-size:0.75em;
    font-weight:700; color:#0055A5;
  }

  /* mobile */
  @media(max-width:768px) {
    .jny-spine { display:none; }
    .jny-item  { grid-template-columns:40px 1fr; grid-template-rows:auto; gap:0 16px; }
    .jny-item.odd  .jny-content,
    .jny-item.even .jny-content { grid-column:2; grid-row:1; }
    .jny-item.odd  .jny-node,
    .jny-item.even .jny-node    { grid-column:1; grid-row:1; }
    .jny-item.odd  .jny-empty,
    .jny-item.even .jny-empty   { display:none; }
    .jny-icon { width:38px; height:38px; font-size:1em; }
    .jny-item.odd  .jny-content::after,
    .jny-item.even .jny-content::after { display:none; }
    .jny-item:hover .jny-content { transform:none; }
  }
`;

const TIMELINE = [
  {
    yr: "2006",
    icon: "🌿",
    tag: "Beginning",
    title: "Joined Indian National Congress",
    desc: "Began grassroots organizing in Jaipur Central. Door-to-door campaigning, community building from the ground up.",
    badge: "Foundation Year",
  },
  {
    yr: "2008",
    icon: "🗳️",
    tag: "First Victory",
    title: "Elected MLA — Jaipur Central",
    desc: "Won first MLA election with an 18,000+ vote margin, becoming one of the youngest legislators in Rajasthan.",
    badge: "18,000+ Margin",
  },
  {
    yr: "2012",
    icon: "🏛️",
    tag: "Leadership",
    title: "District Congress President",
    desc: "Appointed District Congress Committee President, Jaipur — overseeing party operations across 12 assembly segments.",
    badge: "12 Segments",
  },
  {
    yr: "2014",
    icon: "⚡",
    tag: "State Level",
    title: "RPCC State Committee Member",
    desc: "Elected to Rajasthan Pradesh Congress Committee executive body, shaping party policy at the state level.",
    badge: "State Policy",
  },
  {
    yr: "2018",
    icon: "🏆",
    tag: "Re-Election",
    title: "Re-elected MLA — Stronger Mandate",
    desc: "Second consecutive MLA victory with an even stronger 27,000+ vote margin — a testament to relentless public service.",
    badge: "27,000+ Margin",
  },
  {
    yr: "2020",
    icon: "👩",
    tag: "Milestone",
    title: "Mahila Shakti Abhiyan Launched",
    desc: "Founded Rajasthan's most ambitious women's empowerment program — skill training, legal aid, and micro-credit across 500+ villages.",
    badge: "500+ Villages",
  },
  {
    yr: "2023",
    icon: "👑",
    tag: "Present",
    title: "Leader of Opposition, Rajasthan",
    desc: "Appointed Leader of Opposition in Rajasthan Legislative Assembly — holding the government accountable for every citizen.",
    badge: "Current Position",
  },
];

function Home2() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const id = "jny-css";
    if (!document.getElementById(id)) {
      const t = document.createElement("style");
      t.id = id;
      t.innerHTML = CSS;
      document.head.appendChild(t);
    }
    // scroll animation
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 },
    );
    itemRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => {
      obs.disconnect();
      document.getElementById("jny-css")?.remove();
    };
  }, []);

  return (
    <>
      <section className="jny-page">
        <div className="jny-wrap">
          <div style={{ textAlign: "center" }}>
            <div className="jny-super">Political Journey</div>
            <h1 className="jny-title">
              A Story of <span>Service & Struggle</span>
            </h1>
            <p className="jny-sub" style={{ margin: "0 auto 72px" }}>
              From a grassroots worker to Leader of Opposition — 18 years of
              unwavering dedication to the people of Rajasthan.
            </p>
          </div>

          <div className="jny-timeline">
            <div className="jny-spine" />
            {TIMELINE.map((t, i) => (
              <div
                key={t.yr}
                className={`jny-item ${i % 2 === 0 ? "odd" : "even"}`}
                ref={(el) => (itemRefs.current[i] = el)}
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="jny-content">
                      <span className="jny-ctag">{t.tag}</span>
                      <div className="jny-ctitle">{t.title}</div>
                      <div className="jny-cdesc">{t.desc}</div>
                      <span className="jny-cbadge">✦ {t.badge}</span>
                    </div>
                    <div className="jny-node">
                      <div className="jny-icon">{t.icon}</div>
                      <div className="jny-year">{t.yr}</div>
                    </div>
                    <div className="jny-empty" />
                  </>
                ) : (
                  <>
                    <div className="jny-empty" />
                    <div className="jny-node">
                      <div className="jny-icon">{t.icon}</div>
                      <div className="jny-year">{t.yr}</div>
                    </div>
                    <div className="jny-content">
                      <span className="jny-ctag">{t.tag}</span>
                      <div className="jny-ctitle">{t.title}</div>
                      <div className="jny-cdesc">{t.desc}</div>
                      <span className="jny-cbadge">✦ {t.badge}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <JanAwaaz />
    </>
  );
}

export default Home2;
