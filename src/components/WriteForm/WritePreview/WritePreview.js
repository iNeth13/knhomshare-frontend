import React from "react";
import "./WritePreview.css";
import { Modal } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser'

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
      <Modal.Header className="px-5 d-flex flex-column pb-0">
        {title.length > 0 ? (
          <h5 style={{ width: "100%" }}>{title}</h5>
        ) : (
          <h5>No title yet!</h5>
        )}
        {tags.length > 0 ? (
          tags.map((tag, index) => {
            return (
              <div className="d-flex" key={index}>
                <p>tags: </p>
                <i className="ml-1"> {tag}</i>
              </div>
            );
          })
        ) : (
          <i>no tags</i>
        )}
      </Modal.Header>
      {title.length > 0 && (
        <Modal.Body className="w-100 ">
          {imagesPreview.length>0 && (
            <div className="d-flex justify-content-center" id="image-container">
              <img
                src={imagesPreview && imagesPreview[0]?.url}
                className="modal-image-hero"
              />
            </div>
          )}
          <div className="mt-3 px-5">{ReactHtmlParser(convertedContent)}</div>
          <div className="d-flex justify-content-center flex-column align-items-center" id="image-container">
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
