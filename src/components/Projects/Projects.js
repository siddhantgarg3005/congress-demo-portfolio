import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import roadsImg from "../../Assets/Projects/work-roads.png";
import villageImg from "../../Assets/Projects/work-village.png";
import farmersImg from "../../Assets/Projects/work-farmers.png";

const projectStyles = `
  .bjp-projects-section {
    padding: 100px 0 60px;
    position: relative; min-height: 100vh; overflow: hidden;
  }
  .bjp-projects-header {
    text-align: center; margin-bottom: 50px;
    position: relative; z-index: 1;
    animation: fadeUp 0.8s ease both;
  }
  .bjp-projects-tag {
    font-family:'Outfit',sans-serif; font-size:0.72em; font-weight:700;
    letter-spacing:4px; text-transform:uppercase;
    color:rgba(255,153,51,0.6); margin-bottom:12px;
    display:flex; align-items:center; justify-content:center; gap:12px;
  }
  .bjp-projects-tag::before,
  .bjp-projects-tag::after { content:''; display:block; width:40px; height:1px; background:rgba(255,153,51,0.3); }
  .bjp-projects-footer-note {
    text-align:center; margin-top:40px;
    font-family:'Outfit',sans-serif; font-size:0.82em;
    color:rgba(255,255,255,0.3); position:relative; z-index:1;
  }
  .bjp-projects-footer-note span { color:#FF9933; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

const initiatives = [
  {
    imgPath: roadsImg,
    imgEmoji: "🛣️",
    title: "Infrastructure & Connectivity",
    badge: "01 · Roads & PWD",
    tags: ["Infrastructure", "Development", "Connectivity"],
    shortDescription:
      "Connecting every village to the main highway network across Madhya Pradesh.",
    fullDescription:
      "Under Vikram Singh Chauhan's leadership as Deputy CM, Madhya Pradesh has seen an unprecedented push in road infrastructure. Over 2,400 km of new roads were built connecting remote villages to district headquarters. 14 new flyovers across Bhopal and Indore reduced commute times by 40%. Every gram panchayat now has an all-weather road — a first in the state's history.",
  },
  {
    imgPath: villageImg,
    imgEmoji: "🏘️",
    title: "Village Development Mission",
    badge: "02 · Gaon Vikas",
    tags: ["Village", "Rural", "Welfare"],
    shortDescription:
      "Transforming 58,000+ gram panchayats with modern amenities and self-reliance.",
    fullDescription:
      "The Village Development Mission brought piped water, electricity, and digital connectivity to 58,189 gram panchayats. MNREGA Mission Unnati trained 1.2 lakh villagers in skilled trades, lifting thousands of families out of poverty. Recognised by the Central Government as a model programme.",
  },
  {
    imgPath: farmersImg,
    imgEmoji: "👨‍🌾",
    title: "Kisan Samridhi Abhiyan",
    badge: "03 · Farmer Welfare",
    tags: ["Kisan", "Agriculture", "Welfare"],
    shortDescription:
      "Doubling farmer income through fair price, better seeds, and direct support.",
    fullDescription:
      "Kisan Samridhi Abhiyan directly benefited 34 lakh farmers across Madhya Pradesh. Minimum Support Price was guaranteed on 14 crops — the highest in state history. Organic farming clusters were set up in 12 districts, creating export opportunities.",
  },
];

function Projects() {
  useEffect(() => {
    if (!document.getElementById("bjp-proj-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-proj-styles";
      tag.innerHTML = projectStyles;
      document.head.appendChild(tag);
    }
    return () => {
      document.getElementById("bjp-proj-styles")?.remove();
    };
  }, []);

  return (
    <section className="bjp-projects-section">
      <Particle />
      <Container>
        <div className="bjp-projects-header">
          <div className="bjp-projects-tag">विजन और कार्य</div>
          <h1 className="project-heading">
            Vision & <span className="purple">Work</span>
          </h1>
          <div className="saffron-divider">
            <span />
            <span />
            <span />
          </div>
          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.95em",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: "1.75",
            }}
          >
            Real work. Real impact. Every initiative backed by data, driven by
            people, built for a stronger Madhya Pradesh.
          </p>
        </div>
        <Row style={{ justifyContent: "center" }}>
          {initiatives.map((item, i) => (
            <Col md={4} className="project-card" key={i}>
              <ProjectCard {...item} />
            </Col>
          ))}
        </Row>
        <p className="bjp-projects-footer-note">
          ✦ Click any card to read the full story
          <span> · जनता की सेवा, हमारा संकल्प</span>
        </p>
      </Container>
    </section>
  );
}

export default Projects;
