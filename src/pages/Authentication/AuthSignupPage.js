import React from "react";
import "./AuthSignupPage.css";

import { Container } from "react-bootstrap";

import SignUp from "../../components/SignUp/SignUp";

export default function AuthSignupPage() {
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
