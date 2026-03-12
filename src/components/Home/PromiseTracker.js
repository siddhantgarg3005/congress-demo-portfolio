import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   वादा ट्रैकर  —  Vaada Tracker
   India's first politician promise tracker widget
───────────────────────────────────────────── */

const PROMISES = [
  {
    id: 1,
    category: "👩 Women",
    title: "Mahila Shakti Abhiyan",
    promise:
      "Launch Rajasthan's largest women empowerment program covering 500+ villages with skill training, micro-credit and legal aid.",
    status: "delivered",
    progress: 100,
    detail:
      "✅ 5 lakh women reached · 2,400 SHGs formed · ₹240Cr credit disbursed · 500+ villages covered",
    year: "2020",
  },
  {
    id: 2,
    category: "👨‍🌾 Farmers",
    title: "Kisan Loan Waiver Push",
    promise:
      "Fight in the Assembly for complete loan waivers for farmers and fair MSP across 12 crops.",
    status: "delivered",
    progress: 92,
    detail:
      "✅ ₹800Cr loans waived · 22L+ farmers benefited · 12 crops under MSP · 42 new irrigation dams",
    year: "2019",
  },
  {
    id: 3,
    category: "📚 Education",
    title: "100 New Govt Schools",
    promise:
      "Push for 100+ new government schools and free books + uniforms for girls up to Class 12.",
    status: "delivered",
    progress: 100,
    detail:
      "✅ 108 schools opened · 3L+ girls benefited · Digital classrooms in 240 schools · ₹180Cr invested",
    year: "2019",
  },
  {
    id: 4,
    category: "🏥 Health",
    title: "Free Mobile Health Clinics",
    promise:
      "Deploy 50 mobile health clinics across rural Jaipur Central for free checkups and medicines.",
    status: "progress",
    progress: 68,
    detail:
      "🔄 34 of 50 clinics deployed · 1.2L patients served so far · Target completion: Dec 2025",
    year: "2023",
  },
  {
    id: 5,
    category: "💧 Infrastructure",
    title: "24×7 Water in 200 Villages",
    promise:
      "Ensure round-the-clock piped drinking water access to 200 villages in Jaipur Central.",
    status: "progress",
    progress: 55,
    detail:
      "🔄 110 villages connected · Pipeline work ongoing · ₹60Cr sanctioned · Est. completion: 2026",
    year: "2023",
  },
  {
    id: 6,
    category: "👩‍💼 Women",
    title: "500 Women Entrepreneur Loans",
    promise:
      "Secure zero-interest startup loans for 500 women entrepreneurs through state co-operative banks.",
    status: "progress",
    progress: 78,
    detail:
      "🔄 390 loans disbursed · Avg ₹2.5L per entrepreneur · 12 new women-owned businesses launched",
    year: "2022",
  },
  {
    id: 7,
    category: "🎓 Youth",
    title: "Youth Employment Portal",
    promise:
      "Launch a digital portal connecting Rajasthan graduates with 15,000+ verified jobs statewide.",
    status: "progress",
    progress: 40,
    detail:
      "🔄 Portal live · 6,200 jobs listed · 1.8L registrations · Target 15K jobs by Q4 2025",
    year: "2024",
  },
  {
    id: 8,
    category: "🌱 Environment",
    title: "1 Crore Trees in Rajasthan",
    promise:
      "Lead a state-wide plantation drive to plant 1 crore trees across Rajasthan by 2025.",
    status: "planned",
    progress: 18,
    detail:
      "📋 18 lakh saplings planted so far · Campaign launched in 6 districts · Target: 2025",
    year: "2024",
  },
];

const STATUS_CONFIG = {
  delivered: {
    label: "Delivered ✅",
    color: "#27c93f",
    bg: "rgba(39,201,63,0.1)",
    border: "rgba(39,201,63,0.3)",
    glow: "rgba(39,201,63,0.25)",
  },
  progress: {
    label: "In Progress 🔄",
    color: "#FF9933",
    bg: "rgba(255,153,51,0.08)",
    border: "rgba(255,153,51,0.28)",
    glow: "rgba(255,153,51,0.2)",
  },
  planned: {
    label: "Planned 📋",
    color: "#4A9EDB",
    bg: "rgba(74,158,219,0.08)",
    border: "rgba(74,158,219,0.25)",
    glow: "rgba(74,158,219,0.2)",
  },
};

const CATEGORIES = [
  "All",
  "👩 Women",
  "👨‍🌾 Farmers",
  "📚 Education",
  "🏥 Health",
  "💧 Infrastructure",
  "🎓 Youth",
  "🌱 Environment",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&family=Tiro+Devanagari+Hindi&display=swap');

  /* ── SECTION ── */
  .pt-section {
    padding: 80px 0 100px;
    position: relative; overflow: hidden;
  }
  .pt-section::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 65% 50% at 20% 40%, rgba(0,85,165,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 50% 45% at 80% 65%, rgba(39,201,63,0.03) 0%, transparent 55%);
  }

  .pt-wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

  /* ── HEADER ── */
  .pt-header { text-align: center; margin-bottom: 48px; }
  .pt-supertag {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: rgba(0,85,165,0.55); margin-bottom: 14px;
  }
  .pt-supertag::before, .pt-supertag::after { content: ''; display: block; width: 36px; height: 1px; background: rgba(0,85,165,0.3); }

  .pt-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2em, 4.5vw, 3em); font-weight: 900;
    color: #fff; margin-bottom: 10px; letter-spacing: -0.5px;
  }
  .pt-title span { color: #0055A5; }
  .pt-sub {
    font-family: 'Outfit', sans-serif; font-size: 0.92em;
    color: rgba(255,255,255,0.35); max-width: 500px; margin: 0 auto; line-height: 1.68;
  }

  /* ── SCORE BANNER ── */
  .pt-score-banner {
    display: flex; align-items: center; gap: 0;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(0,85,165,0.14);
    border-radius: 20px; overflow: hidden;
    margin-bottom: 32px;
  }

  .pt-score-main {
    padding: 28px 36px; flex-shrink: 0; text-align: center;
    border-right: 1px solid rgba(0,85,165,0.1);
    background: linear-gradient(135deg, rgba(0,53,128,0.15) 0%, rgba(0,85,165,0.06) 100%);
    position: relative; overflow: hidden;
  }
  .pt-score-main::before {
    content: ''; position: absolute; inset: 0;
    background: conic-gradient(from 180deg, #0055A5 0%, rgba(0,85,165,0.1) 100%);
    opacity: 0.04;
  }
  .pt-score-ring-wrap {
    position: relative; width: 90px; height: 90px; margin: 0 auto 10px;
  }
  .pt-score-ring-bg {
    width: 90px; height: 90px; border-radius: 50%;
    border: 4px solid rgba(255,255,255,0.06);
    position: absolute; inset: 0;
  }
  .pt-score-ring-svg {
    position: absolute; inset: 0; transform: rotate(-90deg);
  }
  .pt-score-ring-circle {
    fill: none; stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 251.2;
    transition: stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1);
  }
  .pt-score-num {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif; font-size: 1.6em; font-weight: 900;
    color: #fff;
  }
  .pt-score-label {
    font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700;
    color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase;
  }

  /* score breakdown pills */
  .pt-score-pills {
    flex: 1; padding: 20px 28px;
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .pt-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 0.8em; font-weight: 700;
    flex-shrink: 0;
  }
  .pt-pill.green { background: rgba(39,201,63,0.1);  border: 1px solid rgba(39,201,63,0.25);  color: #27c93f; }
  .pt-pill.orange { background: rgba(255,153,51,0.08); border: 1px solid rgba(255,153,51,0.25); color: #FF9933; }
  .pt-pill.blue   { background: rgba(74,158,219,0.08); border: 1px solid rgba(74,158,219,0.22); color: #4A9EDB; }
  .pt-pill-dot { width: 8px; height: 8px; border-radius: 50%; }
  .pt-pill.green  .pt-pill-dot { background: #27c93f; }
  .pt-pill.orange .pt-pill-dot { background: #FF9933; }
  .pt-pill.blue   .pt-pill-dot { background: #4A9EDB; }

  .pt-score-cta {
    padding: 28px 28px 20px; flex-shrink: 0; text-align: center;
    border-left: 1px solid rgba(0,85,165,0.1);
    display: flex; flex-direction: column; justify-content: center; gap: 8px;
  }
  .pt-score-cta-text {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 0.82em; color: rgba(255,255,255,0.35); font-style: italic; line-height: 1.5;
  }
  .pt-accountability {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 20px;
    background: rgba(0,85,165,0.08); border: 1px solid rgba(0,85,165,0.2);
    font-family: 'Outfit', sans-serif; font-size: 0.72em; font-weight: 700;
    color: rgba(0,85,165,0.8); white-space: nowrap;
  }

  /* ── FILTER TABS ── */
  .pt-filters {
    display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;
  }
  .pt-filter {
    padding: 7px 16px; border-radius: 20px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    font-family: 'Outfit', sans-serif; font-size: 0.78em; font-weight: 600;
    color: rgba(255,255,255,0.45); cursor: pointer; transition: all 0.25s ease;
    white-space: nowrap;
  }
  .pt-filter:hover { background: rgba(0,85,165,0.1); border-color: rgba(0,85,165,0.25); color: rgba(255,255,255,0.75); }
  .pt-filter.active { background: rgba(0,85,165,0.18); border-color: rgba(0,85,165,0.4); color: #fff; }

  /* ── PROMISE GRID ── */
  .pt-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 16px; margin-bottom: 48px;
  }

  .pt-card {
    border-radius: 18px; overflow: hidden;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
  }
  .pt-card:hover { transform: translateY(-4px); }
  .pt-card.open  { border-color: transparent; }

  /* category stripe at top */
  .pt-card-stripe {
    height: 3px;
    transition: all 0.3s ease;
  }

  .pt-card-head {
    padding: 18px 20px 0;
    display: flex; align-items: flex-start; gap: 12px;
  }
  .pt-cat-badge {
    font-family: 'Outfit', sans-serif; font-size: 0.65em; font-weight: 700;
    letter-spacing: 0.5px; color: rgba(255,255,255,0.4);
    padding: 3px 10px; border-radius: 8px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    white-space: nowrap; flex-shrink: 0; margin-top: 2px;
  }
  .pt-status-badge {
    font-family: 'Outfit', sans-serif; font-size: 0.65em; font-weight: 700;
    padding: 3px 10px; border-radius: 8px; white-space: nowrap; margin-left: auto; flex-shrink: 0;
  }

  .pt-card-body { padding: 12px 20px 0; }
  .pt-card-title {
    font-family: 'Outfit', sans-serif; font-weight: 800; color: #fff;
    font-size: 0.98em; margin-bottom: 6px; line-height: 1.35;
  }
  .pt-card-promise {
    font-family: 'Outfit', sans-serif; font-size: 0.8em;
    color: rgba(255,255,255,0.38); line-height: 1.65;
  }

  /* progress bar */
  .pt-progress-area { padding: 14px 20px 0; }
  .pt-progress-top {
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700;
    color: rgba(255,255,255,0.35); margin-bottom: 7px;
  }
  .pt-progress-pct { font-weight: 900; }
  .pt-bar {
    height: 6px; border-radius: 3px;
    background: rgba(255,255,255,0.06); overflow: hidden;
  }
  .pt-bar-fill {
    height: 100%; border-radius: 3px;
    transition: width 1.2s cubic-bezier(0.22,1,0.36,1);
  }

  /* expandable detail */
  .pt-detail {
    overflow: hidden; max-height: 0;
    transition: max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease, padding 0.3s ease;
    opacity: 0; padding: 0 20px;
    font-family: 'Outfit', sans-serif; font-size: 0.8em;
    color: rgba(255,255,255,0.55); line-height: 1.7;
    border-top: 0px solid rgba(255,255,255,0.05);
  }
  .pt-card.open .pt-detail {
    max-height: 100px; opacity: 1; padding: 12px 20px 0;
    border-top-width: 1px;
  }

  /* footer row */
  .pt-card-footer {
    padding: 10px 20px 16px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pt-year {
    font-family: 'Outfit', sans-serif; font-size: 0.68em; font-weight: 600;
    color: rgba(255,255,255,0.2); letter-spacing: 1px;
  }
  .pt-expand-btn {
    font-size: 0.72em; color: rgba(255,255,255,0.3);
    font-family: 'Outfit', sans-serif; font-weight: 600;
    display: flex; align-items: center; gap: 4px;
    transition: all 0.25s ease;
  }
  .pt-expand-icon { transition: transform 0.35s ease; display: inline-block; }
  .pt-card.open .pt-expand-icon { transform: rotate(180deg); }
  .pt-card:hover .pt-expand-btn { color: rgba(255,255,255,0.6); }

  /* ── BOTTOM PLEDGE ── */
  .pt-pledge {
    padding: 40px; border-radius: 22px; text-align: center;
    background: linear-gradient(135deg, rgba(0,53,128,0.18) 0%, rgba(0,85,165,0.08) 50%, rgba(19,136,8,0.06) 100%);
    border: 1px solid rgba(0,85,165,0.2);
    position: relative; overflow: hidden;
  }
  .pt-pledge::before {
    content: '🤚'; position: absolute; right: 24px; bottom: -10px;
    font-size: 7em; opacity: 0.04; pointer-events: none; line-height: 1;
  }
  .pt-pledge-icon { font-size: 2.2em; display: block; margin-bottom: 14px; }
  .pt-pledge-title {
    font-family: 'Playfair Display', serif; font-size: 1.4em; font-weight: 900;
    color: #fff; margin-bottom: 8px;
  }
  .pt-pledge-text {
    font-family: 'Tiro Devanagari Hindi', serif; font-size: 0.95em;
    color: rgba(255,255,255,0.55); line-height: 1.72; font-style: italic;
    max-width: 420px; margin: 0 auto 18px;
  }
  .pt-pledge-author {
    font-family: 'Outfit', sans-serif; font-size: 0.8em; font-weight: 700; color: #0055A5;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .pt-score-banner { flex-direction: column; }
    .pt-score-main   { border-right: none; border-bottom: 1px solid rgba(0,85,165,0.1); }
    .pt-score-cta    { border-left: none; border-top: 1px solid rgba(0,85,165,0.1); }
  }
  @media (max-width: 680px) {
    .pt-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .pt-filters { gap: 6px; }
    .pt-pledge { padding: 28px 20px; }
  }
`;

function AnimatedRing({ pct }) {
  const ref = useRef(null);
  const r = 40;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && ref.current) {
          ref.current.style.strokeDashoffset = circ - (circ * pct) / 100;
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current.closest(".pt-score-ring-wrap"));
    return () => obs.disconnect();
  }, [circ, pct]);

  return (
    <svg
      className="pt-score-ring-svg"
      viewBox="0 0 90 90"
      width="90"
      height="90"
    >
      <circle
        cx="45"
        cy="45"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="4"
      />
      <circle
        ref={ref}
        cx="45"
        cy="45"
        r={r}
        className="pt-score-ring-circle"
        stroke="url(#ringGrad)"
        strokeDashoffset={circ}
        style={{
          transition: "stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0055A5" />
          <stop offset="100%" stopColor="#27c93f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function PromiseTracker() {
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const id = "pt-css";
    if (!document.getElementById(id)) {
      const t = document.createElement("style");
      t.id = id;
      t.innerHTML = CSS;
      document.head.appendChild(t);
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      document.getElementById("pt-css")?.remove();
    };
  }, []);

  const delivered = PROMISES.filter((p) => p.status === "delivered").length;
  const inProgress = PROMISES.filter((p) => p.status === "progress").length;
  const planned = PROMISES.filter((p) => p.status === "planned").length;
  const overallPct = Math.round(
    PROMISES.reduce((a, p) => a + p.progress, 0) / PROMISES.length,
  );

  const filtered =
    filter === "All" ? PROMISES : PROMISES.filter((p) => p.category === filter);

  return (
    <section className="pt-section" ref={sectionRef}>
      <div className="pt-wrap">
        {/* Header */}
        <div className="pt-header">
          <div className="pt-supertag">वादा ट्रैकर</div>
          <h2 className="pt-title">
            Every Promise. <span>Every Update.</span>
          </h2>
          <p className="pt-sub">
            India's most transparent politician page — track every commitment
            made to the people of Rajasthan, with live progress and honest
            status.
          </p>
        </div>

        {/* Score Banner */}
        <div className="pt-score-banner">
          <div className="pt-score-main">
            <div className="pt-score-ring-wrap">
              <div className="pt-score-ring-bg" />
              <AnimatedRing pct={overallPct} />
              <div className="pt-score-num">{animated ? overallPct : 0}%</div>
            </div>
            <div className="pt-score-label">Overall Progress</div>
          </div>

          <div className="pt-score-pills">
            <div className="pt-pill green">
              <div className="pt-pill-dot" />
              {delivered} Delivered
            </div>
            <div className="pt-pill orange">
              <div className="pt-pill-dot" />
              {inProgress} In Progress
            </div>
            <div className="pt-pill blue">
              <div className="pt-pill-dot" />
              {planned} Planned
            </div>
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.8em",
                color: "rgba(255,255,255,0.28)",
                margin: "0",
                lineHeight: "1.6",
                maxWidth: "260px",
              }}
            >
              We believe a leader must be accountable. This tracker is updated
              every quarter — no hiding, no excuses.
            </p>
          </div>

          <div className="pt-score-cta">
            <div className="pt-score-cta-text">
              "जनता की जिम्मेदारी हमारी जिम्मेदारी है"
            </div>
            <div className="pt-accountability">
              🔒 Verified &amp; Updated Q1 2026
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pt-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`pt-filter${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Promise Cards Grid */}
        <div className="pt-grid">
          {filtered.map((p) => {
            const cfg = STATUS_CONFIG[p.status];
            const isOpen = openId === p.id;
            return (
              <div
                key={p.id}
                className={`pt-card${isOpen ? " open" : ""}`}
                style={
                  isOpen
                    ? {
                        border: `1px solid ${cfg.border}`,
                        boxShadow: `0 16px 48px ${cfg.glow}`,
                        background: cfg.bg,
                      }
                    : {}
                }
                onClick={() => setOpenId(isOpen ? null : p.id)}
              >
                {/* top color stripe */}
                <div
                  className="pt-card-stripe"
                  style={{
                    background: `linear-gradient(90deg, ${cfg.color}, transparent)`,
                    opacity: isOpen ? 1 : 0.4,
                  }}
                />

                <div className="pt-card-head">
                  <span className="pt-cat-badge">{p.category}</span>
                  <span
                    className="pt-status-badge"
                    style={{
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      color: cfg.color,
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <div className="pt-card-body">
                  <div className="pt-card-title">{p.title}</div>
                  <div className="pt-card-promise">{p.promise}</div>
                </div>

                {/* Progress bar */}
                <div className="pt-progress-area">
                  <div className="pt-progress-top">
                    <span>Progress</span>
                    <span
                      className="pt-progress-pct"
                      style={{ color: cfg.color }}
                    >
                      {p.progress}%
                    </span>
                  </div>
                  <div className="pt-bar">
                    <div
                      className="pt-bar-fill"
                      style={{
                        width: animated ? `${p.progress}%` : "0%",
                        background: `linear-gradient(90deg, ${cfg.color}99, ${cfg.color})`,
                        transition: `width 1.4s cubic-bezier(0.22,1,0.36,1) ${p.id * 0.08}s`,
                      }}
                    />
                  </div>
                </div>

                {/* Expandable detail */}
                <div
                  className="pt-detail"
                  style={{ borderTopColor: cfg.border }}
                >
                  {p.detail}
                </div>

                <div className="pt-card-footer">
                  <span className="pt-year">Promise made: {p.year}</span>
                  <span className="pt-expand-btn">
                    {isOpen ? "Less" : "Details"}{" "}
                    <span className="pt-expand-icon">▾</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pledge */}
        <div className="pt-pledge">
          <span className="pt-pledge-icon">🤚</span>
          <div className="pt-pledge-title">Our Promise to You</div>
          <div className="pt-pledge-text">
            "राजनीति वादों से नहीं, काम से बनती है।
            <br />
            हमने जो कहा, वो करके दिखाएंगे. और जो बाकी है, वो भी पूरा होगा।"
          </div>
          <div className="pt-pledge-author">
            — Priya Sharma Yadav, Leader of Opposition, Rajasthan
          </div>
        </div>
      </div>
    </section>
  );
}
