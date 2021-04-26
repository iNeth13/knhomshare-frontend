import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import changeDateFormat from "../../components/utils/changeDateFormat";
import "./Story.css";

import { Col, Row, Image } from "react-bootstrap";

import TopStoriesLoader from "../ContentLoaders/TopStoriesLoader";

//this component is for every single story
export default function Story({
  stories,
  topContainer,
  mainContainer,
  sLoading,
}) {
  console.log(stories);

  return (
    <Row className="cos-row">
      {sLoading && topContainer ? (
        [1, 2, 3].map(() => <TopStoriesLoader />)
      ) : (
        <div>
          {stories.map((story) => {
            const { title, user, content, createdAt } = story;
            const { username, profilePic } = user;
            let transformedContent = ReactHtmlParser(content.paragraph);
            console.log(transformedContent);
            transformedContent =
              transformedContent.find((type) => type.type === "p").props
                .children[0].props?.children[0] || "";
            const newDateFormat = changeDateFormat(createdAt);
            const { hour, minute, day, month, year } = newDateFormat;
            return (
              <Col
                lg={12}
                md={12}
                md={12}
                sm={12}
                style={{
                  minHeight: "150px",
                  minWidth: `${mainContainer && "760px"}`,
                }}
              >
                <Link>
                  <div className="story-user-info-container">
                    <Image
                      style={{
                        height: "25px",
                        width: "25px",
                        marginRight: "5px",
                      }}
                      src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
                      rounded
                      onClick={() => console.log("to profile")}
                    />

                    <span
                      className="by-info"
                      style={{ fontSize: "18px" }}
                      onClick={() => console.log("to profile")}
                    >
                      @{username}
                    </span>
                    <span
                      className=""
                      style={{
                        fontSize: "12px",
                        opacity: "0.6",
                        marginLeft: "1rem",
                      }}
                    >
                      {day} {month} {year}
                      <span className="ml-2">
                        {hour}:{minute}
                        {hour >= 12 ? `pm` : `am`}
                      </span>
                    </span>
                  </div>
                </Link>
                <Link style={{ width: "100%" }}>
                  <div className="story-info-container">
                    <div className="story-left-info">
                      <h6 className={`${mainContainer ? "mb-3" : "mb-0"}`}>
                        {topContainer
                          ? title.slice(0, 70)
                          : title.slice(0, 100)}
                      </h6>
                      <p className={`${!mainContainer ? "d-none" : ""}`}>
                        {transformedContent.slice(0, 110)}...
                      </p>
                    </div>
                    <div className="story-right-info">
                      <Image
                        thumbnail
                        src={`${process.env.REACT_APP_DEFAULT_URL}/${content.images[0]}`}
                        className="story-right-image"
                        style={{ height: `${topContainer ? "100%" : ""}` }}
                      />
                    </div>
                  </div>
                  <p className={`${mainContainer ? "d-none" : ""}`}>
                    {transformedContent.slice(0, 70)}
                    ...
                  </p>
                </Link>
              </Col>
            );
          })}
        </div>
      )}
    </Row>
  );
}
