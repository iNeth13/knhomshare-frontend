import React from "react";
import "./EachTopicHeader.css";

import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoryContext } from "../../../context/provider/storyContext";

export default function EachTopicHeader({
  sLoading,
  popularStories = [],
  topic,
}) {
  if(topic==='mental-health'){
    topic= 'Mental Health'
  }
  const { totalStories } = useStoryContext();
  const mainStory = popularStories.length > 0 ? popularStories.slice(0, 1) : {};
  console.log(totalStories);
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
            <div>Loading</div>
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
              <Button size="sm" variant="outline-success" className="ml-5">
                Follow
              </Button>
            </div>
            <p style={{ textTransform: "uppercase", fontSize: "12px" }}>
              Total Stories : {totalStories && totalStories}
            </p>
            <p>
              From building your vocabulary to reducing stress, preventing
              age-related cognitive decline and increasing your ability to
              empathize, reading books is an easy way to look after your mind
              and body.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
