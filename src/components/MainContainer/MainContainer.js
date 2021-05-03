import React, { useEffect, useRef, useState } from "react";
import "./MainContainer.css";

import { Row, Col } from "react-bootstrap";
import openSocket from "socket.io-client";
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
    allStories,
  } = useStoryContext();
  const [page, setPage] = useState(3);
  const [newest, setNewest] = useState();
  let loader = useRef(null);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    handleNewestStories(3);
    let socket = openSocket(process.env.REACT_APP_DEFAULT_URL);
    console.log(newestStories);
    console.log(page === 3);
    console.log(socket);
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

  console.log(newestStories);
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
        <Story stories={newestStories || []} mainContainer />
        <div ref={loader}>{nLoading && <MainStoriesLoader />}</div>
      </Col>
    </Row>
  );
}
