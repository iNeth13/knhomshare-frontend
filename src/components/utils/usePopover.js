import React, { useState } from "react";
import { Popover, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useStoryContext } from "../../context/provider/storyContext";
import { useUserContext } from "../../context/provider/userContext";
import "./popover.css";

const usePopover = (setShowOverlay) => {
  const { push } = useHistory();
  const { handleSignout, user } = useUserContext();
  const { handleNewestStories } = useStoryContext();
  const popver = (
    <Popover className="sm-only">
      <div className="">
        <Popover.Title className="">
          <div className="d-flex align-items-center">
            <div className="p-2">
              <Image
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                }}
                roundedCircle
                src={
                  user &&
                  `${process.env.REACT_APP_DEFAULT_URL}/${user.profilePic}`
                }
              ></Image>
            </div>
            <div className=" d-flex flex-column justify-content-center">
              <h5
                style={{
                  fontSize: "18px",
                  margin: "0",
                }}
              >
                {user && user.email}
              </h5>
              <p style={{ fontSize: "12px", marginBottom: "0" }}>
                followers: {user && user.followers}
              </p>
            </div>
          </div>
        </Popover.Title>
        <Popover.Content
          style={{
            fontFamily: "Roboto !important",
            fontWeight: "",
          }}
        >
          <Link to="/write" onClick={() => setShowOverlay(false)}>
            <p className="p-tag">Write</p>
          </Link>
          <Link to="/favorite" onClick={() => setShowOverlay(false)}>
            <p className="p-tag">Favorite</p>
          </Link>
          <Link
            to="/profile?action=account"
            onClick={() => setShowOverlay(false)}
          >
            <p className="p-tag">Account</p>
          </Link>
          <Link to="/topics" onClick={() => setShowOverlay(false)}>
            <p className="p-tag">Topics List</p>
          </Link>
          <p
            style={{ fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}
            className="disabled"
            aria-disabled={true}
          >
            coming soon...
          </p>
          <hr />
          <p className="p-tag" onClick={handleSignout}>
            Sign Out
          </p>
        </Popover.Content>
      </div>
    </Popover>
  );
  const getInputedValue = (n, value, setShowSearchBox, setSearchValue) => {
    handleNewestStories(n, value);
    if (setShowSearchBox && setSearchValue) {
      setSearchValue("");
      setShowSearchBox(false);
    }
    push(`/search/${value}`);
  };

  return [popver, getInputedValue];
};

export default usePopover;
