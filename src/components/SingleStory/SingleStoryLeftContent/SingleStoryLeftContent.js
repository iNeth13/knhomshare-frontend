import React from "react";
import "./SingleStoryLeftContainer.css";

import { RiWechatLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Image, Button } from "react-bootstrap";

import changeDateFormat from "../../utils/changeDateFormat";
import { Link } from "react-router-dom";

export default function SingleStoryLeftContent({ singleStory }) {
  if (!singleStory) {
    return null;
  }
  console.log(singleStory.user);
  const { totalView, totalLikes, totalComments } = singleStory;
  const {
    profilePic,
    gender,
    username,
    email,
    followers,
    bio,
    stories,
    createdAt,
  } = singleStory.user;
  console.log(totalLikes);
  const newDateFormat = changeDateFormat(createdAt);
  const { day, date, month, year } = newDateFormat;
  return (
    <div className="single-story-left-main">
      <div className="single-story-left-container">
        <div className="user-info-container">
          <Image
            src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
            style={{ width: "50px", height: "50px" }}
            roundedCircle
          />
          <div>
            <span className="single-story-left-username">@{username}</span>
            <span>
              <Button variant="outline-success" size="sm">
                Follow
              </Button>
            </span>
            <p style={{ fontSize: "14px", opacity: "0.7" }}>
              Joined : {date} {month} {year}
            </p>
          </div>
        </div>
        <div className="user-info-container-">
          <p className="single-story-bio">
            {bio ? bio : "This author hasn't added any bio yet."}
          </p>
          <p
            style={{
              fontSize: "14px",
              opacity: "0.7",
              textTransform: "uppercase",
            }}
          >
            Total Stories : {stories.length}
          </p>
          <p
            style={{
              fontSize: "14px",
              opacity: "0.7",
              textTransform: "uppercase",
            }}
          >
            Total Followers : {followers.length}
          </p>
          <div className="single-story-left-footer">
            <a href="#comment-section">
              <RiWechatLine style={{ fontSize: "30px" }} />
              <span>{totalComments.length}</span>
            </a>
            <div>
              <AiOutlineHeart style={{ fontSize: "30px" }} />
              <span>{totalLikes}</span>
            </div>
          </div>
          <div style={{ width: "100%", borderBottom: "1px solid black" }} />
        </div>
        <div className="single-story-left-footer show-on-sm">
          <a href="#comment-section">
            <RiWechatLine style={{ fontSize: "30px" }} />
            <span>{totalComments.length}</span>
          </a>
          <div>
            <AiOutlineHeart style={{ fontSize: "30px" }} />
            <span>{totalLikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
