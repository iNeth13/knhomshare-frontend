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
        <p className="mb-0" style={{ fontWeight: "bold" }}>
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
        <Button type="button" size="sm" variant="outline-success">
          Follow
        </Button>
      </div>
    </div>
  );
}
