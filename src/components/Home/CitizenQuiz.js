import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

/* ── QUIZ DATA ── */
const QUESTIONS = [
  {
    q: "मध्यप्रदेश की राजधानी क्या है?",
    emoji: "🏛️",
    hint: "Vikram Singh Chauhan represents this city!",
    options: ["Indore", "Jabalpur", "Bhopal", "Gwalior"],
    correct: 2,
  },
  {
    q: "Vikram Singh Chauhan's constituency is?",
    emoji: "📍",
    hint: "He has won here 3 times in a row!",
    options: ["Bhopal South", "Bhopal North", "Sehore", "Vidisha"],
    correct: 1,
  },
  {
    q: "How many km of roads were built under his tenure?",
    emoji: "🛣️",
    hint: "Enough to cover the distance from Mumbai to Delhi — twice!",
    options: ["800 km", "1,200 km", "2,400 km", "500 km"],
    correct: 2,
  },
  {
    q: "Kisan Samridhi Abhiyan benefited how many farmers?",
    emoji: "👨‍🌾",
    hint: "More than the entire population of many countries!",
    options: ["12 lakh", "20 lakh", "34 lakh", "50 lakh"],
    correct: 2,
  },
  {
    q: "BJP stands for?",
    emoji: "🪷",
    hint: "India's largest political party by membership",
    options: [
      "Bharat Jan Party",
      "Bharatiya Janata Party",
      "Bharat Janta Party",
      "Bharatiya Jana Party",
    ],
    correct: 1,
  },
];

const RESULTS = [
  {
    min: 0,
    max: 1,
    title: "नया उत्साही 🌱",
    title_en: "Rising Patriot",
    msg: "Every great leader starts somewhere! You're just beginning your journey of knowing MP. Come back after exploring the Vision & Journey pages!",
    color: "#6B7280",
    bg: "rgba(107,114,128,0.1)",
    border: "rgba(107,114,128,0.3)",
    cta: "Explore Journey →",
    ctaLink: "/journey",
  },
  {
    min: 2,
    max: 3,
    title: "जागरूक नागरिक 🙏",
    title_en: "Aware Citizen",
    msg: "You know your roots! A true citizen of Madhya Pradesh who stays informed. Vikram ji appreciates your interest in development!",
    color: "#FF9933",
    bg: "rgba(255,153,51,0.08)",
    border: "rgba(255,153,51,0.3)",
    cta: "See Our Vision →",
    ctaLink: "/vision",
  },
  {
    min: 4,
    max: 4,
    title: "विकास चैंपियन 🏆",
    title_en: "Vikas Champion",
    msg: "Almost perfect! You're a true advocate of development. MP is proud to have citizens like you who are engaged and informed!",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.35)",
    cta: "View Achievements →",
    ctaLink: "/achievements",
  },
  {
    min: 5,
    max: 5,
    title: "🌟 सच्चा भारतीय!",
    title_en: "True Indian Legend",
    msg: "Perfect score! You are the definition of an informed, proud Indian citizen. Vikram Singh Chauhan would be honoured to represent someone like you!",
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.08)",
    border: "rgba(255,107,0,0.4)",
    cta: "Share Your Score 🎉",
    ctaLink: "#",
  },
];

const quizCSS = `
  /* ── QUIZ SECTION ── */
  .cq-section {
    padding: 80px 0 90px;
    position: relative;
    overflow: hidden;
  }
  .cq-section::before {
    content:'';
    position:absolute; inset:0;
    background: linear-gradient(180deg, transparent 0%, rgba(255,107,0,0.03) 50%, transparent 100%);
    pointer-events:none;
  }

  /* section header */
  .cq-header { text-align:center; margin-bottom:52px; position:relative; z-index:1; }
  .cq-supertag {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    letter-spacing:3px; text-transform:uppercase;
    color:rgba(255,153,51,0.55); margin-bottom:14px;
  }
  .cq-supertag::before, .cq-supertag::after {
    content:''; display:block; width:36px; height:1px; background:rgba(255,153,51,0.3);
  }
  .cq-title {
    font-family:'Outfit',sans-serif;
    font-size:clamp(1.9em, 4vw, 2.8em); font-weight:900;
    color:#fff; margin-bottom:10px; letter-spacing:-0.5px;
  }
  .cq-subtitle {
    font-family:'Outfit',sans-serif;
    font-size:0.92em; color:rgba(255,255,255,0.38); max-width:480px; margin:0 auto;
    line-height:1.65;
  }

  /* card wrapper */
  .cq-card {
    max-width: 660px;
    margin: 0 auto;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.12);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: cqIn 0.5s ease both;
  }
  @keyframes cqIn { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  /* progress bar */
  .cq-progress-wrap {
    padding: 20px 28px 0;
    display: flex; align-items: center; gap: 14px;
  }
  .cq-progress-bar {
    flex: 1; height: 4px; border-radius: 4px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .cq-progress-fill {
    height: 100%; border-radius: 4px;
    background: linear-gradient(90deg, #FF6B00, #FF9933, #D4AF37);
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .cq-progress-text {
    font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:700;
    color:rgba(255,153,51,0.6); white-space:nowrap;
  }

  /* question area */
  .cq-q-area { padding: 28px 28px 0; }
  .cq-q-emoji {
    font-size: 2.4em; margin-bottom: 10px; display: block;
    animation: emojiBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes emojiBounce { from{transform:scale(0.4) rotate(-10deg)} to{transform:scale(1) rotate(0deg)} }
  .cq-hint {
    font-family:'Outfit',sans-serif; font-size:0.75em;
    color:rgba(255,153,51,0.45); margin-bottom:8px; font-style:italic;
  }
  .cq-question {
    font-family:'Outfit',sans-serif;
    font-size:1.2em; font-weight:800; color:#fff;
    line-height:1.4; margin-bottom:0;
  }

  /* options */
  .cq-options { padding: 22px 28px 28px; display:flex; flex-direction:column; gap:10px; }
  .cq-option {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    font-family:'Outfit',sans-serif; font-size:0.92em; font-weight:600;
    color: rgba(255,255,255,0.75);
    user-select: none;
    animation: optIn 0.4s ease both;
  }
  .cq-option:nth-child(1){animation-delay:0.05s}
  .cq-option:nth-child(2){animation-delay:0.1s}
  .cq-option:nth-child(3){animation-delay:0.15s}
  .cq-option:nth-child(4){animation-delay:0.2s}
  @keyframes optIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
  .cq-option:hover:not(.cq-answered) {
    background: rgba(255,153,51,0.07);
    border-color: rgba(255,153,51,0.3);
    color: #fff; transform: translateX(4px);
  }
  .cq-option-num {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items:center; justify-content:center;
    font-size:0.78em; font-weight:800; color:rgba(255,255,255,0.4);
    transition: all 0.25s ease;
  }
  /* correct */
  .cq-option.correct {
    background: rgba(39,201,63,0.1) !important;
    border-color: rgba(39,201,63,0.5) !important;
    color: #fff !important;
    transform: translateX(4px) !important;
  }
  .cq-option.correct .cq-option-num {
    background: #27c93f; border-color: #27c93f; color: #fff;
  }
  /* wrong */
  .cq-option.wrong {
    background: rgba(255,95,86,0.1) !important;
    border-color: rgba(255,95,86,0.4) !important;
    color:rgba(255,255,255,0.5) !important;
  }
  .cq-option.wrong .cq-option-num { background: #ff5f56; border-color:#ff5f56; color:#fff; }
  /* locked */
  .cq-option.cq-answered { cursor: default; }

  /* feedback */
  .cq-feedback {
    margin: 0 28px 22px;
    padding: 12px 18px; border-radius: 12px;
    font-family:'Outfit',sans-serif; font-size:0.82em; font-weight:600;
    animation: cqIn 0.35s ease both;
  }
  .cq-feedback.ok  { background:rgba(39,201,63,0.1); border:1px solid rgba(39,201,63,0.3); color:#27c93f; }
  .cq-feedback.bad { background:rgba(255,95,86,0.1);  border:1px solid rgba(255,95,86,0.3);  color:#ff5f56; }

  /* next btn */
  .cq-next {
    margin: 0 28px 28px;
    display: block; width:calc(100% - 0px);
    padding: 14px; border-radius: 14px;
    background: linear-gradient(135deg, #FF6B00, #FF9933);
    border: none; color: #fff;
    font-family:'Outfit',sans-serif; font-size:0.92em; font-weight:800;
    letter-spacing:0.5px; cursor:pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 24px rgba(255,107,0,0.35);
    animation: cqIn 0.3s ease 0.1s both;
  }
  .cq-next:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(255,107,0,0.5); }

  /* ── RESULT CARD ── */
  .cq-result {
    padding: 40px 32px;
    text-align: center;
    animation: cqIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }
  .cq-result-emoji { font-size:3.5em; display:block; margin-bottom:14px; animation: emojiBounce 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
  .cq-score-ring {
    width: 90px; height: 90px; border-radius: 50%;
    border: 3px solid;
    display: flex; align-items:center; justify-content:center;
    margin: 0 auto 20px;
    font-family:'Outfit',sans-serif; font-size:1.8em; font-weight:900;
    animation: ringPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
    position: relative;
  }
  @keyframes ringPop { from{transform:scale(0)} to{transform:scale(1)} }
  .cq-result-title {
    font-family:'Outfit',sans-serif; font-size:1.5em; font-weight:900;
    color:#fff; margin-bottom:4px;
  }
  .cq-result-title-en {
    font-family:'Outfit',sans-serif; font-size:0.82em; font-weight:600;
    margin-bottom:18px; opacity:0.6;
  }
  .cq-result-msg {
    font-family:'Outfit',sans-serif; font-size:0.88em;
    color:rgba(255,255,255,0.55); line-height:1.75;
    max-width:420px; margin:0 auto 28px;
  }
  .cq-result-cta {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 28px; border-radius:40px;
    font-family:'Outfit',sans-serif; font-size:0.88em; font-weight:700;
    text-decoration:none; transition:all 0.3s ease;
    border: 1.5px solid; margin-bottom:14px;
  }
  .cq-result-cta:hover { transform:translateY(-3px); }
  .cq-retry {
    display:block; width:100%;
    padding:12px; border-radius:14px;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    color:rgba(255,255,255,0.4);
    font-family:'Outfit',sans-serif; font-size:0.82em; font-weight:600;
    cursor:pointer; transition:all 0.25s ease; margin-top:8px;
  }
  .cq-retry:hover { background:rgba(255,153,51,0.07); border-color:rgba(255,153,51,0.2); color:rgba(255,153,51,0.8); }

  /* score dots */
  .cq-score-dots { display:flex; justify-content:center; gap:8px; margin-bottom:24px; }
  .cq-dot {
    width:10px; height:10px; border-radius:50%;
    animation: dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .cq-dot.hit  { background:#27c93f; box-shadow:0 0 8px rgba(39,201,63,0.7); }
  .cq-dot.miss { background:rgba(255,255,255,0.12); }

  /* start screen */
  .cq-start { padding:48px 32px; text-align:center; animation: cqIn 0.5s ease both; }
  .cq-start-icon { font-size:3em; display:block; margin-bottom:16px; }
  .cq-start-title { font-family:'Outfit',sans-serif; font-size:1.6em; font-weight:900; color:#fff; margin-bottom:10px; }
  .cq-start-sub {
    font-family:'Outfit',sans-serif; font-size:0.88em;
    color:rgba(255,255,255,0.45); line-height:1.7;
    max-width:380px; margin:0 auto 28px;
  }
  .cq-start-meta {
    display:flex; justify-content:center; gap:24px; margin-bottom:28px; flex-wrap:wrap;
  }
  .cq-meta-item {
    display:flex; align-items:center; gap:7px;
    font-family:'Outfit',sans-serif; font-size:0.8em; font-weight:600;
    color:rgba(255,255,255,0.4);
  }
  .cq-meta-dot { width:6px; height:6px; border-radius:50%; background:#FF9933; }
  .cq-begin {
    display:block; width:100%;
    padding:16px; border-radius:14px;
    background:linear-gradient(135deg, #FF6B00, #FF9933);
    border:none; color:#fff;
    font-family:'Outfit',sans-serif; font-size:1em; font-weight:800;
    letter-spacing:0.5px; cursor:pointer;
    transition:all 0.3s ease;
    box-shadow:0 6px 28px rgba(255,107,0,0.4);
  }
  .cq-begin:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(255,107,0,0.55); }

  @media (max-width:600px) {
    .cq-options { padding:16px 16px 20px; }
    .cq-q-area  { padding:20px 16px 0; }
    .cq-result  { padding:28px 16px; }
    .cq-start   { padding:32px 16px; }
    .cq-progress-wrap { padding:16px 16px 0; }
    .cq-next    { margin:0 16px 20px; width:calc(100% - 32px); }
    .cq-feedback { margin:0 16px 16px; }
  }
`;

const LABELS = ["A", "B", "C", "D"];

function CitizenQuiz() {
  const [phase, setPhase] = useState("start"); // start | quiz | result
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // true/false per question

  useEffect(() => {
    if (!document.getElementById("cq-styles")) {
      const t = document.createElement("style");
      t.id = "cq-styles";
      t.innerHTML = quizCSS;
      document.head.appendChild(t);
    }
    return () => {
      document.getElementById("cq-styles")?.remove();
    };
  }, []);

  function startQuiz() {
    setPhase("quiz");
    setQIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
  }

  function pick(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === QUESTIONS[qIdx].correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, correct]);
  }

  function next() {
    if (qIdx + 1 >= QUESTIONS.length) {
      setPhase("result");
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const progress = (qIdx / QUESTIONS.length) * 100;

  // get result tier
  const tier =
    RESULTS.find((r) => score >= r.min && score <= r.max) || RESULTS[0];

  /* ─────── START ─────── */
  if (phase === "start")
    return (
      <section className="cq-section">
        <style>{quizCSS}</style>
        <Container>
          <div className="cq-header">
            <div className="cq-supertag">मज़ेदार क्विज़</div>
            <h2 className="cq-title">
              क्या आप एक <span className="purple">सच्चे भारतीय</span> हैं?
            </h2>
            <p className="cq-subtitle">
              Test your knowledge of Madhya Pradesh, BJP, and Vikram Singh
              Chauhan's development work in just 5 questions!
            </p>
          </div>
          <div className="cq-card">
            <div className="cq-start">
              <span className="cq-start-icon">🎯</span>
              <div className="cq-start-title">Citizen Challenge</div>
              <p className="cq-start-sub">
                5 fun questions about Madhya Pradesh & development. Find out if
                you're a{" "}
                <strong style={{ color: "#FF9933" }}>Vikas Champion</strong> or
                a <strong style={{ color: "#FF9933" }}>Rising Patriot</strong>!
              </p>
              <div className="cq-start-meta">
                <div className="cq-meta-item">
                  <span className="cq-meta-dot" />5 Questions
                </div>
                <div className="cq-meta-item">
                  <span className="cq-meta-dot" />
                  No time limit
                </div>
                <div className="cq-meta-item">
                  <span className="cq-meta-dot" />
                  Fun results
                </div>
              </div>
              <button className="cq-begin" onClick={startQuiz}>
                🚀 Start the Challenge!
              </button>
            </div>
          </div>
        </Container>
      </section>
    );

  /* ─────── RESULT ─────── */
  if (phase === "result")
    return (
      <section className="cq-section">
        <Container>
          <div className="cq-header">
            <div className="cq-supertag">आपका परिणाम</div>
            <h2 className="cq-title">
              Your <span className="purple">Result</span>
            </h2>
          </div>
          <div className="cq-card">
            <div className="cq-result">
              <div
                className="cq-score-ring"
                style={{
                  borderColor: tier.color,
                  color: tier.color,
                  boxShadow: `0 0 30px ${tier.color}40`,
                }}
              >
                {score}/{QUESTIONS.length}
              </div>
              <div className="cq-score-dots">
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className={`cq-dot ${a ? "hit" : "miss"}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
              <div className="cq-result-title">{tier.title}</div>
              <div className="cq-result-title-en" style={{ color: tier.color }}>
                {tier.title_en}
              </div>
              <p className="cq-result-msg">{tier.msg}</p>
              <a
                href={tier.ctaLink}
                className="cq-result-cta"
                style={{
                  color: tier.color,
                  borderColor: tier.border,
                  background: tier.bg,
                }}
              >
                {tier.cta}
              </a>
              <button className="cq-retry" onClick={startQuiz}>
                ↩ Try Again
              </button>
            </div>
          </div>
        </Container>
      </section>
    );

  /* ─────── QUIZ ─────── */
  const Q = QUESTIONS[qIdx];
  const feedbackMsg = answered
    ? selected === Q.correct
      ? "✅ Correct! शाबाश! 🎉"
      : `❌ Oops! The answer was "${Q.options[Q.correct]}"`
    : null;

  return (
    <section className="cq-section">
      <Container>
        <div className="cq-header">
          <div className="cq-supertag">मज़ेदार क्विज़</div>
          <h2 className="cq-title">
            Citizen <span className="purple">Challenge</span>
          </h2>
        </div>
        <div key={qIdx} className="cq-card">
          {/* progress */}
          <div className="cq-progress-wrap">
            <div className="cq-progress-bar">
              <div
                className="cq-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="cq-progress-text">
              Q{qIdx + 1}/{QUESTIONS.length}
            </div>
          </div>

          {/* question */}
          <div className="cq-q-area">
            <span className="cq-q-emoji">{Q.emoji}</span>
            <div className="cq-hint">💡 {Q.hint}</div>
            <div className="cq-question">{Q.q}</div>
          </div>

          {/* options */}
          <div className="cq-options">
            {Q.options.map((opt, i) => {
              let cls = "cq-option";
              if (answered) cls += " cq-answered";
              if (answered && i === Q.correct) cls += " correct";
              if (answered && i === selected && i !== Q.correct)
                cls += " wrong";
              return (
                <div key={i} className={cls} onClick={() => pick(i)}>
                  <span className="cq-option-num">{LABELS[i]}</span>
                  {opt}
                </div>
              );
            })}
          </div>

          {/* feedback */}
          {feedbackMsg && (
            <div
              className={`cq-feedback ${selected === Q.correct ? "ok" : "bad"}`}
            >
              {feedbackMsg}
            </div>
          )}

          {/* next */}
          {answered && (
            <button className="cq-next" onClick={next}>
              {qIdx + 1 < QUESTIONS.length
                ? "Next Question →"
                : "See My Result 🎯"}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}

export default CitizenQuiz;
