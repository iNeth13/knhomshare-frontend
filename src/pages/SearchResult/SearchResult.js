import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./SearchResult.css";
import { Container, Row, Col } from "react-bootstrap";

import { useStoryContext } from "../../context/provider/storyContext";

import Story from "../../components/Story/Story";
import MainStoriesLoader from "../../components/ContentLoaders/MainStoriesLoader";
import TopStoriesLoader from "../../components/ContentLoaders/TopStoriesLoader";

export default function StorySearch() {
  const {
    handleStorySearch,
    storySearchResult,
    sLoading,
    handleResetStorySearch,
  } = useStoryContext();
  const { keyword } = useParams();
  const [page, setPage] = useState(4);
  const [intersecting, setIntersecting] = useState(false);
  const loader = useRef(null);
  console.log(storySearchResult);
  const handleObserver = (entities) => {
    const target = entities[0];
    console.log(target);
    if (target.isIntersecting) {
      setPage((prev) => prev + 3);
    }
  };
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    setIntersecting(true);
  }, []);
  useEffect(() => {
    handleStorySearch(page, keyword);
  }, [keyword, page]);

  useEffect(() => {
    handleResetStorySearch();
  }, [keyword]);

  console.log(intersecting);
  return (
    <Container fluid="lg md sm">
      <Row>
        <Col lg={8} md={8} sm={12} xs={12}>
          <h6 style={{ textTransform: "uppercase" }}>Search Result</h6>
          <Story mainContainer stories={storySearchResult} />
          <div ref={loader}>{sLoading && <MainStoriesLoader />}</div>
          {!sLoading && storySearchResult?.length === 0 && (
            <p style={{ marginTop: "2rem" }}>
              Sorry no story matched your keyword, please try again.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
