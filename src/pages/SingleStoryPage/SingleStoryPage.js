import React from "react";
import "./SingleStoryPage.css";
import { useParams } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";

//single story components
import SingleStoryLeftContent from "../../components/SingleStory/SingleStoryLeftContent/SingleStoryLeftContent";
import SingleStoryMainContent from "../../components/SingleStory/SingleStoryMainContent/SingleStoryMainContent";
import SingleStoryRightContent from "../../components/SingleStory/SingleStoryRightContent/SingleStoryRightContent";

export default function SingleStoryPage() {
  const { id } = useParams();
  return (
    <Container fluid>
      <Row className="overflow-hidden">
        <Col lg={3} md={3} className="d-none d-lg-block">
          <SingleStoryLeftContent />
        </Col>
        <Col className="custom-main-content">
          <SingleStoryMainContent />
        </Col>
        <Col lg={3} md={3} className="d-none d-lg-block">
          <SingleStoryRightContent />
        </Col>
      </Row>
    </Container>
  );
}
