import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./SingleStoryMainContent.css";

import CommentSection from "../../CommentSection/CommentSection";

import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SingleStoryMainContent({ singleStory }) {
  if (!singleStory) {
    return null;
  }
  const { title, content, topics } = singleStory;

  const mainImage = content.images[0];
  return (
    <div style={{ overflow: "hidden" }}>
      <h3 style={{}} className="px-3">
        {title}
      </h3>
      <div className="my-4 single-story-main-image-container">
        <Image
          src={`${process.env.REACT_APP_DEFAULT_URL}/${mainImage}`}
          className="single-story-main-image"
          rounded
          width={700}
          height={400}
        />
      </div>
      <div className="px-3">{ReactHtmlParser(content.paragraph)}</div>
      <div className="d-flex justify-content-around" style={{ width: "10%" }}>
       <p
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: "grey",
              borderRadius: "50%",
              marginBottom: "0",
            }}
          />
          <p
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: "grey",
              borderRadius: "50%",
              marginBottom: "0",
            }}
          />
          <p
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: "grey",
              borderRadius: "50%",
              marginBottom: "0",
            }}
          />
      </div>
      <div className="d-flex justify-content-center">
        {content.images.slice(1, content.images.length).map((image, index) => {
          return (
            <Image
              src={`${process.env.REACT_APP_DEFAULT_URL}/${image}`}
              style={{ width: "100%", height: "auto" }}
              key={index}
              width={600}
              height={350}
            />
          );
        })}
      </div>
      <div className="ml-3 mt-3">
        {topics?.map((tag, index) => {
          if (tag === "Mental Health") {
            tag = "mental-health";
          }
          return (
            <Link to={`/topic/${tag.toLowerCase()}`}>
              <Button
                key={index}
                size="sm"
                variant="outline-dark"
                style={{ borderRadius: ".4rem", marginRight: ".5rem" }}
              >
                {tag === "mental-health" ? "Mental Health" : tag}
              </Button>
            </Link>
          );
        })}
      </div>
      <div className="px-3">
        <CommentSection singleStory={singleStory} />
      </div>
    </div>
  );
}
