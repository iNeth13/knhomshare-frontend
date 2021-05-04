import React from "react";
import "./SearchResult.css";
import { Container } from "react-bootstrap";

import { useStoryContext } from "../../context/provider/storyContext";

import MainContainer from "../../components/MainContainer/MainContainer";

export default function StorySearch() {
  const {} = useStoryContext();
  return (
    <Container fluid="lg md sm">
      <MainContainer containerTitle="Search Result" />
    </Container>
  );
}
