import React, { useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import favIcon from "../../assets/knhomShare.ico";
import "./EachTopicPage.css";

//import EachTopicContaienr from "../../components/EachTopic/EachTopicContainer/EachTopicContaienr";
//import EachTopicHeader from "../../components/EachTopic/EachTopicHeader/EachTopicHeader";

import { useStoryContext } from "../../context/provider/storyContext";

import { Container } from "react-bootstrap";

const EachTopicHeader = React.lazy(() =>
  import("../../components/EachTopic/EachTopicHeader/EachTopicHeader")
);
const EachTopicContaienr = React.lazy(() =>
  import("../../components/EachTopic/EachTopicContainer/EachTopicContaienr")
);

export default function EachTopicPage({ topic }) {
  const { handleEachTopic, handlePopularStories, sLoading, popularStories,handleResetEachTopicStories } =
    useStoryContext();
  useEffect(() => {
    handlePopularStories(topic);
  }, []);
  console.log(useLocation());
  useEffect(() => {
    handleResetEachTopicStories()
  }, [useLocation().pathname]);
  console.log(sLoading, popularStories);
  return (
    <Container fluid="lg md sm">
      <Suspense fallback={<div></div>}>
        <EachTopicHeader
          sLoading={sLoading}
          popularStories={popularStories}
          topic={topic}
        />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <EachTopicContaienr topic={topic} />
      </Suspense>
    </Container>
  );
}
