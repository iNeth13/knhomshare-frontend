import React, { useState, useRef } from "react";
import "./Header.css";
import { NavLink, useParams, useLocation } from "react-router-dom";

import { useUserContext } from "../../context/provider/userContext";

import brand from "../../assets/brand.png";
import {
  Navbar,
  Nav,
  Form,
  Collapse,
  Container,
  Overlay,
} from "react-bootstrap";
import { FaSearch, FaBell } from "react-icons/fa";

//custom react hooks
import usePopover from "../utils/usePopover";

export default function Header() {
  const { user } = useUserContext();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const target = useRef(null);
  const [popover] = usePopover(setShowOverlay);
  const redirect = useLocation.search ? useLocation.search : "signin";
  console.log(user);
  return (
    <Navbar bg="light" className="fixed-top">
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
            />
          </NavLink>
        </Navbar.Brand>
        <span className="py-4 mx-2" style={{ borderLeft: "2px solid grey" }} />
        <Navbar.Collapse>
          <Navbar.Text style={{ fontWeight: "normal", color: "black" }}>
            Join us and spread your ideas!{" "}
          </Navbar.Text>
          <Nav
            className="ml-auto d-flex align-items-center justify-content-between"
            style={{ minWidth: "130px" }}
          >
            <Collapse
              in={showSearchBox}
              style={{ position: "absolute", right: "300px" }}
            >
              <Form>
                <Form.Control
                  placeholder="Enter something..."
                  size="sm"
                  className="border-0"
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </Form>
            </Collapse>
            <Nav.Item>
              <FaSearch
                className="icon"
                onClick={() => setShowSearchBox(!showSearchBox)}
              />
            </Nav.Item>
            <Nav.Item>
              <FaBell className="icon" />
            </Nav.Item>
            <Nav.Item style={{ fontWeight: "bold", cursor: "pointer" }}>
              {user ? (
                <div>
                  <div onClick={() => setShowOverlay(true)} ref={target}>
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
                <NavLink to={`/auth?${redirect}&redirect=/`}>Sign In</NavLink>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
