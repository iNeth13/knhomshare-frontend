import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./AuthLoginPage.css";

import SignIn from "../../components/SignIn/SignIn";

import { Container, Button } from "react-bootstrap";

export default function AuthLoginPage() {
  const [signup, setSignupMode] = useState(false);
  const { search } = useLocation();
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
      <SignIn/>
    </Container>
  );
}
