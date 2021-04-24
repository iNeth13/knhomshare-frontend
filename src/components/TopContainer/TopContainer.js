import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";

import "./TopContainer.css";

import { Container, Row, Col, Image } from "react-bootstrap";
//import Recommend from "../Recommend/Recommend";
import TopStoriesLoader from "../ContentLoaders/TopStoriesLoader";
//components for top homepage
//this will show popular stories

const Story = React.lazy(() => import("../Story/Story"));
const Recommend = React.lazy(() => import("../Recommend/Recommend"));

export default function TopContainer() {
  let name = "inetca";
  let title =
    "title title title title title title  title title titletitletitletitletitletitletitletitletitletitle";
  console.log(title.length);
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
  let recommendAuthors = [
    {
      name: "author1",
      image: img,
      bio: "write something here",
    },
    {
      name: "author1",
      image: img,
      bio: "write something here",
    },
    {
      name: "author1",
      image: img,
      bio: "write something here",
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
              <Link to="#">
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
              <Suspense fallback={<TopStoriesLoader />}>
                <Story stories={stories} topContainer />
              </Suspense>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={12} sm={12} xs={12}>
          <div className="d-flex flex-column custom-md">
            {/*recommended authors*/}
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Authors To Follow
            </p>
            <Suspense fallback={<TopStoriesLoader />}>
              {recommendAuthors.map((author) => {
                const { bio, image, name } = author;
                return (
                  <Recommend
                    bio={bio}
                    image={image}
                    name={name}
                    recommendedType="author"
                  />
                );
              })}
            </Suspense>
            {/*recommended topics*/}
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Topics To Follow
            </p>
            <Suspense fallback={<TopStoriesLoader />}>
              {recommendAuthors.map((author) => {
                const { bio, image, name } = author;
                return (
                  <Recommend
                    bio={bio}
                    image={image}
                    name={name}
                    recommendedType="author"
                  />
                );
              })}
            </Suspense>
          </div>
        </Col>
      </Row>
    </div>
  );
}
