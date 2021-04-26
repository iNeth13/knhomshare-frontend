import React from "react";
import "./AlertMessage.css";

import { Alert } from "react-bootstrap";

export default function AlertMessage({ variant, alertMessage }) {
  return (
    <Alert variant="success" className="alert-container">
      {alertMessage}
    </Alert>
  );
}
