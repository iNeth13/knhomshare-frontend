import React from "react";
import "./DeleteModal.css";

import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { useStoryContext } from "../../context/provider/storyContext";

export default function DeleteModal({ showDeleteModal, setShowDeleteModal }) {
  const { story, handleStoryDelete } = useStoryContext();
  console.log(story);
  return (
    <Modal
      size="sm"
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">Are you sure?</div>
        <ButtonGroup className="d-flex justify-content-end">
          <Button
            variant="outline-dark"
            onClick={() => handleStoryDelete(story._id)}
          >
            Yes
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setShowDeleteModal(false)}
          >
            No
          </Button>
        </ButtonGroup>
      </Modal.Body>
    </Modal>
  );
}
