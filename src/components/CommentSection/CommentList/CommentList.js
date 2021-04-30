import React from "react";
import "./CommentList.css";

import Comment from "../Comment/Comment";

import {} from "react-router-dom";
import {} from "react-bootstrap";
import {} from "react-icons";

export default function CommentList({ comments }) {
  console.log(comments);
  return (
    <div className="py-3">
      {comments ? (
        comments.map((c) => {
          const { _id, user, comment, createdAt } = c;
          const {} = user;
          console.log(user);
          return (
            <div>
              {createdAt}
              {comment}
            </div>
          );
        })
      ) : (
        <p>This story doesn't have any comments yet. Leave one.</p>
      )}
    </div>
  );
}
