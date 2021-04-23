import React from "react";

import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height : "80%"}}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
