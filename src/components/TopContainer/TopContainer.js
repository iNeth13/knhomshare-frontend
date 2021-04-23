import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";

import "./TopContainer.css";

import { Container, Row, Col, Image } from "react-bootstrap";
import Story from "../Story/Story";
import Recommend from "../Recommend/Recommend";
//components for top homepage
//this will show popular stories

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
            <Col lg={6} md={6} sm={6} xs={12} style={{borderRight:'1px solid grey'}}>
              <Story stories={stories} topContainer />
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={12} sm={12} xs={12}>
          <div className="d-flex flex-column custom-md">
            {/*recommended authors*/}
            <Recommend
              recommendedData={recommendAuthors}
              recommendedType="author"
            />
            {/*recommended topics*/}
            <Recommend
              recommendedData={recommendTopics}
              recommendedType="topic"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
