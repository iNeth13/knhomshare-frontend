import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import "./Recommend.css";

import { Image, Button } from "react-bootstrap";
import { useUserContext } from "../../context/provider/userContext";
import { useTopicContext } from "../../context/provider/topicContext";
import useTopicFollow from "../../components/utils/useTopicFollow";
import useAuthorFollow from "../../components/utils/useAuthorFollow";

export default function Recommend({
  bio,
  image,
  name,
  recommendedType,
  currentUser = {},
  authorId,
}) {
  const { user } = useUserContext();
  //custom hook
  const [followedTopics, handleFollowTopic] = useTopicFollow(currentUser);
  const [followedAuthors, handleFollowAuthor] = useAuthorFollow(currentUser);
  console.log(followedTopics);

  return (
    <div className="d-flex mb-3 align-items-center w-100">
      <Image
        src={
          recommendedType === "author"
            ? `${process.env.REACT_APP_DEFAULT_URL}/${image}`
            : image
        }
        style={{ width: "50px", height: "50px" }}
        roundedCircle
        className="mr-2"
      />
      <div style={{ width: "50%" }}>
        <p className="mb-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          {name}
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
          followedTopics?.includes(name) ? (
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
        followedAuthors?.includes(authorId) ? (
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
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}
