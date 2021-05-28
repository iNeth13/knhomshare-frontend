import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleStoryLeftContainer.css";

import { RiWechatLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Image, Button } from "react-bootstrap";
import openSocket from "socket.io-client";

import changeDateFormat from "../../utils/changeDateFormat";
import useAuthorFollow from "../../utils/useAuthorFollow";
import { useUserContext } from "../../../context/provider/userContext";
import ErrorBanner from "../../ErrorBanner/ErrorBanner";
import { useAuthorContext } from "../../../context/provider/authorContext";

export default function SingleStoryLeftContent({
  singleStory,
  currentUser = {},
}) {
  console.log(currentUser);
  const [followingAuthor, handleFollowAuthor] = useAuthorFollow(currentUser);
  const { user, handleLoveStories } = useUserContext();
  const { handleErrorAuthorError, authorErrorMessage } = useAuthorContext();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoved, setIsLoved] = useState(
    currentUser && currentUser.lovedStories
  );
  const [storyTotalLikes, setStoryTotalLikes] = useState(
    singleStory && singleStory.totalLikes
  );
  const handleErrorModalHide = (value) => {
    setShowErrorModal(value);
  };
  useEffect(() => {
    handleErrorModalHide(true);
  }, [authorErrorMessage]);
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("user", (data) => {
      console.log(data);
      if (data.action === "love" || data.action === "unfollow") {
        setIsLoved(data.res.lovedStories);
        setStoryTotalLikes(data.res.storyTotalLikes);
      }
    });
  }, []);
  if (!singleStory) {
    return null;
  }
  const { totalView, totalLikes, totalComments } = singleStory && singleStory;
  const {
    profilePic,
    gender,
    username,
    email,
    followers,
    bio,
    stories,
    createdAt,
    _id,
  } = singleStory?.user;
  const newDateFormat = changeDateFormat(createdAt);
  const { day, date, month, year } = newDateFormat;
  return (
    <div className="single-story-left-main">
      <div className="single-story-left-container">
        <div className="user-info-container">
          <Image
            src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
            style={{ width: "50px", height: "50px", marginRight: ".5rem" }}
            roundedCircle
            className="user-profile"
          />
          <div>
            <span className="single-story-left-username">
              <Link to={`/author/${username}/${_id}`}>{username}</Link>
            </span>
            <span>
              {user && followingAuthor?.includes(_id) ? (
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() =>
                    handleFollowAuthor(
                      user && user.userId,
                      user && user.token,
                      _id,
                      "unfollow"
                    )
                  }
                  style={{ backgroundColor: "#02b875", color: "#fff" }}
                >
                  Followed
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() =>
                    handleFollowAuthor(
                      user && user.userId,
                      user && user.token,
                      _id,
                      "follow"
                    )
                  }
                  disabled={user ? false : true}
                >
                  Follow
                </Button>
              )}
            </span>
            {authorErrorMessage && (
              <ErrorBanner
                errorMessage={authorErrorMessage}
                show={showErrorModal}
                handleErrorModalHide={handleErrorModalHide}
                handleResetError={handleErrorAuthorError}
              />
            )}
            <p style={{ fontSize: "14px", opacity: "0.7" }}>
              Joined : {date} {month} {year}
            </p>
          </div>
        </div>
        <p className="show-on-sm">{bio}</p>
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
          {/* since this component is also used for author profile , this wont show on author profile*/}
          <div className="single-story-left-footer">
            <a href="#comment-section">
              <RiWechatLine style={{ fontSize: "30px" }} />
              <span>{totalComments.length}</span>
            </a>
            <div>
              {user && isLoved?.includes(singleStory._id) ? (
                <AiFillHeart
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#ff4c4c",
                  }}
                  onClick={() =>
                    handleLoveStories(singleStory._id, user.userId, "unfollow")
                  }
                />
              ) : (
                <AiOutlineHeart
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() =>
                    user
                      ? handleLoveStories(singleStory._id, user.userId, "love")
                      : null
                  }
                />
              )}
              <span>{storyTotalLikes}</span>
            </div>
          </div>
          <div style={{ width: "100%", borderBottom: "1px solid black" }} />
        </div>
        {/* since this component is also used for author profile , this wont show on author profile*/}
          <div className="single-story-left-footer show-on-sm">
            <a href="#comment-section">
              <RiWechatLine style={{ fontSize: "30px" }} />
              <span>{totalComments.length}</span>
            </a>
            <div className="ml-4">
              {user && isLoved?.includes(singleStory._id) ? (
                <AiFillHeart
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#ff4c4c",
                  }}
                  onClick={() =>
                    handleLoveStories(singleStory._id, user.userId, "unfollow")
                  }
                />
              ) : (
                <AiOutlineHeart
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() =>
                    user
                      ? handleLoveStories(singleStory._id, user.userId, "love")
                      : null
                  }
                />
              )}
              <span>{storyTotalLikes}</span>
            </div>
          </div>
      </div>
    </div>
  );
}
