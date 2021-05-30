import React, { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/provider/userContext";
import useAuthorFollow from "../utils/useAuthorFollow";
import ErrorBanner from "../ErrorBanner/ErrorBanner";
import { useAuthorContext } from "../../context/provider/authorContext";
import changeDateFormat from "../utils/changeDateFormat";

export default function AuthorInfo({ authorProfile, currentUser = {} }) {
  console.log(currentUser);
  const [followingAuthor, handleFollowAuthor] = useAuthorFollow(currentUser);
  const { handleErrorAuthorError, authorErrorMessage } = useAuthorContext();
  const { user } = useUserContext();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleErrorModalHide = (value) => {
    setShowErrorModal(value);
  };
  useEffect(() => {
    handleErrorModalHide(true);
  }, [authorErrorMessage]);
  if (!authorProfile) {
    return null;
  }
  const { _id, username, createdAt, bio, followers, stories, profilePic } =
    authorProfile;
  const newDateFormat = changeDateFormat(createdAt);
  const { day, date, month, year } = newDateFormat;
  return (
    <div className="single-story-left-main">
      {/* these style are from SingleStoryLeftContent component */}
      <div className="single-story-left-container">
        <div className="user-info-container">
          <Image
            src={profilePic}
            style={{ width: "50px", height: "50px", marginRight: ".5rem" }}
            roundedCircle
            className="user-profile"
          />
          <div>
            <span className="single-story-left-username">
              <Link>{username}</Link>
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
            Total Stories : {stories?.length}
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
        </div>
      </div>
    </div>
  );
}
