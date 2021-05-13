import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";

import "./TopContainer.css";

import { Container, Row, Col, Image } from "react-bootstrap";

//contextAPI
import { useAuthorContext } from "../../context/provider/authorContext";
import { useStoryContext } from "../../context/provider/storyContext";

//content loaders
import RecommendLoader from "../ContentLoaders/RecommendLoader";

//components for top homepage
//components using react.lazy();

//this will show recommend stories and authors
import Recommend from "../Recommend/Recommend";
//this will show popular stories
const Story = React.lazy(() => import("../Story/Story"));

export default function TopContainer() {
  const { handleRecommendAuthor, recommendedAuthors, aLoading } =
    useAuthorContext();
  const { handlePopularStories, sLoading, popularStories } = useStoryContext();
  let name = "inetca";
  let title =
    "title title title title title title  title title titletitletitletitletitletitletitletitletitletitle";
  let content =
    "title title title title title title  title title titletitletitletitletitletitletitletitletitletitle";
  let stories = [
    {
      user: "user",
      userImage: img,
      image: img,
      title,
      content,
    },
    {
      user: "user",
      userImage: img,
      image: img,
      title,
      content,
    },
    {
      user: "user",
      userImage: img,
      image: img,
      title,
      content,
    },
  ];

  let recommendTopics = [
    {
      name: "author1",
      image: img,
    },
    {
      name: "author1",
      image: img,
    },
    {
      name: "author1",
      image: img,
    },
  ];
  useEffect(() => {
    handleRecommendAuthor();
    handlePopularStories();
  }, []);
  console.log(recommendedAuthors);
  return (
    <div className="">
      <Row style={{ minHeight: "466px" }}>
        <Col lg={8} md={12} sm={12} xs={12}>
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Link>
                <div className="main-story-image-container">
                  <Image src={img} className="w-100 main-story-image" />
                </div>
              </Link>
              <div className="by-info-container">
                <Image
                  style={{ height: "25px", width: "25px", marginRight: "5px" }}
                  src={img}
                  rounded
                  onClick={() => console.log("to sth")}
                />

                <span className="by-info">@{name}</span>
              </div>
              <Link>
                <h5
                  style={{ overflow: "hidden" }}
                  onClick={() => console.log("to sth")}
                >
                  {title.length >= 99 ? title.slice(0, 95) : title}
                </h5>
                <p onClick={() => console.log("to sth")}>
                  {content.slice(0, 80)}...
                </p>
              </Link>
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
                    const { bio, profilePic, username } = author;
                    return (
                      <Recommend
                        bio={bio}
                        image={profilePic}
                        name={username}
                        recommendedType="author"
                        key={index}
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
                Topics To Follow
              </p>

              {recommendTopics.map((topic, index) => {
                const { image, name } = topic;
                return (
                  <Recommend
                    image={image}
                    name={name}
                    recommendedType="topic"
                    key={index}
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
