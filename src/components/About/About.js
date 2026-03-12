import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Github from "./Github";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";

function About() {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            color: "#fff",
            fontSize: "2.4em",
            marginBottom: "40px",
          }}
        >
          About <span style={{ color: "#0055A5" }}>Priya Sharma Yadav</span>
        </h2>
        <Row>
          <Col md={7}>
            <Techstack />
          </Col>
          <Col md={5}>
            <Toolstack />
          </Col>
        </Row>
        <Github />
      </Container>
    </section>
  );
}

export default About;
