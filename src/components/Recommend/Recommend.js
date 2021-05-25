import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";

import "./Recommend.css";

import { Image, Button } from "react-bootstrap";
import { useUserContext } from "../../context/provider/userContext";
import { useTopicContext } from "../../context/provider/topicContext";
import useTopicFollow from "../../components/utils/useTopicFollow";
import useAuthorFollow from "../../components/utils/useAuthorFollow";
import { useAuthorContext } from "../../context/provider/authorContext";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

export default function Recommend({
  bio,
  image,
  name,
  recommendedType,
  currentUser = {},
  authorId,
}) {
  const { user } = useUserContext();
  const { authorErrorMessage, handleErrorAuthorError } = useAuthorContext();
  //custom hook
  const [followedTopics, handleFollowTopic] = useTopicFollow(currentUser);
  const [followingAuthor, handleFollowAuthor] = useAuthorFollow(currentUser);
  const [showModal, setShowModal] = useState(false);
  const handleErrorModalHide = (value) => {
    setShowModal(value);
  };
  useEffect(() => {
    handleErrorModalHide(true);
  }, [authorErrorMessage]);
  console.log(followingAuthor);

  return (
    <div className="d-flex mb-3 align-items-center w-100">
      <Image
        src={
          recommendedType === "author"
            ? `${process.env.REACT_APP_DEFAULT_URL}/${image}`
            : image
        }
        width={50}
        height={50}
        style={{ maxWidth: "50px", height: "50px" }}
        roundedCircle
        className="mr-2"
      />

      <div style={{ width: "50%" }}>
        <p className="mb-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          {recommendedType === "topic" ? (
            <Link to={`/topic/${name}`}>{name}</Link>
          ) : (
            <Link to={`/${name}/${authorId}`}>{name}</Link>
          )}
        </p>
        {recommendedType === "author" ? (
          <div style={{ fontSize: "14px" }}>
            {bio && bio.length > 1 ? (
              bio.slice(0, 40)
            ) : (
              <div style={{ fontStyle: "italic" }}>
                this author does not have bio yet.
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "20%", marginLeft: "auto" }}>
        {recommendedType === "topic" ? (
          // topic-btn
          user && followedTopics?.includes(name) ? (
            <Button
              type="button"
              size="sm"
              variant="outline-success"
              onClick={() =>
                handleFollowTopic(
                  user && user.userId,
                  user && user.token,
                  name,
                  "unfollow"
                )
              }
              style={{ backgroundColor: "#02b875", color: "#fff" }}
            >
              Followed
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="outline-success"
              disabled={user ? false : true}
              onClick={() =>
                handleFollowTopic(
                  user && user.userId,
                  user && user.token,
                  name,
                  "follow"
                )
              }
            >
              Follow
            </Button>
          )
        ) : //author-btn
        user && followingAuthor?.includes(authorId) ? (
          <Button
            type="button"
            size="sm"
            variant="outline-success"
            onClick={() =>
              handleFollowAuthor(
                user && user.userId,
                user && user.token,
                authorId,
                "unfollow"
              )
            }
            style={{ backgroundColor: "#02b875", color: "#fff" }}
          >
            Followed
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="outline-success"
            onClick={() =>
              handleFollowAuthor(
                user && user.userId,
                user && user.token,
                authorId,
                "follow"
              )
            }
            disabled={user ? false : true}
          >
            Follow
          </Button>
        )}
        {authorErrorMessage && (
          <ErrorBanner
            show={showModal}
            errorMessage={authorErrorMessage}
            handleErrorModalHide={handleErrorModalHide}
            handleResetError={handleErrorAuthorError}
          />
        )}
      </div>
    </div>
  );
}
