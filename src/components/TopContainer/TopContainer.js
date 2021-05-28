import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgBook from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";
import imgFirm from "../../assets/topicImage/art-entertainment/filmLogo.jpeg";
import imgGaming from "../../assets/topicImage/art-entertainment/gamingLogo.jpeg";
import imgMusic from "../../assets/topicImage/art-entertainment/musicLogo.jpeg";
import imgFood from "../../assets/topicImage/culture/foodLogo.jpeg";
import imgStyle from "../../assets/topicImage/culture/styleLogo.jpeg";
import imgTravel from "../../assets/topicImage/culture/travelLogo.jpeg";
import imgCorona from "../../assets/topicImage/health/coronaVirusLogo.png";
import imgFitness from "../../assets/topicImage/health/fitnessLogo.jpeg";
import imgHealth from "../../assets/topicImage/health/healthLogo.jpeg";
import imgMentalHealth from "../../assets/topicImage/health/mentalHealthLogo.jpeg";
import imgJS from "../../assets/topicImage/programming/jsLogo.png";
import imgProgramming from "../../assets/topicImage/programming/programmingLogo.jpeg";
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
                    <Link
                      to={`/story/${popularStories && popularStories[0]._id}`}
                    >
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
                      />
                    </Link>

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
                  <Link
                    to={`/story/${popularStories && popularStories[0]._id}`}
                  >
                    <h5 style={{ overflow: "hidden" }}>
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
            <Col lg={6} md={6} sm={6} xs={12} className="border-right">
              <Suspense fallback={<RecommendLoader />}>
                <Story
                  stories={popularStories?.slice(1, 4)}
                  topContainer
                  sLoading={sLoading}
                  currentUser={currentUser}
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
                    image =
                      topic.toLowerCase() === "book"
                        ? imgBook
                        : topic.toLowerCase() === "film"
                        ? imgFirm
                        : topic.toLowerCase() === "gaming"
                        ? imgGaming
                        : topic.toLowerCase() === "music"
                        ? imgMusic
                        : topic.toLowerCase() === "food"
                        ? imgFood
                        : topic.toLowerCase() === "style"
                        ? imgStyle
                        : topic.toLowerCase() === "travel"
                        ? imgTravel
                        : topic.toLowerCase() === "coronavirus"
                        ? imgCorona
                        : topic.toLowerCase() === "fitness"
                        ? imgFitness
                        : topic.toLowerCase() === "health"
                        ? imgHealth
                        : topic.toLowerCase() === "mental-health"
                        ? imgMentalHealth
                        : topic.toLowerCase() === "javascript"
                        ? imgJS
                        : topic.toLowerCase() === "programming"
                        ? imgProgramming
                        : imgMentalHealth;
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
