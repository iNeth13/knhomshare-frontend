import React from "react";
import "./MainContainer.css";

import { Row, Col } from "react-bootstrap";

import { FiEdit3 } from "react-icons/fi";
import Story from "../Story/Story";

import { useStoryContext } from "../../context/provider/storyContext";

export default function MainContainer() {
  const { stories } = useStoryContext();
  return (
    <Row>
      <Col lg={8} md={8} sm={12} xs={12}>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "16px",
            width: "100%",
            paddingTop: "2rem",
          }}
        >
          <FiEdit3 /> Newest Stories
        </p>
        <Story stories={stories} mainContainer />
      </Col>
    </Row>
  );
}
