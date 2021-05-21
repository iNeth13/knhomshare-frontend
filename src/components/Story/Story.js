import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import changeDateFormat from "../../components/utils/changeDateFormat";
import "./Story.css";

import { Col, Row, Image } from "react-bootstrap";

import TopStoriesLoader from "../ContentLoaders/TopStoriesLoader";
import AlertMessage from "../AlertMessage/AlertMessage";

//this component is for every single story
export default function Story({
  stories,
  topContainer,
  mainContainer,
  sLoading,
}) {
  return (
    <Row className="cos-row">
      {sLoading && topContainer ? (
        [1, 2, 3].map((number, index) => (
          <div style={{ overflow: "hidden" }}>
            <TopStoriesLoader key={index} />
          </div>
        ))
      ) : (
        <div>
          {stories?.map((story, index) => {
            const { title, user, content, createdAt, _id, subtitle } = story;
            const { username, profilePic } = user;
            const newDateFormat = changeDateFormat(createdAt);
            const { hourAndMinute, day, month, year, date } = newDateFormat;
            return (
              <Col
                lg={12}
                md={12}
                md={12}
                sm={12}
                style={{
                  minHeight: "150px",
                }}
                key={index}
              >
                {/* profile Pic , username and date */}
                <div>
                  <div className="story-user-info-container d-flex align-items-center">
                    <Image
                      style={{
                        height: "25px",
                        width: "25px",
                        marginRight: "5px",
                      }}
                      src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic} `}
                      rounded
                      onClick={() => console.log("to profile")}
                    />

                    <span
                      className="by-info"
                      style={{ fontSize: "16px" }}
                      onClick={() => console.log("to profile")}
                    >
                      {username}
                    </span>
                    <span
                      className=""
                      style={{
                        fontSize: "12px",
                        opacity: "0.6",
                        marginLeft: "1rem",
                      }}
                    >
                      {day} {date} {month} {year}
                      <span className="ml-2">{hourAndMinute}</span>
                    </span>
                  </div>
                </div>
                {/* main story including title , photo , paragraph */}
                <div style={{ width: "100%" }}>
                  <div className="story-info-container">
                    <div className="story-left-info">
                      <Link to={`/story/${_id}`}>
                        <h6 className={`${mainContainer ? "mb-3" : "mb-0"}`}>
                          {topContainer
                            ? title.slice(0, 70)
                            : title.slice(0, 100)}
                        </h6>
                      </Link>
                      {/*  this content will show on main container but hide on top container instead (for style purpose) */}
                      <Link to={`/story/${_id}`}>
                        <p
                          className={`${!mainContainer ? "d-none" : ""}`}
                          style={{ opacity: "0.8", fontSize: "16px" }}
                        >
                          {subtitle.slice(0, 120)}...
                        </p>
                      </Link>
                    </div>
                    <div
                      className="story-right-info"
                    >
                      <Link to={`/story/${_id}`}>
                        <Image
                          thumbnail
                          src={
                            content.images.length >= 1
                              ? `${process.env.REACT_APP_DEFAULT_URL}/${content.images[0]}`
                              : ""
                          }
                          height={`${topContainer ? "70px" : "120px"}`}
                          className="story-right-image"
                        />
                      </Link>
                    </div>
                  </div>
                  {/* this content will hide on main container */}
                  <Link to={`/story/${_id}`}>
                    <p
                      className={`${mainContainer ? "d-none" : ""}`}
                      style={{ opacity: "0.8", fontSize: "16px" }}
                    >
                      {subtitle.slice(0, 100)}
                      ...
                    </p>
                  </Link>
                </div>
              </Col>
            );
          })}
        </div>
      )}
    </Row>
  );
}
