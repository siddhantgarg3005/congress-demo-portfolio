import React, { useState, useEffect, useRef } from "react";

/* ── JAN AWAAZ — "People's Voice" live issues voter ── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Hindi&display=swap');

  .ja-section {
    padding: 80px 0 90px;
    position: relative; overflow: hidden;
  }
  .ja-section::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,85,165,0.04) 0%, transparent 65%);
  }

  .ja-wrap { max-width: 900px; margin: 0 auto; padding: 0 24px; position: relative; z-index:1; }

  /* header */
  .ja-header { text-align: center; margin-bottom: 48px; }
  .ja-supertag {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    letter-spacing:3px; text-transform:uppercase;
    color:rgba(0,85,165,0.55); margin-bottom:14px;
  }
  .ja-supertag::before,.ja-supertag::after { content:''; display:block; width:36px; height:1px; background:rgba(0,85,165,0.3); }
  .ja-title {
    font-family:'Outfit',sans-serif; font-size:clamp(1.9em,4vw,2.7em);
    font-weight:900; color:#fff; margin-bottom:8px; letter-spacing:-0.5px;
  }
  .ja-title span { color:#0055A5; }
  .ja-sub {
    font-family:'Outfit',sans-serif; font-size:0.9em;
    color:rgba(255,255,255,0.36); max-width:480px; margin:0 auto; line-height:1.65;
  }

  /* live badge */
  .ja-live {
    display:inline-flex; align-items:center; gap:7px; margin-bottom:36px;
    padding:5px 14px 5px 10px; border-radius:20px;
    background:rgba(255,59,48,0.1); border:1px solid rgba(255,59,48,0.2);
    font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:700; color:rgba(255,80,70,0.9);
  }
  .ja-live-dot {
    width:7px; height:7px; border-radius:50%; background:#ff3b30;
    animation:livePulse 1.5s ease-in-out infinite;
  }
  @keyframes livePulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,59,48,0.5)} 50%{opacity:0.7;box-shadow:0 0 0 5px rgba(255,59,48,0)} }

  /* card */
  .ja-card {
    background:rgba(255,255,255,0.025);
    border:1px solid rgba(0,85,165,0.12);
    border-radius:24px; overflow:hidden;
    box-shadow:0 20px 60px rgba(0,0,0,0.2);
  }

  /* question area */
  .ja-qarea {
    padding:28px 28px 0;
  }
  .ja-qtop {
    display:flex; align-items:flex-start; justify-content:space-between; gap:16px;
    margin-bottom:20px;
  }
  .ja-qnum {
    font-family:'Outfit',sans-serif; font-size:0.65em; font-weight:700;
    color:rgba(0,85,165,0.5); letter-spacing:1px; text-transform:uppercase;
    white-space:nowrap; padding-top:4px;
  }
  .ja-q {
    font-family:'Outfit',sans-serif; font-size:1.15em; font-weight:800;
    color:#fff; line-height:1.4; flex:1;
  }
  .ja-q-hindi {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:0.9em; color:rgba(0,85,165,0.5); margin-top:4px; font-style:italic;
  }

  /* total votes */
  .ja-total {
    font-family:'Outfit',sans-serif; font-size:0.75em; font-weight:700;
    color:rgba(255,255,255,0.3); text-align:right; padding:0 28px 16px;
  }
  .ja-total span { color:rgba(0,85,165,0.7); }

  /* options */
  .ja-options { padding:0 28px 28px; display:flex; flex-direction:column; gap:12px; }

  .ja-option {
    border-radius:14px; overflow:hidden; cursor:pointer;
    border:1px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.03);
    transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
    position:relative;
  }
  .ja-option:hover:not(.voted) {
    border-color:rgba(0,85,165,0.3);
    background:rgba(0,85,165,0.06);
    transform:translateX(4px);
  }
  .ja-option.voted { cursor:default; }
  .ja-option.voted.winner { border-color:rgba(0,85,165,0.4); }
  .ja-option.voted.my-vote { border-color:rgba(19,136,8,0.4); }

  /* fill bar behind option */
  .ja-fill {
    position:absolute; inset:0; border-radius:13px;
    transition:width 0.8s cubic-bezier(0.22,1,0.36,1);
    pointer-events:none;
  }
  .voted .ja-fill { background:linear-gradient(90deg, rgba(0,85,165,0.12), transparent); }
  .voted.my-vote .ja-fill { background:linear-gradient(90deg, rgba(19,136,8,0.15), transparent); }
  .voted.winner  .ja-fill { background:linear-gradient(90deg, rgba(0,85,165,0.18), transparent); }

  .ja-opt-inner {
    position:relative; z-index:1;
    display:flex; align-items:center; gap:14px;
    padding:14px 18px;
  }
  .ja-opt-icon { font-size:1.4em; flex-shrink:0; }
  .ja-opt-text { flex:1; }
  .ja-opt-label {
    font-family:'Outfit',sans-serif; font-size:0.92em; font-weight:700;
    color:rgba(255,255,255,0.82); display:block;
  }
  .ja-opt-sub {
    font-family:'Outfit',sans-serif; font-size:0.73em;
    color:rgba(255,255,255,0.35); margin-top:2px; display:block;
  }
  .ja-opt-pct {
    font-family:'Outfit',sans-serif; font-size:1.1em; font-weight:900;
    color:#0055A5; min-width:44px; text-align:right;
    opacity:0; transition:opacity 0.4s ease 0.3s;
  }
  .voted .ja-opt-pct { opacity:1; }
  .voted.my-vote .ja-opt-label { color:#fff; }
  .voted.my-vote .ja-opt-pct   { color:#138808; }

  /* check mark */
  .ja-check {
    width:24px; height:24px; border-radius:50%;
    background:rgba(19,136,8,0.15); border:1.5px solid rgba(19,136,8,0.3);
    display:flex; align-items:center; justify-content:center;
    font-size:0.8em;
    opacity:0; transform:scale(0);
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1) 0.2s;
  }
  .voted.my-vote .ja-check { opacity:1; transform:scale(1); }
  .voted:not(.my-vote) .ja-check { width:0; padding:0; border:none; }

  /* next / nav */
  .ja-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 28px 24px; gap:16px; }
  .ja-nav-dots { display:flex; gap:6px; }
  .ja-nav-dot {
    width:8px; height:8px; border-radius:50%;
    background:rgba(255,255,255,0.12); cursor:pointer; transition:all 0.25s ease;
  }
  .ja-nav-dot.active { background:#0055A5; width:22px; border-radius:4px; }
  .ja-nav-dot.done   { background:rgba(19,136,8,0.5); }

  .ja-btn-next {
    display:inline-flex; align-items:center; gap:7px;
    padding:10px 22px; border-radius:12px;
    background:linear-gradient(135deg, #003580, #0055A5);
    border:none; color:#fff;
    font-family:'Outfit',sans-serif; font-size:0.85em; font-weight:700;
    cursor:pointer; transition:all 0.3s ease;
    box-shadow:0 4px 16px rgba(0,85,165,0.35);
  }
  .ja-btn-next:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,85,165,0.5); }
  .ja-btn-next:disabled { opacity:0.4; cursor:default; transform:none; }

  /* ── RESULTS SUMMARY ── */
  .ja-summary { padding:36px 28px; animation:sumIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes sumIn { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  .ja-sum-title {
    font-family:'Outfit',sans-serif; font-weight:900; font-size:1.3em; color:#fff;
    margin-bottom:4px; text-align:center;
  }
  .ja-sum-sub { font-family:'Outfit',sans-serif; font-size:0.82em; color:rgba(255,255,255,0.35); text-align:center; margin-bottom:28px; }

  .ja-sum-issue {
    margin-bottom:18px; animation:sumIn 0.5s ease both;
  }
  .ja-sum-issue-top {
    display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:7px;
  }
  .ja-sum-issue-name {
    font-family:'Outfit',sans-serif; font-size:0.88em; font-weight:700; color:rgba(255,255,255,0.75);
    display:flex; align-items:center; gap:8px;
  }
  .ja-sum-issue-pct {
    font-family:'Outfit',sans-serif; font-size:0.92em; font-weight:900; color:#0055A5;
  }
  .ja-sum-bar {
    height:8px; border-radius:4px; background:rgba(255,255,255,0.06); overflow:hidden;
  }
  .ja-sum-fill {
    height:100%; border-radius:4px;
    background:linear-gradient(90deg, #003580, #0055A5);
    transition:width 1s cubic-bezier(0.22,1,0.36,1);
  }
  .ja-sum-fill.top { background:linear-gradient(90deg, #FF9933, #e07b00); }

  .ja-sum-pledge {
    margin-top:28px; padding:20px; border-radius:16px; text-align:center;
    background:rgba(0,85,165,0.08); border:1px solid rgba(0,85,165,0.2);
  }
  .ja-sum-pledge-text {
    font-family:'Tiro Devanagari Hindi',serif; font-size:0.95em;
    color:rgba(255,255,255,0.6); margin-bottom:14px; font-style:italic;
  }
  .ja-restart {
    display:inline-flex; align-items:center; gap:7px;
    padding:10px 22px; border-radius:12px;
    background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
    color:rgba(255,255,255,0.5); font-family:'Outfit',sans-serif;
    font-size:0.82em; font-weight:600; cursor:pointer; transition:all 0.25s ease;
  }
  .ja-restart:hover { background:rgba(0,85,165,0.1); color:#0055A5; border-color:rgba(0,85,165,0.3); }

  @media(max-width:600px) {
    .ja-qarea,.ja-options,.ja-nav,.ja-summary { padding-left:16px; padding-right:16px; }
    .ja-q { font-size:1em; }
  }
`;

const QUESTIONS = [
  {
    q: "What is the most urgent issue in Rajasthan today?",
    hindi: "राजस्थान की सबसे जरूरी समस्या क्या है?",
    options: [
      {
        icon: "👩",
        label: "Women's Safety & Empowerment",
        sub: "Mahila suraksha, betiyon ka bhavishya",
      },
      {
        icon: "👨‍🌾",
        label: "Farmer Loan Waiver & MSP",
        sub: "Kisan rin maafi aur sahi daam",
      },
      {
        icon: "📚",
        label: "Education & Youth Jobs",
        sub: "Shiksha sudhar aur rozgaar",
      },
      {
        icon: "🏥",
        label: "Healthcare Access",
        sub: "Swasthya seva sabke liye",
      },
    ],
  },
  {
    q: "Which area needs Congress's focus most?",
    hindi: "Congress ko सबसे पहले किस पर ध्यान देना चाहिए?",
    options: [
      {
        icon: "💧",
        label: "Water & Electricity in Villages",
        sub: "Gram vikas aur bijli paani",
      },
      {
        icon: "🛣️",
        label: "Roads & Infrastructure",
        sub: "Sadkein, pul aur connectivity",
      },
      {
        icon: "⚖️",
        label: "Justice & Anti-Corruption",
        sub: "Bhrashtachar mukt rajniti",
      },
      {
        icon: "🌱",
        label: "Environment & Clean Air",
        sub: "Paryavaran aur pollution",
      },
    ],
  },
  {
    q: "How should politicians connect with citizens?",
    hindi: "नेताओं को जनता से कैसे जुड़ना चाहिए?",
    options: [
      { icon: "🏘️", label: "Regular Village Visits", sub: "Gaon gaon jaana" },
      { icon: "📱", label: "Social Media & Digital", sub: "Online engagement" },
      {
        icon: "📋",
        label: "Public Grievance System",
        sub: "Shikayat prarambhik samadhan",
      },
      { icon: "🎤", label: "Open Jan Sabha Events", sub: "Seedha baatcheet" },
    ],
  },
];

export default function JanAwaaz() {
  const STORAGE_KEY = "janawaaz_votes_v1";

  function loadVotes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }
  function saveVotes(v) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch {}
  }

  const [qIdx, setQIdx] = useState(0);
  const [votes, setVotes] = useState(loadVotes);
  const [myVotes, setMyVotes] = useState({});
  const [phase, setPhase] = useState("quiz"); // quiz | summary
  const cardRef = useRef(null);

  useEffect(() => {
    const id = "ja-css";
    if (!document.getElementById(id)) {
      const t = document.createElement("style");
      t.id = id;
      t.innerHTML = CSS;
      document.head.appendChild(t);
    }
    return () => {
      document.getElementById("ja-css")?.remove();
    };
  }, []);

  const Q = QUESTIONS[qIdx];
  const qVotes =
    votes[qIdx] || Q.options.map(() => Math.floor(Math.random() * 60) + 20);
  const totalVotes = qVotes.reduce((a, b) => a + b, 0);
  const hasVoted = myVotes[qIdx] !== undefined;
  const maxVote = Math.max(...qVotes);

  function vote(optIdx) {
    if (hasVoted) return;
    const newQVotes = [...qVotes];
    newQVotes[optIdx]++;
    const newVotes = { ...votes, [qIdx]: newQVotes };
    setVotes(newVotes);
    setMyVotes((mv) => ({ ...mv, [qIdx]: optIdx }));
    saveVotes(newVotes);
    // animate card
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1.01)";
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transform = "";
      }, 300);
    }
  }

  function next() {
    if (qIdx + 1 >= QUESTIONS.length) setPhase("summary");
    else setQIdx((i) => i + 1);
  }

  function restart() {
    setQIdx(0);
    setMyVotes({});
    setPhase("quiz");
  }

  // build summary: top voted option per question
  function getSummary() {
    return QUESTIONS.map((q, qi) => {
      const qv = votes[qi] || q.options.map(() => 30);
      const tot = qv.reduce((a, b) => a + b, 0);
      const maxI = qv.indexOf(Math.max(...qv));
      return {
        label: q.options[maxI].label,
        icon: q.options[maxI].icon,
        pct: Math.round((qv[maxI] / tot) * 100),
        isTop: maxI === qv.indexOf(Math.max(...qv)),
      };
    });
  }

  const totalParticipants = Object.values(votes).reduce(
    (a, qv) => a + (Array.isArray(qv) ? qv.reduce((x, y) => x + y, 0) : 0),
    0,
  );

  return (
    <section className="ja-section">
      <div className="ja-wrap">
        <div className="ja-header">
          <div className="ja-supertag">जन आवाज़</div>
          <h2 className="ja-title">
            Your <span>Voice Matters</span>
          </h2>
          <p className="ja-sub">
            Tell us what Rajasthan needs most. Your vote shapes our priorities —
            no login, no data stored on servers.
          </p>
          <div style={{ marginTop: "14px" }}>
            <span className="ja-live">
              <span className="ja-live-dot" />
              {totalParticipants.toLocaleString()}+ Voices Heard Today
            </span>
          </div>
        </div>

        <div
          className="ja-card"
          ref={cardRef}
          style={{ transition: "transform 0.3s ease" }}
        >
          {phase === "quiz" ? (
            <>
              <div className="ja-qarea">
                <div className="ja-qtop">
                  <div className="ja-qnum">
                    Question {qIdx + 1} of {QUESTIONS.length}
                  </div>
                </div>
                <div className="ja-q">{Q.q}</div>
                <div className="ja-q-hindi">{Q.hindi}</div>
              </div>
              {hasVoted && (
                <div className="ja-total">
                  <span>{totalVotes.toLocaleString()}</span> votes on this
                  question
                </div>
              )}
              <div className="ja-options">
                {Q.options.map((opt, i) => {
                  const pct = hasVoted
                    ? Math.round((qVotes[i] / totalVotes) * 100)
                    : 0;
                  const isWinner = hasVoted && qVotes[i] === maxVote;
                  const isMyVote = myVotes[qIdx] === i;
                  return (
                    <div
                      key={i}
                      className={`ja-option${hasVoted ? " voted" : ""}${isMyVote ? " my-vote" : ""}${isWinner ? " winner" : ""}`}
                      onClick={() => vote(i)}
                    >
                      <div
                        className="ja-fill"
                        style={{ width: hasVoted ? `${pct}%` : "0%" }}
                      />
                      <div className="ja-opt-inner">
                        <span className="ja-opt-icon">{opt.icon}</span>
                        <div className="ja-opt-text">
                          <span className="ja-opt-label">{opt.label}</span>
                          <span className="ja-opt-sub">{opt.sub}</span>
                        </div>
                        {hasVoted && <span className="ja-opt-pct">{pct}%</span>}
                        <div className="ja-check">✓</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ja-nav">
                <div className="ja-nav-dots">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`ja-nav-dot${i === qIdx ? " active" : myVotes[i] !== undefined ? " done" : ""}`}
                      onClick={() => setQIdx(i)}
                    />
                  ))}
                </div>
                <button
                  className="ja-btn-next"
                  onClick={next}
                  disabled={!hasVoted}
                >
                  {qIdx + 1 < QUESTIONS.length
                    ? "Next Question →"
                    : "See Results 🎯"}
                </button>
              </div>
            </>
          ) : (
            <div className="ja-summary">
              <div className="ja-sum-title">🙏 धन्यवाद — Thank You!</div>
              <p className="ja-sum-sub">
                Here's what the people of Rajasthan are saying
              </p>

              {getSummary().map((s, i) => (
                <div
                  className="ja-sum-issue"
                  key={i}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="ja-sum-issue-top">
                    <div className="ja-sum-issue-name">
                      <span>{s.icon}</span>
                      <span>
                        Top priority for Q{i + 1}: {s.label}
                      </span>
                    </div>
                    <div className="ja-sum-issue-pct">{s.pct}%</div>
                  </div>
                  <div className="ja-sum-bar">
                    <div
                      className={`ja-sum-fill${i === 0 ? " top" : ""}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="ja-sum-pledge">
                <div className="ja-sum-pledge-text">
                  "आपकी आवाज़ हमारी शक्ति है — हम आपके लिए लड़ते रहेंगे।"
                </div>
                <div
                  style={{
                    fontSize: "0.8em",
                    fontFamily: "'Outfit',sans-serif",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "14px",
                  }}
                >
                  — Priya Sharma Yadav
                </div>
                <button className="ja-restart" onClick={restart}>
                  ↩ Vote Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
