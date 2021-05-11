import React from "react";
import "./AlertMessageDBlock.css";

import { Alert } from "react-bootstrap";

export default function AlertMessageDBlock({ variant, alertMessage }) {
  return (
    <Alert variant={variant} style={{ height: "100%", width: "100%" }} className='d-flex align-items-center justify-content-center'>
      {alertMessage}
    </Alert>
  );
}
