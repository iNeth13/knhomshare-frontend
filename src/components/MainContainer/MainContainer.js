import React, { useEffect, useRef, useState } from "react";
import "./MainContainer.css";

import { Link, useParams } from "react-router-dom";

import { Row, Col, Button, Container } from "react-bootstrap";
import openSocket from "socket.io-client";
import { FiEdit3 } from "react-icons/fi";

import MainStoriesLoader from "../ContentLoaders/MainStoriesLoader";
import Story from "../Story/Story";
import topics from "../../constants/topics";
import { useStoryContext } from "../../context/provider/storyContext";

export default function MainContainer() {
  const { newestStories, handleNewestStories, nLoading } = useStoryContext();
  const [page, setPage] = useState(3);
  const [allTopics, setAlltopics] = useState();
  let loader = useRef(null);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 3);
    }
  };
  const getAllTopics = () => {
    let tempTopics = [];
    topics.map((item) => {
      item.topicList.map((i) => tempTopics.push(i.topic));
    });
    tempTopics = tempTopics.sort((a, b) => a.localeCompare(b));
    setAlltopics(tempTopics);
  };
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "100px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    handleNewestStories(3);
    getAllTopics();
    let socket = openSocket(process.env.REACT_APP_DEFAULT_URL);
    socket.on("posts", (data) => {
      if (data.story && page < 4) {
        handleNewestStories(3);
      } else {
        return null;
      }
    });
  }, []);

  useEffect(() => {
    handleNewestStories(page);
  }, [page]);
  return (
    <Row style={{ minHeight: "200px" }}>
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
        <Story stories={newestStories || []} mainContainer />
        <div ref={loader}>{nLoading && <MainStoriesLoader />}</div>
      </Col>
      <Col style={{ overflow: "visible" }}>
        <div className="float-right-content ">
          <p
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              width: "100%",
              paddingTop: "2rem",
              fontSize: "12px",
            }}
          >
            Browse stories by Topics
          </p>
          <div
            style={{
              borderBottom: "1px solid grey",
              paddingBottom: "1.2rem",
            }}
          >
            {allTopics?.map((topic, index) => (
              <Link
                to={`/topic/${topic.split("=").join("-").toLowerCase()}`}
                key={index}
              >
                <Button variant="outline-dark" size="sm" className="m-1">
                  {topic}
                </Button>
              </Link>
            ))}
          </div>
          <div
            style={{
              fontSize: "14px",
              opacity: "0.7",
              marginTop: "1.2rem",
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
