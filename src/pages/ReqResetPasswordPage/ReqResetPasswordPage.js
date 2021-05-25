import React from "react";
import { Container } from "react-bootstrap";

import ReqResetPassword from "../../components/ReqResetPassword/ReqResetPassword.js";

export default function ReqResetPasswordPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid="lg md sm"
    >
      <div className="custom-auth-container"></div>
      <ReqResetPassword />
    </Container>
  );
}
