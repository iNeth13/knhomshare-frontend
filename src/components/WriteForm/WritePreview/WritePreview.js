import React from "react";
import "./WritePreview.css";
import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

import { FaEye } from "react-icons/fa";

export default function WritePreview({
  handleShowModal,
  showModal,
  tags,
  title,
  imagesPreview,
  convertedContent,
}) {
  return (
    <Modal
      show={showModal}
      onHide={() => handleShowModal(false)}
      size="lg"
      centered
      className="modal-container"
    >
      <Modal.Header className="" closeButton>
        <Modal.Title as="h6" style={{ marginRight: "2rem" }}>
          <FaEye style={{ color: "#34656d" }} /> <span>Preview</span>
        </Modal.Title>
      </Modal.Header>
      {title.length > 1 && (
        <Modal.Body className="w-100">
          <div className="px-5 mb-2">
            <h5>{title}</h5>
            <div>
              tags :{" "}
              {tags.map((tag, index) => (
                <Button size="sm" variant="outline-dark">
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {imagesPreview.length >= 1 && (
            <div className="d-flex justify-content-center" id="image-container">
              <img
                src={imagesPreview && imagesPreview[0]?.url}
                className="modal-image-hero"
              />
            </div>
          )}
          <div className="mt-3 px-5">{ReactHtmlParser(convertedContent)}</div>
          <div
            className="d-flex justify-content-center flex-column align-items-center"
            id="image-container"
          >
            {imagesPreview &&
              imagesPreview
                .slice(1, imagesPreview.length)
                .map((image, index) => (
                  <img
                    src={image.url}
                    className="modal-image-preview pb-3"
                    key={index}
                  />
                ))}
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
