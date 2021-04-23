import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import ErrorLogo from "../../assets/404Error.png";

import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <Container className="custom-container">
      <div className="error-info-container">
        <h5 style={{ opacity: 0.7 }}>
          Look like there is something wrong with the provided URL
        </h5>
        <h5 style={{ opacity: 0.7 }}>
          Back to <Link className="custom-link" to='/'>Homepage</Link>
        </h5>
      </div>
    </Container>
  );
}
