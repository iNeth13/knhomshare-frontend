import React, { useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import "./EachTopicPage.css";

//import EachTopicContaienr from "../../components/EachTopic/EachTopicContainer/EachTopicContaienr";
//import EachTopicHeader from "../../components/EachTopic/EachTopicHeader/EachTopicHeader";

import { Container } from "react-bootstrap";

import { useStoryContext } from "../../context/provider/storyContext";
import { useTopicContext } from "../../context/provider/topicContext";
import { useUserContext } from "../../context/provider/userContext";

const EachTopicHeader = React.lazy(() =>
  import("../../components/EachTopic/EachTopicHeader/EachTopicHeader")
);
const EachTopicContaienr = React.lazy(() =>
  import("../../components/EachTopic/EachTopicContainer/EachTopicContaienr")
);

export default function EachTopicPage({ topic, topicDes }) {
  const {
    handleEachTopic,
    handlePopularStories,
    sLoading,
    popularStories,
    handleResetEachTopicStories,
  } = useStoryContext();
  const { handleFollowTopic } = useTopicContext();
  const {
    handleCurrentUser,
    currentUser = {},
    currentUserLoading,
  } = useUserContext();
  useEffect(() => {
    handlePopularStories(topic);
    handleCurrentUser();
  }, []);
  useEffect(() => {
    handleResetEachTopicStories();
  }, [useLocation().pathname]);
  console.log(topic);
  return (
    <Container fluid="lg md sm">
      <Suspense fallback={<div></div>}>
        <EachTopicHeader
          sLoading={sLoading}
          popularStories={popularStories}
          topic={topic}
          topicDes={topicDes}
          currentUser={currentUser}
        />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <EachTopicContaienr topic={topic} />
      </Suspense>
    </Container>
  );
}
