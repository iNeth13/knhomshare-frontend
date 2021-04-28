import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./SingleStoryMainContent.css";

import CommentSection from "../../CommentSection/CommentSection";

import { Image } from "react-bootstrap";

export default function SingleStoryMainContent({ singleStory }) {
  if (!singleStory) {
    return null;
  }
  const { title, content } = singleStory;
  console.log(content);
  const mainImage = content.images[0];
  return (
    <div style={{ overflow: "hidden" }}>
      <h3 style={{ fontWeight: "normal" }} className="px-3">
        {title}
      </h3>
      <div className="my-4">
        <Image
          src={`${process.env.REACT_APP_DEFAULT_URL}/${mainImage}`}
          style={{ width: "100%", height: "400px" }}
          rounded
        />
      </div>
      <div className="px-3">{ReactHtmlParser(content.paragraph)}</div>
      <div className="d-flex justify-content-center">
        {content.images
          .slice(1, content.images.length - 1)
          .map((image, index) => {
            return (
              <Image
                src={`${process.env.REACT_APP_DEFAULT_URL}/${image}`}
                style={{ width: "80%", height: "350px" }}
                key={index}
              />
            );
          })}
      </div>
      <div>
        <CommentSection singleStory={singleStory} />
      </div>
    </div>
  );
}
