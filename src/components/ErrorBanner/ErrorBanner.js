import React from "react";
import { Modal } from "react-bootstrap";

export default function ErrorBanner({
  errorMessage,
  show,
  handleErrorModalHide,
  handleResetError,
}) {
  return (
    <Modal
      show={show}
      onHide={() => {
        handleErrorModalHide(false);
        if (handleResetError) {
          handleResetError();
        }
      }}
      centered
    >
      <Modal.Body className="mb-0" style={{ color: "red" }}>
        {errorMessage}
      </Modal.Body>
    </Modal>
  );
}
