import React from "react";
import { Container } from "react-bootstrap";

import ResetPassword from '../../components/ResetPassword/ResetPassword.js'

export default function ResetPasswordPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid="lg md sm"
    >
      <div className="custom-auth-container"></div>
      <ResetPassword />
    </Container>
  );
}
