import React, { useEffect, useState } from "react";
import "./SingleStoryLeftContainer.css";

import { RiWechatLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Image, Button } from "react-bootstrap";

import changeDateFormat from "../../utils/changeDateFormat";
import { Link } from "react-router-dom";
import useAuthorFollow from "../../utils/useAuthorFollow";
import { useUserContext } from "../../../context/provider/userContext";
import ErrorBanner from "../../ErrorBanner/ErrorBanner";
import { useAuthorContext } from "../../../context/provider/authorContext";

export default function SingleStoryLeftContent({
  singleStory,
  currentUser = {},
}) {
  const [followingAuthor, handleFollowAuthor] = useAuthorFollow(currentUser);
  const { user } = useUserContext();
  const { handleErrorAuthorError, authorErrorMessage } = useAuthorContext();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleErrorModalHide = (value) => {
    setShowErrorModal(value);
  };
  useEffect(() => {
    handleErrorModalHide(true);
  }, [authorErrorMessage]);
  if (!singleStory) {
    return null;
  }
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
    _id,
  } = singleStory.user;
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
            <span className="single-story-left-username">{username}</span>
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
          <div className="ml-4">
            <AiOutlineHeart style={{ fontSize: "30px" }} />
            <span>{totalLikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
