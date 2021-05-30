import React from "react";
import "./AuthorStories.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

export default function AuthorStories({ authorProfile = {} }) {
  const { stories } = authorProfile;
  return (
    <div>
      {stories?.map((story) => {
        const { _id, content, title, subtitle } = story;
        const image = content?.images[0];
        return (
          <div
            style={{ overflow: "hidden" }}
            className="author-stories-container mb-3"
          >
            <Link to={`/story/${_id}`} key={_id}>
              <div className="my-4">
                <Image
                  //   src={`${process.env.REACT_APP_DEFAULT_URL}/${mainImage}`}
                  style={{ maxWidth: "100%", height: "50%" }}
                  rounded
                  width={700}
                  height={400}
                  src={image}
                />
              </div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
