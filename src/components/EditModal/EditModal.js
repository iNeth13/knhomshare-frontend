import React, { useState, useEffect, useRef } from "react";
import "./EditModal.css";
import { RiEdit2Line } from "react-icons/ri";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Modal, Form, Button, ButtonGroup } from "react-bootstrap";

import { useStoryContext } from "../../context/provider/storyContext";
import {
  TITLE_MAX_CHARACTERS,
  TITLE_MIN_CHARACTERS,
  SUBTITLE_MAX_CHARACTERS,
  SUBTITLE_MIN_CHARACTERS,
} from "../../constants/storyRelated";

import Loader from "../Loader/Loader";
import Feedback from "../Feedback/Feedback";

export default function EditModal({ showModal, setShowModal, userToken }) {
  const { editStoryLoading, story, handleStoryEdit } = useStoryContext();
  const { title, subtitle, content, tags, _id } = story ? story : {};
  const [convertedContent, setConvertedContent] = useState(content?.paragraph);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(content?.paragraph || "<div></div>")
      )
    )
  );
  const handleOnEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setConvertedContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  const editStorySchema = Yup.object().shape({
    title: Yup.string()
      .min(
        TITLE_MIN_CHARACTERS,
        "Title must contain at least 5 characters long"
      )
      .max(
        TITLE_MAX_CHARACTERS,
        "Title should not be longer than 100 characters long"
      )
      .required("Title cannot be emptied."),
    subtitle: Yup.string()
      .min(
        SUBTITLE_MIN_CHARACTERS,
        "Subtitle must contain at least 10 characters."
      )
      .max(
        SUBTITLE_MAX_CHARACTERS,
        "Subtitle should not be longer than 150 characters long."
      )
      .required("Subtitle is required."),
  });
  const handleHide = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(content?.paragraph || "<div>hi</div>")
        )
      )
    );
  }, [story]);
  console.log(convertedContent);
  return (
    <div>
      {editStoryLoading ? null : (
        <Formik
          initialValues={{
            title: "" || title,
            subtitle: "" || subtitle,
          }}
          validationSchema={editStorySchema}
          onSubmit={(value) => {
            value.content = convertedContent;
            console.log(value);
            setShowModal(false);
            handleStoryEdit(_id, userToken, "PATCH", value);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Modal
              show={showModal}
              onHide={handleHide}
              centered
              scrollable={true}
              size="lg"
            >
              <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton className="d-flex align-items-center">
                  <Modal.Title as="h6" style={{ marginRight: "2rem" }}>
                    <RiEdit2Line style={{ color: "#34656d" }} /> Edit Story
                  </Modal.Title>
                  <div className="edit-modal-header-btn">
                    <Button size="sm" variant="outline-dark" type="submit">
                      Save
                    </Button>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label className="edit-modal-title">title</Form.Label>
                    <Form.Control
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.title && touched.title && (
                      <Feedback feedbackMessage={errors.title} />
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="edit-modal-title">
                      subtitle
                    </Form.Label>
                    <Form.Control
                      name="subtitle"
                      value={values.subtitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.subtitle && touched.subtitle && (
                      <Feedback feedbackMessage={errors.title} />
                    )}
                  </Form.Group>
                  <Editor
                    onEditorStateChange={handleOnEditorStateChange}
                    editorState={editorState}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "history",
                        "fontFamily",
                        "link",
                      ],
                    }}
                    editorClassName=""
                  />
                </Modal.Body>
              </Form>
            </Modal>
          )}
        </Formik>
      )}
    </div>
  );
}
