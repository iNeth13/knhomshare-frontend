import React, { useEffect, useLayoutEffect } from "react";
import "./MainContainer.css";

import { Row, Col } from "react-bootstrap";

import { FiEdit3 } from "react-icons/fi";

import MainStoriesLoader from "../ContentLoaders/MainStoriesLoader";
import Story from "../Story/Story";
import { useStoryContext } from "../../context/provider/storyContext";

export default function MainContainer() {
  const {
    popularStories,
    newestStories,
    handleNewestStories,
    nLoading,
  } = useStoryContext();
  useEffect(() => {
    handleNewestStories();
  }, []);
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
        {nLoading ? (
          <div style={{ overflow: "hidden" }}>
            <MainStoriesLoader />
          </div>
        ) : (
          <Story stories={newestStories || []} mainContainer />
        )}
      </Col>
    </Row>
  );
}
