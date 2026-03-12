import React, { useEffect, useRef, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');

  .ach-page {
    min-height:100vh; padding:110px 0 80px;
    position:relative; overflow:hidden;
  }
  .ach-page::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 55% 50% at 50% 20%, rgba(0,85,165,0.06) 0%, transparent 60%);
  }

  .ach-wrap { max-width:1100px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }

  /* header */
  .ach-super {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    letter-spacing:3px; text-transform:uppercase; color:rgba(0,85,165,0.55); margin-bottom:12px;
  }
  .ach-super::before,.ach-super::after { content:''; display:block; width:36px; height:1px; background:rgba(0,85,165,0.3); }
  .ach-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2em,4vw,3em); font-weight:900; color:#fff; margin-bottom:10px;
  }
  .ach-title span { color:#0055A5; }
  .ach-sub {
    font-family:'Outfit',sans-serif; font-size:0.9em;
    color:rgba(255,255,255,0.35); max-width:520px; line-height:1.72; margin-bottom:60px;
  }

  /* ── IMPACT COUNTER GRID ── */
  .ach-impact {
    display:grid; grid-template-columns:repeat(4,1fr);
    gap:0; margin-bottom:60px;
    border:1px solid rgba(0,85,165,0.12);
    border-radius:20px; overflow:hidden;
  }
  .ach-imp {
    padding:32px 20px; text-align:center;
    border-right:1px solid rgba(0,85,165,0.1);
    position:relative; overflow:hidden;
    transition:all 0.3s ease;
  }
  .ach-imp:last-child { border-right:none; }
  .ach-imp::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg, rgba(0,85,165,0.06) 0%, transparent 70%);
    opacity:0; transition:opacity 0.3s ease;
  }
  .ach-imp:hover::before { opacity:1; }
  .ach-imp:hover { background:rgba(0,85,165,0.04); }
  .ach-imp-icon { font-size:1.8em; display:block; margin-bottom:10px; }
  .ach-imp-n {
    font-family:'Outfit',sans-serif; font-size:2.4em; font-weight:900;
    line-height:1; display:block; margin-bottom:5px;
    background:linear-gradient(135deg,#4A9EDB,#0055A5);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .ach-imp-l { font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:600; color:rgba(255,255,255,0.3); }

  /* ── MAGAZINE GRID ── */
  .ach-grid {
    display:grid; grid-template-columns:1.4fr 1fr;
    gap:24px; margin-bottom:32px;
  }

  /* big featured award */
  .ach-featured {
    padding:32px; border-radius:22px;
    background:linear-gradient(135deg, rgba(0,53,128,0.2) 0%, rgba(0,85,165,0.08) 100%);
    border:1px solid rgba(0,85,165,0.25);
    position:relative; overflow:hidden;
    transition:all 0.35s ease;
  }
  .ach-featured::before {
    content:'"'; position:absolute; right:20px; top:-10px;
    font-size:8em; font-family:serif; font-weight:900;
    color:rgba(0,85,165,0.06); line-height:1; pointer-events:none;
  }
  .ach-featured:hover {
    border-color:rgba(0,85,165,0.45);
    box-shadow:0 20px 50px rgba(0,85,165,0.15);
    transform:translateY(-4px);
  }
  .ach-feat-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:5px 14px; border-radius:20px;
    background:rgba(255,153,51,0.1); border:1px solid rgba(255,153,51,0.25);
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    color:#FF9933; letter-spacing:1px; text-transform:uppercase; margin-bottom:20px;
  }
  .ach-feat-icon { font-size:2.8em; display:block; margin-bottom:14px; }
  .ach-feat-yr { font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:700; letter-spacing:2px; color:#0055A5; text-transform:uppercase; margin-bottom:6px; }
  .ach-feat-name { font-family:'Playfair Display',serif; font-size:1.4em; font-weight:900; color:#fff; margin-bottom:8px; line-height:1.25; }
  .ach-feat-by { font-family:'Outfit',sans-serif; font-size:0.82em; color:rgba(255,255,255,0.4); }

  /* small awards stack */
  .ach-stack { display:flex; flex-direction:column; gap:14px; }
  .ach-award-sm {
    padding:18px 20px; border-radius:16px;
    background:rgba(255,255,255,0.025);
    border:1px solid rgba(0,85,165,0.1);
    display:flex; align-items:center; gap:14px;
    transition:all 0.3s ease;
  }
  .ach-award-sm:hover {
    background:rgba(0,85,165,0.06);
    border-color:rgba(0,85,165,0.28);
    transform:translateX(4px);
  }
  .ach-asm-icon {
    width:44px; height:44px; border-radius:12px; flex-shrink:0;
    background:rgba(0,85,165,0.1); border:1px solid rgba(0,85,165,0.2);
    display:flex; align-items:center; justify-content:center; font-size:1.15em;
  }
  .ach-asm-yr  { font-family:'Outfit',sans-serif; font-size:0.65em; font-weight:700; color:#0055A5; letter-spacing:2px; text-transform:uppercase; margin-bottom:2px; }
  .ach-asm-name{ font-family:'Outfit',sans-serif; font-weight:800; color:#fff; font-size:0.9em; margin-bottom:2px; }
  .ach-asm-by  { font-family:'Outfit',sans-serif; font-size:0.74em; color:rgba(255,255,255,0.32); }

  /* second row */
  .ach-grid2 {
    display:grid; grid-template-columns:1fr 1.4fr;
    gap:24px; margin-bottom:32px;
  }

  /* positions held */
  .ach-pos-list { display:flex; flex-direction:column; gap:10px; }
  .ach-pos {
    padding:16px 18px; border-radius:14px;
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(0,85,165,0.08);
    display:flex; align-items:center; gap:14px;
    transition:all 0.3s ease;
  }
  .ach-pos:hover { background:rgba(0,85,165,0.05); border-color:rgba(0,85,165,0.22); transform:translateX(4px); }
  .ach-pos-dot { width:10px; height:10px; border-radius:50%; background:#0055A5; flex-shrink:0; box-shadow:0 0 8px rgba(0,85,165,0.6); }
  .ach-pos-yr  { font-family:'Outfit',sans-serif; font-size:0.68em; font-weight:700; color:#0055A5; width:55px; flex-shrink:0; }
  .ach-pos-name{ font-family:'Outfit',sans-serif; font-weight:700; color:rgba(255,255,255,0.75); font-size:0.86em; }

  /* pledge card */
  .ach-pledge {
    padding:32px; border-radius:22px; text-align:center;
    background:linear-gradient(135deg, rgba(19,136,8,0.08) 0%, rgba(0,85,165,0.06) 100%);
    border:1px solid rgba(0,85,165,0.15);
    display:flex; flex-direction:column; justify-content:center;
  }
  .ach-pledge-icon { font-size:2.5em; margin-bottom:14px; }
  .ach-pledge-txt {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:1em; color:rgba(255,255,255,0.65);
    line-height:1.7; font-style:italic; margin-bottom:10px;
  }
  .ach-pledge-auth { font-family:'Outfit',sans-serif; font-size:0.78em; font-weight:700; color:#0055A5; }

  /* bottom full-width strip */
  .ach-strip {
    padding:28px 32px; border-radius:18px;
    background:rgba(255,255,255,0.025);
    border:1px solid rgba(0,85,165,0.1);
    display:flex; align-items:center; gap:20px; flex-wrap:wrap;
  }
  .ach-strip-label { font-family:'Outfit',sans-serif; font-size:0.82em; font-weight:700; color:rgba(255,255,255,0.5); flex-shrink:0; }
  .ach-strip-tags { display:flex; flex-wrap:wrap; gap:8px; }
  .ach-tag {
    padding:6px 14px; border-radius:20px;
    background:rgba(0,85,165,0.08); border:1px solid rgba(0,85,165,0.18);
    font-family:'Outfit',sans-serif; font-size:0.78em; font-weight:600; color:rgba(255,255,255,0.55);
    transition:all 0.25s ease;
  }
  .ach-tag:hover { background:rgba(0,85,165,0.15); color:#fff; }

  @media(max-width:768px) {
    .ach-impact { grid-template-columns:repeat(2,1fr); }
    .ach-grid,.ach-grid2 { grid-template-columns:1fr; }
  }
  @media(max-width:480px) { .ach-impact { grid-template-columns:repeat(2,1fr); } }
`;

const STATS = [
  { icon: "👩", target: 500000, suffix: "5L+", label: "Women Empowered" },
  { icon: "🗳️", target: 2, suffix: "2×", label: "MLA Victories" },
  { icon: "🏫", target: 100, suffix: "100+", label: "Schools Built" },
  { icon: "📅", target: 18, suffix: "18+", label: "Years of Service" },
];

const AWARDS = [
  {
    yr: "2022",
    icon: "👩‍💼",
    name: "Outstanding Woman Leader",
    by: "National Women's Political Forum",
  },
  {
    yr: "2021",
    icon: "🌿",
    name: "Mahila Shakti Samman",
    by: "Government of Rajasthan",
  },
  {
    yr: "2019",
    icon: "📚",
    name: "Shiksha Ratna Award",
    by: "Rajasthan Education Foundation",
  },
  {
    yr: "2018",
    icon: "🧑‍🌾",
    name: "Kisan Mitra Samman",
    by: "Rajasthan Kisan Sangh",
  },
  {
    yr: "2015",
    icon: "🎖️",
    name: "Young Leader of the Year",
    by: "INC National Committee",
  },
];

const POSITIONS = [
  { yr: "2023–", name: "Leader of Opposition, Rajasthan Assembly" },
  { yr: "2020–", name: "National General Secretary, INC" },
  { yr: "2018–", name: "Chairperson, RPCC Women's Wing" },
  { yr: "2014", name: "Member, RPCC Executive Committee" },
  { yr: "2012", name: "District President, INC Jaipur" },
  { yr: "2008", name: "MLA, Jaipur Central" },
];

const TAGS = [
  "Women Empowerment",
  "Farmer Rights",
  "Education Reform",
  "RTI Activism",
  "Anti-Corruption",
  "Youth Policy",
  "Rajasthan Pride",
  "Jan Awaaz",
];

function ResumeNew() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sRef = useRef(null);

  useEffect(() => {
    const id = "ach-css";
    if (!document.getElementById(id)) {
      const t = document.createElement("style");
      t.id = id;
      t.innerHTML = CSS;
      document.head.appendChild(t);
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        STATS.forEach((s, i) => {
          let f = 0;
          const step = () => {
            f++;
            const pct = Math.min(f / 70, 1);
            const ease = 1 - (1 - pct) ** 3;
            setCounts((prev) => {
              const n = [...prev];
              n[i] = Math.round(s.target * ease);
              return n;
            });
            if (f < 70) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), i * 120);
        });
        obs.disconnect();
      },
      { threshold: 0.3 },
    );
    if (sRef.current) obs.observe(sRef.current);
    return () => {
      obs.disconnect();
      document.getElementById("ach-css")?.remove();
    };
  }, []);

  function fmt(i, v) {
    const s = STATS[i];
    if (v >= s.target) return s.suffix;
    if (s.target >= 100000)
      return v >= 10000
        ? (v / 100000).toFixed(1) + "L+"
        : v >= 1000
          ? Math.floor(v / 1000) + "K"
          : v.toString();
    return v.toString();
  }

  return (
    <>
      <section className="ach-page" ref={sRef}>
        <div className="ach-wrap">
          <div style={{ textAlign: "center" }}>
            <div className="ach-super">Achievements</div>
            <h1 className="ach-title">
              Awards, <span>Honours & Positions</span>
            </h1>
            <p className="ach-sub" style={{ margin: "0 auto 60px" }}>
              A record of public service, recognition and party responsibility
              spanning nearly two decades of dedicated work for the people of
              Rajasthan.
            </p>
          </div>

          {/* Impact counters */}
          <div className="ach-impact">
            {STATS.map((s, i) => (
              <div className="ach-imp" key={s.label}>
                <span className="ach-imp-icon">{s.icon}</span>
                <span className="ach-imp-n">{fmt(i, counts[i])}</span>
                <span className="ach-imp-l">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Magazine row 1: featured + stack */}
          <div className="ach-grid">
            <div className="ach-featured">
              <div className="ach-feat-badge">🏆 Top Honour</div>
              <span className="ach-feat-icon">🏛️</span>
              <div className="ach-feat-yr">2023</div>
              <div className="ach-feat-name">Best Leader of Opposition</div>
              <div className="ach-feat-by">
                Rajasthan Press Club Annual Awards — Presented for exemplary
                legislative performance and accountability.
              </div>
            </div>

            <div className="ach-stack">
              {AWARDS.map((a) => (
                <div className="ach-award-sm" key={a.name}>
                  <div className="ach-asm-icon">{a.icon}</div>
                  <div>
                    <div className="ach-asm-yr">{a.yr}</div>
                    <div className="ach-asm-name">{a.name}</div>
                    <div className="ach-asm-by">{a.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Magazine row 2: positions + pledge */}
          <div className="ach-grid2">
            <div>
              <h3
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: "1em",
                  marginBottom: "18px",
                }}
              >
                🏛️ Party{" "}
                <span style={{ color: "#0055A5" }}>Positions Held</span>
              </h3>
              <div className="ach-pos-list">
                {POSITIONS.map((p) => (
                  <div className="ach-pos" key={p.name}>
                    <div className="ach-pos-dot" />
                    <div className="ach-pos-yr">{p.yr}</div>
                    <div className="ach-pos-name">{p.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ach-pledge">
              <div className="ach-pledge-icon">🕊️</div>
              <div className="ach-pledge-txt">
                "यह पुरस्कार मेरे नहीं,
                <br />
                उन लाखों महिलाओं, किसानों और युवाओं के हैं जिनके लिए मैंने लड़ाई
                लड़ी।"
              </div>
              <div className="ach-pledge-auth">— Priya Sharma Yadav</div>
            </div>
          </div>

          {/* Focus area tags */}
          <div className="ach-strip">
            <div className="ach-strip-label">Focus Areas</div>
            <div className="ach-strip-tags">
              {TAGS.map((t) => (
                <span className="ach-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResumeNew;
