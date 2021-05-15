import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import "./EachTopicContainer.css";

import { Row, Col, Button } from "react-bootstrap";

import { useStoryContext } from "../../../context/provider/storyContext";
import MainStoriesLoader from "../../ContentLoaders/MainStoriesLoader";
import Story from "../../Story/Story";

export default function EachTopicContaienr(topic) {
  const { handleEachTopic, eachTopicLoading, eachTopicStories } =
    useStoryContext();
  const loader = useRef(null);
  const [page, setPage] = useState(3);
  const handleObserver = (entities) => {
    const target = entities[0];
    console.log(target);
    if (target.isIntersecting) {
      setPage((prev) => prev + 4);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
      root: null,
      rootMargin: "100px",
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    handleEachTopic(topic.topic, 3);
  }, []);
  useEffect(() => {
    handleEachTopic(topic.topic, page);
  }, [page]);
  return (
    <Row style={{ minHeight: "200px" }}>
      <Col
        lg={{ span: 8, order: 1 }}
        md={{ span: 8, order: 1 }}
        sm={{ span: 12, order: 2 }}
        xs={{ span: 12, order: 2 }}
        style={{ overflow: "hidden" }}
      >
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "16px",
            width: "100%",
            paddingTop: "2rem",
          }}
        >
          <FiEdit3 /> Newest Stories about Book
        </p>
        <Story stories={eachTopicStories || []} mainContainer />
        <div ref={loader}>{eachTopicLoading && <MainStoriesLoader />}</div>
      </Col>
      <Col
        style={{ overflow: "visible" }}
        xs={{ span: 12, order: 1 }}
        lg={{ span: 4, order: 2 }}
        md={{ span: 4, order: 2 }}
        sm={{ span: 12, order: 1 }}
      >
        <div className="float-right-content">
          <div
            style={{
              fontSize: "14px",
              opacity: "0.7",
              paddingTop: "2rem",
            }}
          >
            <Link to="/about" style={{ marginRight: "1rem" }}>
              About
            </Link>
            <Link to="/creator">Creator</Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}
