import React, { useState } from "react";
import { Popover, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/provider/userContext";
import "./popover.css";

const usePopover = (setShowOverlay) => {
  const { handleSignout, user } = useUserContext();
  const [showPopover, setShowPopover] = useState(false);
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
              <h5 style={{ fontSize: "18px", margin: "0" }}>
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
          <p className="p-tag">Favorite</p>
          <p className="p-tag">Account</p>
          <p
            style={{ fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}
            className="disabled"
            aria-disabled={true}
          >
            coming soon...
          </p>
          <hr />
          <p className="p-tag">Setting</p>
          <p className="p-tag" onClick={handleSignout}>
            Sign Out
          </p>
        </Popover.Content>
      </div>
    </Popover>
  );

  return [popver];
};

export default usePopover;
