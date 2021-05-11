import React from "react";
import "./Loader.css";

import { Spinner } from "react-bootstrap";

export default function Loader({ pAbsolute }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${
        pAbsolute && "pAbsolute"
      }`}
      style={{ height: "80%" }}
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
