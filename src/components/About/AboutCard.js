import React from "react";

function AboutCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(0,85,165,0.15)",
        borderRadius: "20px",
        padding: "32px",
      }}
    >
      <p
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "0.95em",
          color: "rgba(255,255,255,0.5)",
          lineHeight: "1.88",
          marginBottom: "14px",
        }}
      >
        Hi, I'm <strong style={{ color: "#fff" }}>Priya Sharma Yadav</strong>, a
        seasoned political leader from{" "}
        <strong style={{ color: "#0055A5" }}>Jaipur Central, Rajasthan</strong>{" "}
        🏯
      </p>
      <p
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "0.95em",
          color: "rgba(255,255,255,0.5)",
          lineHeight: "1.88",
          marginBottom: "14px",
        }}
      >
        Having served the people of Rajasthan for over{" "}
        <strong style={{ color: "#fff" }}>18 years</strong>, I have dedicated my
        career to{" "}
        <strong style={{ color: "#0055A5" }}>
          women's empowerment, farmer welfare, education, and justice
        </strong>{" "}
        for all.
      </p>
      <p
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "0.95em",
          color: "rgba(255,255,255,0.5)",
          lineHeight: "1.88",
        }}
      >
        As the current{" "}
        <strong style={{ color: "#fff" }}>
          Leader of Opposition in the Rajasthan Legislative Assembly
        </strong>
        , I continue to hold the government accountable and fight for every
        citizen of our great state.
      </p>
    </div>
  );
}

export default AboutCard;
