import React from "react";

const PILLARS = [
  "👩 Mahila Shakti",
  "👨‍🌾 Kisan Nyay",
  "📚 Shiksha",
  "🏥 Swasthya",
  "🌱 Paryavaran",
  "⚖️ Nyay & Samanta",
  "🏘️ Gram Vikas",
  "🇮🇳 Rashtriya Ekta",
];

function Techstack() {
  return (
    <div>
      <h4
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 800,
          color: "#fff",
          fontSize: "1em",
          marginBottom: "18px",
        }}
      >
        🕊️ Core <span style={{ color: "#0055A5" }}>Political Pillars</span>
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {PILLARS.map((p) => (
          <span
            key={p}
            style={{
              padding: "9px 16px",
              borderRadius: "10px",
              background: "rgba(0,85,165,0.08)",
              border: "1px solid rgba(0,85,165,0.2)",
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.83em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              transition: "all 0.25s ease",
              cursor: "default",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Techstack;
