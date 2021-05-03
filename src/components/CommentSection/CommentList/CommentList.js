import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import "./CommentList.css";

import changeDateFormat from "../../utils/changeDateFormat";
import Comment from "../Comment/Comment";

import {} from "react-router-dom";
import {} from "react-bootstrap";
import {} from "react-icons";

export default function CommentList({ comments }) {
  console.log(comments)
  return (
    <div className="py-3">
      {comments ? (
        comments.map((c, index) => {
          const { _id, user, comment, createdAt } = c;
          const newDateObject = changeDateFormat(createdAt);
          const {} = user;
          return (
            <Comment
              comment={comment}
              date={newDateObject}
              user={user}
              key={index}
            />
          );
        })
      ) : (
        <p>This story doesn't have any comments yet. Leave one.</p>
      )}
    </div>
  );
}
