import React from "react";

const LANGS = ["Hindi 🇮🇳", "Rajasthani", "English", "Sanskrit"];

function Toolstack() {
  return (
    <div style={{ marginTop: "32px" }}>
      <h4
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 800,
          color: "#fff",
          fontSize: "1em",
          marginBottom: "18px",
        }}
      >
        🗣️ Languages <span style={{ color: "#0055A5" }}>Known</span>
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {LANGS.map((l) => (
          <span
            key={l}
            style={{
              padding: "9px 16px",
              borderRadius: "10px",
              background: "rgba(0,85,165,0.06)",
              border: "1px solid rgba(0,85,165,0.15)",
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.83em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Toolstack;
