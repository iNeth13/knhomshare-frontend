import React from "react";
import { useHistory } from "react-router-dom";
import "./AuthSignupPage.css";

import { Container } from "react-bootstrap";

import SignUp from "../../components/SignUp/SignUp";

export default function AuthSignupPage() {
  const history = useHistory();

  const loggedInUser = localStorage.getItem("c-user")
    ? JSON.parse(localStorage.getItem("c-user"))
    : null;
  if (loggedInUser) {
    history.push("/");
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid="lg md sm"
    >
      <div className="custom-auth-container"></div>
      <SignUp />
    </Container>
  );
}
