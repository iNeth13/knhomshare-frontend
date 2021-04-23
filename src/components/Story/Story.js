import React from "react";
import { Link } from "react-router-dom";
import "./Story.css";

import { Col, Row, Image } from "react-bootstrap";

//this component is for every single story
export default function Story({ stories, topContainer, mainContainer }) {
  return (
    <Row className="cos-row">
      {stories.map((story) => {
        const { title, image, userImage, user, content } = story;
        return (
          <Col lg={12} md={12} md={12} sm={12} style={{ minHeight: "140px" }}>
            <Link>
              <div className="story-user-info-container">
                <Image
                  style={{ height: "25px", width: "25px", marginRight: "5px" }}
                  src={userImage}
                  rounded
                  onClick={() => console.log("to sth")}
                />

                <span className="by-info">@{user}</span>
                <span className="ml-3">date</span>
              </div>
            </Link>
            <Link>
              <div className="story-info-container">
                <div className="story-left-info">
                  <h6 className={`${mainContainer? 'mb-3' : 'mb-0'}`}>
                    {topContainer ? title.slice(0, 70) : title.slice(0,100)}
                  </h6>
                  <p className={`${!mainContainer? 'd-none' : ''}`}>{content.slice(0,200)}...</p>
                </div>
                <div className="story-right-info">
                  <Image src={image} style={{ width: "100%" }} />
                </div>
              </div>
              <p className={`${mainContainer? 'd-none' : ''}`}>
                {topContainer ? content.slice(0, 100) : content.slice(0, 100)}
                ...
              </p>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
