import React from "react";
import { Link } from "react-router-dom";
import { RiEditBoxLine, RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import "./UserStoriesList.css";

import { Image, Button } from "react-bootstrap";

import changeDateFormat from "../../utils/changeDateFormat";
import { useUserContext } from "../../../context/provider/userContext";

export default function UserStoriesList({
  createdAt,
  title,
  image,
  id,
  setStoryId,
  setShowModal,
  setShowDeleteModal,
  followers,
  following,
  handleFollowAuthor,
}) {
  const newDateFormat = changeDateFormat(createdAt);
  const { user } = useUserContext();
  const { date, day, month, year } = newDateFormat;
  return (
    <div className="user-stories-list-container">
      <div className="user-stories-info">
        <div className="user-stories-left">
          {followers || following ? (
            <Link to={`${title}/${id}`}>
              <h6 className="">{title}</h6>
            </Link>
          ) : (
            <Link to={`story/${id}`}>
              <h6 className="user-stories-title">{title.slice(0, 70)}</h6>
            </Link>
          )}
        </div>
        <div className={`${!(followers || following) && "user-stories-right"}`}>
          {followers || following ? (
            <Link to={`${title}/${id}`}>
              <Image
                src={image}
                width={65}
                height={65}
                style={{ maxWidth: "100%" }}
                rounded
              />
            </Link>
          ) : (
            <Link to={`story/${id}`}>
              <Image
                src={image}
                className="user-stories-right-image"
                rounded
              />
            </Link>
          )}
        </div>
      </div>
      <div className="user-stories-footer">
        <div className="user-stories-publish">
          {followers || following ? "since" : "posted on"} : {date} {day}{" "}
          {month} {year}
        </div>
        <div className="user-stories-btn">
          {following ? (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() =>
                handleFollowAuthor(user.userId, user.token, id, "unfollow")
              }
            >
              Unfollow
            </Button>
          ) : followers ? (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() =>
                handleFollowAuthor(
                  user.userId,
                  user.token,
                  id,
                  "unfollow",
                  "remove"
                )
              }
            >
              Remove
            </Button>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
}
