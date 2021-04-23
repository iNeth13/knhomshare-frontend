import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";
import "./WriteForm.css";
import "../../../node_modules/draft-js/dist/Draft.css";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//bootstraps
import {
  Form,
  Container,
  Button,
  FormGroup,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";

//react-icons
import { FaImages, FaPlus, FaTimes, FaEye } from "react-icons/fa";

import { Formik } from "formik";
import * as Yup from "yup";

import { TITLE_MAX_CHARACTERS } from "../../constants/storyRelated";
import WritePreview from "../WriteForm/WritePreview/WritePreview";
import Loader from "../Loader/Loader";
import topics from "../../constants/topics";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

const storySchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be atleast 5 characters long")
    .max(
      TITLE_MAX_CHARACTERS,
      "Title should not be longer than 100 characters long"
    )
    .required("Title is required."),
  tags: Yup.array().required("Please choose at least 1 tags."),
});

export default function WriteForm({
  user,
  handleStoryPost,
  sLoading,
  error,
  handleResetStoryError,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [allTags, setAllTags] = useState([]);

  const handleSetImages = (e) => {
    [...e.target.files].map((file, index) => {
      console.log(file);
      setImagesPreview((prev) => {
        const name = file.name;
        return [...prev, { url: URL.createObjectURL(file), name }];
      });
      setImagesUpload((prev) => {
        return [...prev, file];
      });
    });
  };
  //related to image
  const handleRemoveImagePreview = (imgName) => {
    const remainingImages = imagesPreview.filter((image, index) => {
      return image.url !== imgName;
    });
    const remaningImagesUpload = imagesUpload.filter((image) => {
      return image.url !== imgName;
    });
    setImagesUpload(remaningImagesUpload);
    setImagesPreview(remainingImages);
  };

  //show modal
  const handleShowModal = (value) => {
    setShowModal(value);
  };

  //show error modal
  const handleErrorModalHide = (value) => {
    setErrorModal(value);
  };

  const handleOnEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setConvertedContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  //get all tags from for user to choose
  const getAllTopics = () => {
    const getTopics = topics.map((topic) =>
      topic.topicList.map((tag) => tag.topic)
    );
    let allTopics = [];
    allTopics = allTopics
      .concat(...getTopics)
      .sort((a, b) => a.localeCompare(b));
    setAllTags(allTopics);
  };
  //end here
  console.log(convertedContent);
  useEffect(() => {
    handleErrorModalHide(true);
  }, [error]);
  useEffect(() => {
    if (allTags.length === 0) {
      getAllTopics();
    }
  }, []);
  return (
    <div>
      {sLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            title: "" || title,
            tags: [],
          }}
          validationSchema={storySchema}
          onSubmit={(values) => {
            setTitle(values.title);
            handleStoryPost(
              values.title,
              imagesUpload,
              values.tags,
              convertedContent,
              user
            );
          }}
        >
          {({
            handleChange,
            values,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
              {console.log(values)}
              <div
                className="py-5 d-flex justify-content-between custom-write-header"
                style={{ width: "350px" }}
              >
                <Form.Label className="mb-0">
                  <div className="custom-file-input-btn">
                    <FaImages /> Images
                  </div>
                  <Form.File
                    id="image-upload"
                    onChange={handleSetImages}
                    multiple={true}
                    style={{ display: "none" }}
                    name="images"
                  />
                </Form.Label>

                <Button
                  style={{ borderRadius: "5px", fontWeight: "bold" }}
                  variant="outline-dark"
                  onClick={() => handleShowModal(true)}
                >
                  <FaEye /> Preview
                </Button>
                <Button
                  style={{ borderRadius: "5px", fontWeight: "bold" }}
                  variant="outline-dark"
                  type="submit"
                >
                  <FaPlus /> Publish
                </Button>
              </div>
              {/*for title*/}
              <FormGroup>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  name="title"
                  placeholder="Title of your amazing story...!"
                  className="border-0"
                  style={{
                    backgroundColor: "#f4f4f4",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  autoComplete="off"
                />
                {errors.title && touched.title && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {errors.title}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              {touched.title && !errors.title && (
                <FormGroup>
                  <Form.Label style={{ fontWeight: "bold" }} className="mb-0">
                    + What tags does your article belong to?
                  </Form.Label>
                  <div
                    style={{ width: "100%", borderBottom: "2px solid black" }}
                    className="my-3"
                  />
                  <div className="p-0">
                    <Row className="flex-wrap">
                      {allTags.map((tag, index) => (
                        <Col
                          lg={2}
                          md={2}
                          sm={4}
                          xs={4}
                          className="py-2"
                          key={index}
                        >
                          <Form.Check
                            value={tag}
                            key={index}
                            label={tag}
                            onChange={handleChange}
                            name="tags"
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </FormGroup>
              )}
              {values.tags.length > 0 && (
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
                  editorClassName="editor-size"
                />
              )}
              {imagesPreview.length > 0 && (
                <div className="image-preview-container">
                  {imagesPreview.map((image, index) => {
                    return (
                      <div className="image-preview-container_" key={index}>
                        <FaTimes
                          className="remove-image"
                          onClick={() => handleRemoveImagePreview(image.url)}
                        />
                        <img src={image.url} className="image-preview" />
                      </div>
                    );
                  })}
                </div>
              )}
              <WritePreview
                handleShowModal={handleShowModal}
                showModal={showModal}
                title={values.title}
                imagesPreview={imagesPreview}
                tags={values.tags}
                convertedContent={convertedContent}
              />
              {error && (
                <ErrorBanner
                  handleErrorModalHide={handleErrorModalHide}
                  show={errorModal}
                  errorMessage={error}
                  handleResetStoryError={handleResetStoryError}
                />
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
