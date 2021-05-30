import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import openSocket from "socket.io-client";
import changeDateFormat from "../../components/utils/changeDateFormat";
import "./Story.css";

import { Col, Row, Image } from "react-bootstrap";

import TopStoriesLoader from "../ContentLoaders/TopStoriesLoader";
import AlertMessage from "../AlertMessage/AlertMessage";
import { useUserContext } from "../../context/provider/userContext";

//this component is for every single story
export default function Story({
  stories,
  topContainer,
  mainContainer,
  sLoading,
  related,
  currentUser,
  favorite,
}) {
  const { handleLoveStories, user } = useUserContext();
  const [isLoved, setIsLoved] = useState();
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("user", (data) => {
      if (data.action === "love" || data.action === "unfollow") {
        setIsLoved(data.res.lovedStories);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoved(currentUser?.lovedStories);
  }, [currentUser]);
  return (
    <Row className="cos-row">
      {sLoading && topContainer ? (
        [1, 2, 3].map((number, index) => (
          <div style={{ overflow: "hidden" }}>
            <TopStoriesLoader key={index} />
          </div>
        ))
      ) : (
        <div className={`${favorite && "cos-column-fav"}`}>
          {stories?.map((story, index) => {
            const { title, user, content, createdAt, _id, subtitle } = story;
            const { username, profilePic } = user;
            const newDateFormat = changeDateFormat(createdAt);
            const { hourAndMinute, day, month, year, date } = newDateFormat;
            return (
              <Col
                lg={favorite ? 6 : 12}
                md={favorite ? 6 : 12}
                sm={12}
                style={{
                  minHeight: related ? "" : "150px",
                }}
                key={index}
                className={`${
                  topContainer ? "" : "author-stories-container mb-3 pb-1"
                }`}
              >
                {/* profile Pic , username and date */}
                <div>
                  <div className="story-user-info-container d-flex align-items-center">
                    <Link to={`/author/${username}/${user._id}`}>
                      <Image
                        style={{
                          height: "25px",
                          width: "25px",
                          marginRight: "5px",
                        }}
                        src={profilePic}
                        rounded
                        onClick={() => console.log("to profile")}
                      />
                    </Link>

                    <span
                      className="by-info"
                      style={{ fontSize: "16px" }}
                      onClick={() => console.log("to profile")}
                    >
                      <Link to={`/author/${username}/${user._id}`}>
                        {username}
                      </Link>
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
                      <div style={{ width: "100%", display: "flex" }}>
                        <Link to={`/story/${_id}`} style={{ width: "90%" }}>
                          <h6
                            className={`${mainContainer ? "mb-3" : "mb-0"}`}
                            style={{ fontSize: related && "16px" }}
                          >
                            {topContainer
                              ? title.slice(0, 70)
                              : title.slice(0, 100)}
                          </h6>
                        </Link>
                        <div
                          style={{
                            width: `${topContainer ? "15%" : "5%"}`,
                            marginRight: related ? "1rem" : "0",
                          }}
                        >
                          {user && isLoved?.includes(_id) ? (
                            <BsBookmarkDash
                              style={{
                                fontSize: topContainer ? "20px" : "25px",
                                cursor: "pointer",
                                color: "#ff4c4c",
                              }}
                              onClick={() =>
                                handleLoveStories(
                                  _id,
                                  currentUser._id,
                                  "unfollow"
                                )
                              }
                            />
                          ) : (
                            <BsBookmarkPlus
                              style={{
                                fontSize: topContainer ? "20px" : "25px",
                                cursor: user ? "pointer" : "",
                              }}
                              onClick={() =>
                                currentUser
                                  ? handleLoveStories(
                                      _id,
                                      currentUser._id,
                                      "love"
                                    )
                                  : null
                              }
                            />
                          )}
                        </div>
                      </div>
                      {/*  this content will show on main container but hide on top container instead (for style purpose) */}
                      {related ? null : (
                        <Link to={`/story/${_id}`}>
                          <p
                            className={`${!mainContainer ? "d-none" : ""}`}
                            style={{
                              opacity: "0.8",
                              fontSize: "16px",
                            }}
                          >
                            {subtitle.slice(0, 120)}...
                          </p>
                        </Link>
                      )}
                    </div>
                    <div className="story-right-info">
                      <Link to={`/story/${_id}`}>
                        <Image
                          thumbnail
                          src={
                            content.images.length >= 1 ? content.images[0] : ""
                          }
                          height={`${topContainer ? "70px" : "120px"}`}
                          className="story-right-image"
                        />
                      </Link>
                    </div>
                  </div>
                  {/* this content will hide on main container */}
                  {related ? null : (
                    <Link to={`/story/${_id}`}>
                      <p
                        className={`${mainContainer ? "d-none" : ""}`}
                        style={{ opacity: "0.8", fontSize: "16px" }}
                      >
                        {subtitle.slice(0, 100)}
                        ...
                      </p>
                    </Link>
                  )}
                </div>
              </Col>
            );
          })}
        </div>
      )}
    </Row>
  );
}
