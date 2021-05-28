import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import "./EachTopicHeader.css";

import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoryContext } from "../../../context/provider/storyContext";
import useTopicFollow from "../../utils/useTopicFollow";
import { useUserContext } from "../../../context/provider/userContext";
import EachTopicMainStoryLoader from "../../ContentLoaders/EachTopicMainStoryLoader";

export default function EachTopicHeader({
  sLoading,
  popularStories = [],
  topic,
  topicDes,
  currentUser = {},
}) {
  if (topic === "Mental-health") {
    topic = "Mental Health";
  }
  const { totalStories } = useStoryContext();
  const { user } = useUserContext();
  const [followedTopics, handleFollowTopic] = useTopicFollow(currentUser);
  const mainStory = popularStories.length > 0 ? popularStories.slice(0, 1) : {};
  return (
    <div className="each-topic-header-container">
      <Row>
        <Col
          lg={{ span: 8, order: 1 }}
          md={{ span: 8, order: 1 }}
          sm={{ span: 7, order: 1 }}
          xs={{ span: 12, order: 2 }}
        >
          {sLoading ? (
            <div style={{ overflow: "hidden" }}>
              <EachTopicMainStoryLoader />
            </div>
          ) : (
            <div className="each-topic-left-container">
              {console.log(mainStory[0])}
              <div className="each-topic-main-image-container">
                <Link to={`/story/${mainStory[0]._id}`}>
                  <Image
                    src={`${process.env.REACT_APP_DEFAULT_URL}/${mainStory[0].content.images[0]}`}
                    className="each-topic-main-image"
                    rounded
                  />
                </Link>
              </div>
              <div>
                <Link to={`/story/${mainStory[0]._id}`}>
                  <h5 className="mt-3">{mainStory[0].title}</h5>
                </Link>
                <Link to={`/story/${mainStory[0]._id}`}>
                  <p>{mainStory[0].subtitle}</p>
                </Link>
              </div>
            </div>
          )}
        </Col>
        <Col
          lg={{ span: 4, order: 2 }}
          md={{ span: 4, order: 2 }}
          sm={{ span: 5, order: 2 }}
          xs={{ span: 12, order: 1 }}
        >
          <div className="each-topic-right-container ml-4">
            <div className="d-flex align-items-center mb-2 ">
              <h6 style={{ textTransform: "uppercase", marginBottom: "0" }}>
                {topic}
              </h6>
              {followedTopics?.includes(topic) ? (
                <Button
                  size="sm"
                  variant="outline-success"
                  className="ml-5"
                  onClick={() =>
                    handleFollowTopic(
                      user && user.userId,
                      user && user.token,
                      topic,
                      "unfollow"
                    )
                  }
                >
                  Followed
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline-success"
                  className="ml-5"
                  onClick={() =>
                    handleFollowTopic(
                      user && user.userId,
                      user && user.token,
                      topic,
                      "follow"
                    )
                  }
                  disabled={user ? false : true}
                >
                  Follow
                </Button>
              )}
            </div>
            <p style={{ textTransform: "uppercase", fontSize: "12px" }}>
              Total Stories : {totalStories && totalStories}
            </p>
            <p
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                paddingBottom: "2rem",
              }}
            >
              {topicDes}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
