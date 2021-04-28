import React from "react";
import "./CommentSection.css";

import { useUserContext } from "../../context/provider/userContext";

import CommentList from "./CommentList/CommentList";
import WriteComment from "./WriteComment/WriteComment";
import { Link } from "react-router-dom";

export default function CommentSection({singleStory}) {
  const { user } = useUserContext();
  return (
    <div className="py-5" id="comment-section">
      <p style={{ fontSize: "20px" }}>Comments</p>
      <div>
        {user ? (
          <WriteComment />
        ) : (
          <div>
            You are not signed in. Please{" "}
            <Link to={`/auth?redirect=story&id=${singleStory._id}`} className="sign-in-link">
              sign in
            </Link>{" "}
            to write comments.
          </div>
        )}
      </div>
      <p style={{ borderBottom: "1px solid grey", marginTop: "1rem" }} />
      <CommentList />
    </div>
  );
}
