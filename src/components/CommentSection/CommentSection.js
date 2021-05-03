import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { Button } from "react-bootstrap";
import "./CommentSection.css";

import { useUserContext } from "../../context/provider/userContext";

import CommentList from "./CommentList/CommentList";
import WriteComment from "./WriteComment/WriteComment";
import { Link } from "react-router-dom";

export default function CommentSection({ singleStory }) {
  const { user } = useUserContext();
  const { totalComments } = singleStory;
  const [storyComments, setStoryComments] = useState();
  const [numberOfComments, setNumberOfComments] = useState(10);
  useEffect(() => {
    let socket = openSocket(process.env.REACT_APP_DEFAULT_URL);
    console.log(socket);
    socket.on("comment", (data) => {
      console.log(data.data);
      setStoryComments((prev) => {
        let newestComment = [...prev];
        newestComment.unshift(data.data);
        console.log(newestComment);
        return newestComment;
      });
    });
  }, []);
  console.log(totalComments, storyComments);
  useEffect(() => {
    console.log("i got called line 32");
    setStoryComments(() => totalComments.slice(0, numberOfComments));
  }, [numberOfComments]);
  return (
    <div className="py-5" id="comment-section">
      <p style={{ fontSize: "20px" }}>Comments</p>
      <p style={{ borderBottom: "1px solid grey", marginTop: "1rem" }} />
      <div>
        {user ? (
          <WriteComment user={user} storyId={singleStory._id} />
        ) : (
          <div>
            You are not signed in. Please{" "}
            <Link
              to={`/auth?redirect=story&id=${singleStory._id}`}
              className="sign-in-link"
            >
              sign in
            </Link>{" "}
            to write comments.
          </div>
        )}
      </div>
      <CommentList comments={storyComments} />
      {numberOfComments < totalComments.length && (
        <Button
          style={{ width: "100%" }}
          variant="outline-dark"
          onClick={() => setNumberOfComments((prev) => prev + 10)}
          type="button"
        >
          Load More Comments.
        </Button>
      )}
    </div>
  );
}
