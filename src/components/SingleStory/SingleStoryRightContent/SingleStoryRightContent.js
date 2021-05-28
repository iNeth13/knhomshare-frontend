import React, { useEffect } from "react";
import { useTopicContext } from "../../../context/provider/topicContext";
import MainStoriesLoader from "../../ContentLoaders/MainStoriesLoader";
import Story from "../../Story/Story";

export default function SingleStoryRightContent({
  singleStory = {},
  sLoading,
}) {
  const { handleRelatedStories, relatedStories, tLoading } = useTopicContext();
  useEffect(() => {
    handleRelatedStories(singleStory.topics);
  }, [singleStory]);
  return (
    <div style={{ position: "sticky", top: "100px" }}>
      <p
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Related Stories
      </p>
      {tLoading || sLoading ? (
        <MainStoriesLoader />
      ) : (
        <Story stories={relatedStories} related />
      )}
    </div>
  );
}
