import rahulImg from "../../Assets/Rahul.png";
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

  /* ── PHOTO MOMENT CARD ── */
  .ach-photo-card {
    border-radius:22px; overflow:hidden;
    border:1px solid rgba(0,85,165,0.25);
    position:relative;
    transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
    background:#030916;
    display:flex; flex-direction:column;
  }
  .ach-photo-card:hover {
    border-color:rgba(0,85,165,0.5);
    box-shadow:0 24px 60px rgba(0,85,165,0.2);
    transform:translateY(-5px);
  }

  /* top image area */
  .ach-photo-img-wrap {
    position:relative; overflow:hidden;
    height:240px; flex-shrink:0;
  }
  .ach-photo-img {
    width:100%; height:100%; object-fit:cover; object-position:center top;
    filter:brightness(0.82) saturate(1.05);
    transition:all 0.5s ease;
  }
  .ach-photo-card:hover .ach-photo-img { filter:brightness(0.95) saturate(1.15); transform:scale(1.04); }

  /* gradient overlay on image */
  .ach-photo-overlay {
    position:absolute; inset:0;
    background:linear-gradient(180deg,
      transparent 0%,
      rgba(3,9,22,0.1) 50%,
      rgba(3,9,22,0.85) 100%
    );
    pointer-events:none;
  }

  /* tricolor accent bar on top of image */
  .ach-photo-tricolor {
    position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, #FF9933 33.3%, #fff 33.3% 66.6%, #138808 66.6%);
    opacity:0.7;
  }

  /* "with" tag on image */
  .ach-photo-with {
    position:absolute; bottom:14px; left:14px;
    display:inline-flex; align-items:center; gap:8px;
    padding:7px 14px; border-radius:30px;
    background:rgba(3,9,22,0.88); backdrop-filter:blur(12px);
    border:1px solid rgba(0,85,165,0.35);
  }
  .ach-photo-with-avatar {
    width:28px; height:28px; border-radius:50%;
    background:linear-gradient(135deg,#0055A5,#003580);
    display:flex; align-items:center; justify-content:center;
    font-size:0.85em; flex-shrink:0;
    border:1.5px solid rgba(0,85,165,0.5);
  }
  .ach-photo-with-name {
    font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:700; color:#fff;
    white-space:nowrap;
  }
  .ach-photo-with-role {
    font-family:'Outfit',sans-serif; font-size:0.6em; color:rgba(255,255,255,0.45);
    display:block; margin-top:1px;
  }

  /* INC verified badge */
  .ach-photo-verified {
    position:absolute; top:14px; right:14px;
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:20px;
    background:rgba(0,85,165,0.85); backdrop-filter:blur(8px);
    font-family:'Outfit',sans-serif; font-size:0.65em; font-weight:700; color:#fff;
  }

  /* bottom text area */
  .ach-photo-body {
    padding:22px 24px 24px;
    background:linear-gradient(135deg, rgba(0,53,128,0.12) 0%, rgba(0,85,165,0.04) 100%);
    border-top:1px solid rgba(0,85,165,0.12);
  }
  .ach-photo-caption-tag {
    display:inline-flex; align-items:center; gap:7px;
    padding:4px 12px; border-radius:20px;
    background:rgba(255,153,51,0.1); border:1px solid rgba(255,153,51,0.25);
    font-family:'Outfit',sans-serif; font-size:0.65em; font-weight:700;
    color:#FF9933; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px;
  }
  .ach-photo-caption-title {
    font-family:'Playfair Display',serif; font-size:1.15em; font-weight:900;
    color:#fff; margin-bottom:7px; line-height:1.3;
  }
  .ach-photo-caption-desc {
    font-family:'Outfit',sans-serif; font-size:0.8em;
    color:rgba(255,255,255,0.38); line-height:1.65; margin-bottom:14px;
  }
  .ach-photo-meta {
    display:flex; align-items:center; gap:12px; flex-wrap:wrap;
  }
  .ach-photo-loc {
    display:flex; align-items:center; gap:5px;
    font-family:'Outfit',sans-serif; font-size:0.7em; color:rgba(0,85,165,0.7); font-weight:600;
  }
  .ach-photo-yr {
    font-family:'Outfit',sans-serif; font-size:0.68em; color:rgba(255,255,255,0.2);
    font-weight:600; letter-spacing:1px;
  }

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

          {/* Magazine row 1: photo moment card + stack */}
          <div className="ach-grid">
            <div className="ach-photo-card">
              {/* Image */}
              <div className="ach-photo-img-wrap">
                <img
                  src={rahulImg}
                  alt="Priya Sharma Yadav with Priyanka Gandhi"
                  className="ach-photo-img"
                />
                <div className="ach-photo-overlay" />
                <div className="ach-photo-tricolor" />

                {/* INC verified badge */}
                <div className="ach-photo-verified">🤚 INC Official</div>

                {/* With tag */}
                <div className="ach-photo-with">
                  <div className="ach-photo-with-avatar">🕊️</div>
                  <div>
                    <div className="ach-photo-with-name">
                      with Priyanka Gandhi Vadra
                    </div>
                    <span className="ach-photo-with-role">
                      Congress General Secretary · UP East
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption body */}
              <div className="ach-photo-body">
                <div className="ach-photo-caption-tag">📸 Party Moment</div>
                <div className="ach-photo-caption-title">
                  "जब नेतृत्व मिलता है, तो इतिहास बनता है"
                </div>
                <div className="ach-photo-caption-desc">
                  Priya Sharma Yadav with Priyanka Gandhi Vadra during the INC
                  Mahila Shakti Sammelan — a defining moment in Rajasthan's
                  Congress campaign for women's rights and rural empowerment.
                </div>
                <div className="ach-photo-meta">
                  <span className="ach-photo-loc">📍 Jaipur, Rajasthan</span>
                  <span className="ach-photo-yr">INC · 2023</span>
                </div>
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
