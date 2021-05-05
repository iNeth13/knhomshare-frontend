import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./SideNavigate.css";

import { ButtonGroup, Button } from "react-bootstrap";

export default function SideNavigate({ setNavigate }) {
  const { push } = useHistory();
  const { search } = useLocation();
  const [activeNav, setActiveNav] = useState("");
  const handleClick = (toComponent) => {
    push(`/profile?action=${toComponent}`);
    setActiveNav(toComponent);
  };
  useEffect(() => {
    const getQuery = search && search.split("=")[1];
    setActiveNav(getQuery);
  }, []);
  console.log(activeNav);
  return (
    <div>
      <ButtonGroup
        size="md"
        style={{ width: "100%" }}
        className="side-btn-wrapper"
      >
        <Button
          variant="outline-dark"
          className="side-btn"
          onClick={() => handleClick("account")}
          active={activeNav === "account" && true}
        >
          Account
        </Button>
        <Button
          variant="outline-dark"
          className="side-btn"
          onClick={() => handleClick("my-stories")}
          active={activeNav === "my-stories" && true}
        >
          My Stories
        </Button>
        <Button
          variant="outline-dark"
          className="side-btn"
          onClick={() => handleClick("following")}
          active={activeNav === "following" && true}
        >
          Following
        </Button>
        <Button
          variant="outline-dark"
          className="side-btn"
          onClick={() => handleClick("followers")}
          active={activeNav === "followers" && true}
        >
          Followers
        </Button>
      </ButtonGroup>
    </div>
  );
}
