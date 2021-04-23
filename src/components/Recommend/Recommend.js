import React from "react";

import './Recommend.css';

import { Image, Button } from "react-bootstrap";

export default function Recommend({ recommendedData, recommendedType }) {
  return (
    <div className='azw1d'>
      <p
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        {recommendedType === "author"
          ? "Authors to follow"
          : "Topics to follow"}
      </p>
      {recommendedData.map((data) => {
        const { bio, image, name } = data;
        return (
          <div className="d-flex mb-3 align-items-center w-100" >
            <Image
              src={image}
              style={{ width: "50px", height: "50px" }}
              roundedCircle
              className="mr-2"
            />
            <div style={{ width: "50%" }}>
              <p className="mb-0">{name}</p>
              {recommendedType === "author" ? (
                <span>{bio.slice(0, 20)}...</span>
              ) : (
                ""
              )}
            </div>
            <div style={{ width: "20%", marginLeft: "auto" }}>
              <Button type="button" size='sm' variant='outline-success'>Follow</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
