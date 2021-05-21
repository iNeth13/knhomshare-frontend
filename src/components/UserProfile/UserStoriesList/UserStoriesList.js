import React from "react";
import { Link } from "react-router-dom";
import { RiEditBoxLine, RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import "./UserStoriesList.css";

import { Image } from "react-bootstrap";

import changeDateFormat from "../../utils/changeDateFormat";

export default function UserStoriesList({
  createdAt,
  title,
  image,
  id,
  setStoryId,
  setShowModal,
  setShowDeleteModal,
}) {
  const newDateFormat = changeDateFormat(createdAt);
  const { date, day, month, year } = newDateFormat;
  return (
    <div className="user-stories-list-container">
      <div className="user-stories-info">
        <div className="user-stories-left">
          <Link to={`story/${id}`}>
            <h6 className="user-stories-title">{title.slice(0, 70)}</h6>
          </Link>
        </div>
        <div className="user-stories-right">
          <Link to={`story/${id}`}>
            <Image
              src={`${process.env.REACT_APP_DEFAULT_URL}/${image}`}
              className="user-stories-right-image"
              rounded
            />
          </Link>
        </div>
      </div>
      <div className="user-stories-footer">
        <div className="user-stories-publish">
          posted on : {date} {day} {month} {year}
        </div>
        <div className="user-stories-btn">
          <RiEdit2Line
            className="user-stories-edit-btn"
            onClick={() => {
              setStoryId(id);
              setShowModal(true);
            }}
          />
          <RiDeleteBinLine
            className="user-stories-delete-btn"
            onClick={() => {
              setShowDeleteModal(true);
              setStoryId(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
