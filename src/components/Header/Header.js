import React, { useState, useRef, useLayoutEffect } from "react";
import "./Header.css";
import { NavLink, useParams, useLocation, useHistory } from "react-router-dom";

import { useUserContext } from "../../context/provider/userContext";
import { useStoryContext } from "../../context/provider/storyContext";

import brand from "../../assets/brand.png";
import {
  Navbar,
  Nav,
  Form,
  Collapse,
  Container,
  Overlay,
  Fade,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaBell } from "react-icons/fa";

//custom react hooks
import usePopover from "../utils/usePopover";

export default function Header() {
  const { sLoading, handleStorySearch, handleNewestStories } =
    useStoryContext();
  const { push } = useHistory();
  const { user } = useUserContext();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const target = useRef(null);
  const [popover, getInputedValue] = usePopover(setShowOverlay);
  const [searchValue, setSearchValue] = useState("");
  const [windowWidth, setWindowWidth] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length > 1) {
      getInputedValue(3, searchValue, setShowSearchBox, setSearchValue);
    }
  };
  const handleShowSearchBox = () => {
    setShowSearchBox(!showSearchBox);
    if (windowWidth <= 768) {
      push("/search");
    }
  };
  useLayoutEffect(() => {
    const getWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);
  }, []);
  console.log(showOverlay);
  return (
    <Navbar bg="light" className="fixed-top nav-border-shadow">
      <Container fluid="lg md xs">
        <Navbar.Brand className="p-0">
          <NavLink to="/">
            <img
              src={brand}
              alt="logo"
              style={{
                width: "110px",
                height: "70px",
              }}
              className="brand-image"
            />
          </NavLink>
        </Navbar.Brand>
        <span className="py-4 mx-2" style={{ borderLeft: "2px solid grey" }} />
        <Navbar.Collapse>
          <Navbar.Text
            style={{ fontWeight: "normal", color: "black" }}
            className="header-text"
          >
            Join us and spread your ideas!{" "}
          </Navbar.Text>
          <Navbar.Text
            style={{ fontWeight: "normal", color: "black" }}
            className="header-text-mobile"
          >
            Good Day!
          </Navbar.Text>
          <Nav className="ml-auto d-flex align-items-center justify-content-between">
            {windowWidth > 768 && (
              <Collapse in={showSearchBox} className="search-box-container">
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    placeholder="Enter something..."
                    size="sm"
                    className="border-0 search-box"
                    name="search-box"
                    value={searchValue}
                    style={{ outline: "none", boxShadow: "none" }}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Form>
              </Collapse>
            )}
            <Nav.Item>
              <FaSearch className="icon" onClick={handleShowSearchBox} />
            </Nav.Item>
            <Nav.Item className="ml-3">
              <FaBell className="icon " />
            </Nav.Item>
            <Nav.Item
              style={{ fontWeight: "bold", cursor: "pointer" }}
              className="ml-3"
            >
              {user ? (
                <div>
                  <div
                    onClick={() => setShowOverlay(true)}
                    ref={target}
                    className="header-username"
                  >
                    {user && user.username}
                  </div>
                  <Overlay
                    onHide={() => setShowOverlay(false)}
                    rootClose
                    show={showOverlay}
                    target={target.current}
                    placement="bottom"
                  >
                    {popover}
                  </Overlay>
                </div>
              ) : (
                <NavLink to="/auth/login" onClick={() => setShowOverlay(false)}>
                  Sign In
                </NavLink>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
