import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import "./CommentSection.css";

import { useUserContext } from "../../context/provider/userContext";

import CommentList from "./CommentList/CommentList";
import WriteComment from "./WriteComment/WriteComment";
import { Link } from "react-router-dom";

export default function CommentSection({ singleStory }) {
  console.log(singleStory);
  const { user } = useUserContext();
  const { totalComments } = singleStory;
  useEffect(() => {
    openSocket(process.env.REACT_APP_DEFAULT_URL);
    console.log("line 17 got called");
  }, []);
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
      <CommentList comments={totalComments} />
    </div>
  );
}
