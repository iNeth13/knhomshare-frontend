import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";
import openSocket from "socket.io-client";

import "./TopContainer.css";

import { Container, Row, Col, Image, Button } from "react-bootstrap";

//contextAPI
import { useAuthorContext } from "../../context/provider/authorContext";
import { useStoryContext } from "../../context/provider/storyContext";
import { useTopicContext } from "../../context/provider/topicContext";

//content loaders
import RecommendLoader from "../ContentLoaders/RecommendLoader";
import TopMainStoryLoader from "../ContentLoaders/TopMainStoryLoader";

//components for top homepage
//components using react.lazy();

//this will show recommend stories and authors
import Recommend from "../Recommend/Recommend";
import changeDateFormat from "../utils/changeDateFormat";
import ErrorBanner from "../ErrorBanner/ErrorBanner";
import { useUserContext } from "../../context/provider/userContext";
//this will show popular stories
const Story = React.lazy(() => import("../Story/Story"));

export default function TopContainer() {
  const { handleRecommendAuthor, recommendedAuthors, aLoading } =
    useAuthorContext();
  const { handlePopularStories, sLoading, popularStories } = useStoryContext();
  const { handleRecommendTopic, recommendedTopic, tLoading } =
    useTopicContext();
  const { handleCurrentUser, currentUser = {} } = useUserContext();
  const newDateFormat = changeDateFormat(
    popularStories && popularStories[0].createdAt
  );

  const { date, day, month, hourAndMinute, year } = newDateFormat;
  useEffect(() => {
    handleRecommendAuthor();
    handlePopularStories();
    handleRecommendTopic();
    handleCurrentUser();
  }, []);
  return (
    <div className="">
      <Row style={{ minHeight: "466px" }}>
        <Col lg={8} md={12} sm={12} xs={12}>
          <Row>
            <Col lg={6} md={6} sm={6} xs={12} style={{ overflow: "hidden" }}>
              {sLoading ? (
                <div>
                  <TopMainStoryLoader />
                </div>
              ) : (
                <div>
                  <Link
                    to={`/story/${popularStories && popularStories[0]._id}`}
                  >
                    <div className="main-story-image-container">
                      <Image
                        src={`${process.env.REACT_APP_DEFAULT_URL}/${
                          popularStories && popularStories[0].content.images[0]
                        }`}
                        className="main-story-image"
                      />
                    </div>
                  </Link>
                  <div className="by-info-container d-flex align-items-center">
                    <Image
                      style={{
                        height: "25px",
                        width: "25px",
                        marginRight: "5px",
                      }}
                      src={`${process.env.REACT_APP_DEFAULT_URL}/${
                        popularStories && popularStories[0].user.profilePic
                      }`}
                      rounded
                      onClick={() => console.log("to sth")}
                    />

                    <span className="by-info">
                      {popularStories && popularStories[0].user.username}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        opacity: "0.6",
                        marginLeft: "1rem",
                      }}
                    >
                      {day} {date} {month} {year} {hourAndMinute}
                    </span>
                  </div>
                  <Link>
                    <h5
                      style={{ overflow: "hidden" }}
                      onClick={() => console.log("to sth")}
                    >
                      {popularStories && popularStories[0].title.length >= 99
                        ? popularStories && popularStories[0].title.slice(0, 95)
                        : popularStories && popularStories[0].title}
                    </h5>
                    <p onClick={() => console.log("to sth")}>
                      {popularStories &&
                        popularStories[0].subtitle.slice(0, 100)}
                      ...
                    </p>
                  </Link>
                </div>
              )}
            </Col>
            <Col
              lg={6}
              md={6}
              sm={6}
              xs={12}
              style={{ borderRight: "1px solid grey" }}
            >
              <Suspense fallback={<RecommendLoader />}>
                <Story
                  stories={popularStories?.slice(1, 4)}
                  topContainer
                  sLoading={sLoading}
                />
              </Suspense>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={12} sm={12} xs={12}>
          <div className="d-flex flex-column custom-md">
            {/*recommended authors*/}
            <div className="azw1d">
              <p
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
                className="b-shadow"
              >
                Authors To Follow
              </p>
              {aLoading
                ? [1, 2, 3].map((number, index) => (
                    <RecommendLoader key={index} />
                  ))
                : recommendedAuthors?.map((author, index) => {
                    const { bio, profilePic, username, _id } = author;
                    console.log(_id);
                    return (
                      <Recommend
                        bio={bio}
                        image={profilePic}
                        name={username}
                        recommendedType="author"
                        key={index}
                        currentUser={currentUser}
                        authorId={_id}
                      />
                    );
                  })}
            </div>
            {/*recommended topics*/}
            <div className="azw1d">
              <p
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
                className="b-shadow"
              >
                Topics To Follow{" "}
                <Link to="/topics">
                  <span
                    style={{
                      marginLeft: "1rem",
                      opacity: "0.5",
                      fontSize: "10px",
                    }}
                  >
                    MORE...
                  </span>
                </Link>
              </p>
              {tLoading
                ? [1, 2, 3].map((number, index) => (
                    <RecommendLoader key={index} />
                  ))
                : recommendedTopic?.map((t, index) => {
                    let image;
                    let { topic } = t;
                    image = topic.toLowerCase() === "book" ? img : "";
                    return (
                      <Recommend
                        image={image}
                        name={topic}
                        recommendedType="topic"
                        key={index}
                        currentUser={currentUser}
                      />
                    );
                  })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
