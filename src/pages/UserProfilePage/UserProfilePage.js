import React, { useState, useEffect, useLayoutEffect } from "react";
import "./UserProfilePage.css";
import { useLocation, Redirect } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";

import SideNavigate from "../../components/UserProfile/SideNavigate/SideNavigate";
import UserProfileMain from "../../components/UserProfile/UserProfileMain/UserProfileMain";
import Toolbar from "../../components/Toolbar/Toolbar";

import { useUserContext } from "../../context/provider/userContext";
import Loader from "../../components/Loader/Loader";
import Paginate from "../../components/Paginate/Paginate";

export default function UserProfilePage({ history }) {
  const {
    user,
    handleUserProfile,
    userInfo,
    uLoading,
    totalPages,
    currentPage,
  } = useUserContext();
  const { pathname, search } = useLocation();
  const [navigate, setNavigate] = useState("account");
  const [toolbar, setToolbar] = useState();
  if (!user) {
    history.push("/");
  }
  useLayoutEffect(() => {
    const getWindowWidth = () => {
      setToolbar(window.innerWidth);
    };
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);
  }, []);
  useEffect(() => {
    handleUserProfile(user.token);
  }, []);
  if (pathname === "/profile" && !search) {
    history.push("/profile?action=account");
  }
  return (
    <Container fluid="lg md sm">
      <Row>
        <Col lg={3} md={3} sm={12}>
          <SideNavigate setNavigate={setNavigate} />
        </Col>
        <Col>
          {toolbar <= 768 && <div style={{ marginTop: "20px" }} />}
          {uLoading ? (
            <Loader />
          ) : (
            <UserProfileMain
              userInfo={userInfo}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
