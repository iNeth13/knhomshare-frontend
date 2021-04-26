import React from "react";

import "./Recommend.css";

import { Image, Button } from "react-bootstrap";

export default function Recommend({ bio, image, name, recommendedType }) {
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
        <p className="mb-0">{name}</p>
        {recommendedType === "author" ? (
          <span>{bio && bio.slice(0, 20)}...</span>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "20%", marginLeft: "auto" }}>
        <Button type="button" size="sm" variant="outline-success">
          Follow
        </Button>
      </div>
    </div>
  );
}
