import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import AboutCard from "./AboutCard";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Github from "./Github";

import modiImg from "../../Assets/Gallery/gallery-2.png";
import ashokaImg from "../../Assets/ashoka-chakra.svg";

const aboutStyles = `

.bjp-about-page{
position:relative;
padding:100px 0 60px;
min-height:100vh;
overflow:hidden;
}

/* brighter background glow */

.bjp-about-page::before{
content:"";
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
background:radial-gradient(circle at top, rgba(255,153,51,0.08), transparent 60%);
pointer-events:none;
}

/* rotating chakra */

.bjp-about-ashoka-bg{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:80vmin;
opacity:0.03;
pointer-events:none;
animation:ashokaRotate 90s linear infinite;
}

@keyframes ashokaRotate{
to{transform:translate(-50%,-50%) rotate(360deg);}
}

/* photo */

.bjp-about-photo{
width:100%;
max-width:420px;
border-radius:22px;
object-fit:cover;
aspect-ratio:4/5;
box-shadow:0 25px 60px rgba(0,0,0,0.45);
transition:transform .45s ease, box-shadow .45s ease;
}

.bjp-about-photo:hover{
transform:translateY(-8px) scale(1.02);
box-shadow:0 35px 80px rgba(255,153,51,0.35);
}

/* MODI IMAGE */

.bjp-modi-img{
width:100%;
max-width:520px;
border-radius:22px;
object-fit:cover;
aspect-ratio:16/9;
margin-top:20px;
box-shadow:0 25px 70px rgba(0,0,0,0.55);
border:1px solid rgba(255,153,51,0.35);
transition:all .45s ease;
animation:modiFade 1.2s ease;
}

.bjp-modi-img:hover{
transform:scale(1.03);
box-shadow:0 35px 90px rgba(255,153,51,0.35);
}

@keyframes modiFade{
from{
opacity:0;
transform:translateY(40px);
}
to{
opacity:1;
transform:translateY(0);
}
}

`;

function About() {
  useEffect(() => {
    if (!document.getElementById("bjp-about-styles")) {
      const style = document.createElement("style");
      style.id = "bjp-about-styles";
      style.innerHTML = aboutStyles;

      document.head.appendChild(style);
    }

    return () => {
      const el = document.getElementById("bjp-about-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <section className="bjp-about-page">
      <Particle />

      <img src={ashokaImg} alt="" className="bjp-about-ashoka-bg" />

      <Container>
        {/* HEADER */}

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 className="project-heading">
            Know the <span className="purple">Journey</span>
          </h1>

          <div className="saffron-divider">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* PHOTO + CARD */}
        <Row className="align-items-center mb-5">
          <Col md={5} className="text-center">
            <img
              src={modiImg}
              alt="Vikram Singh Chauhan with Narendra Modi"
              className="bjp-modi-img"
            />
          </Col>

          <Col md={7}>
            <AboutCard />
          </Col>
        </Row>

        {/* CORE COMMITMENTS */}

        <h1 className="project-heading">
          Core <span className="purple">Commitments</span>
        </h1>

        <div className="saffron-divider">
          <span />
          <span />
          <span />
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Techstack />
        </Row>

        {/* AWARDS */}

        <h1 className="project-heading">
          Awards & <span className="purple">Recognition</span>
        </h1>

        <div className="saffron-divider">
          <span />
          <span />
          <span />
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Toolstack />
        </Row>

        <Github />
      </Container>
    </section>
  );
}

export default About;
