import React, { useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
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
    handlePopularStories,
    sLoading,
    popularStories,
    handleResetEachTopicStories,
  } = useStoryContext();
  const { handleFollowTopic } = useTopicContext();
  const { handleCurrentUser, currentUser = {} } = useUserContext();
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
      <Helmet>
        <title>{topic} Section</title>
        <meta name="description" content={`${topicDes}`} />
        <meta property="image" content="src/assets/brand.png" />
        <meta
          property="url"
          content={`https://knhomshare.cam/topic/${topic.toLowerCase()}`}
        />
        <meta property="title" content={`${topic} Section`} />
        <meta name="og:description" content={`${topicDes}`} />
        <meta property="og:image" content="src/assets/brand.png" />
        <meta
          property="og:url"
          content={`https://knhomshare.cam/topic/${topic.toLowerCase()}`}
        />
        <meta property="og:title" content={`${topic} Section`} />
        <link
          rel="canonical"
          href={`https://knhomshare.cam/topic/${topic.toLowerCase()}`}
        />
      </Helmet>
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
