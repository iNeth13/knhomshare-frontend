import React from "react";
import "./Comment.css";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { BiLike, BiDislike } from "react-icons/bi";

export default function Comment({ user, comment, date }) {
  const { username, _id, profilePic } = user;
  const { hourAndMinute, day, month, year } = date;
  return (
    <div className="d-flex w-100 mb-3">
      <div className="cmt-user-image-container" style={{ width: "7%" }}>
        <Link to={"#"}>
          <Image
            src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
            style={{ height: "30px", width: "30px" }}
            roundedCircle
          />
        </Link>
      </div>
      <div className="cmt-container" style={{ width: "93%" }}>
        <div style={{ display: "flex" }}>
          <Link>
            <h6 style={{ marginBottom: "0", marginRight: "1rem" }}>
              {username}
            </h6>
          </Link>
          <p style={{ opacity: "0.7", fontSize: "14px", marginBottom: "0" }}>
            {day} {date.date} {month} {year} {hourAndMinute}
          </p>
        </div>
        <p className="my-1">{comment}</p>
        <div
          className="like-dislike-buttom-container d-flex justify-content-between align-items-center"
          style={{ width: "15%" }}
        >
          <div>
            <span style={{fontSize:'12px',marginRight:'10px'}}>0 Likes</span>  
            <BiLike className='like-button' />
          </div>
          <BiDislike style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
}
