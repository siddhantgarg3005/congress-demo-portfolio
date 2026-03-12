import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreativeCard from "./CreativeCard";
import creativeProjects from "./CreativeData";

function CreativeLab() {

    return (

        <Container fluid className="creative-section">

            <Container>

                <h1 className="creative-heading">
                    Creative <strong className="purple">Visual Lab</strong>
                </h1>

                <p className="creative-subtitle">
                    A curated collection of visual experiments exploring
                    behavioral psychology, brand positioning and digital systems.
                </p>

                <Row className="creative-grid">

                    {creativeProjects.map((project, index) => (

                        <Col lg={4} md={6} sm={12} key={index} className="creative-grid-col">

                            <CreativeCard
                                title={project.title}
                                description={project.description}
                                images={project.images}
                            />

                        </Col>

                    ))}

                </Row>

            </Container>

        </Container>

    );
}

export default CreativeLab;