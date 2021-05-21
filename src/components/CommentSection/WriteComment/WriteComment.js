import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import "./WriteComment.css";

import { Image, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { useStoryContext } from "../../../context/provider/storyContext";

export default function WriteComment({ user, storyId }) {
  const { handleStoryComment } = useStoryContext();
  const commentSchema = Yup.object().shape({
    comment: Yup.string("Please write something first.").required(
      "Please write something first."
    ),
  });
  const { profilePic, username, token } = user;
  console.log(profilePic);
  return (
    <div className="d-flex write-comment-container">
      <div className="" style={{ width: "7%" }}>
        <Image
          style={{ height: "30px", width: "30px" }}
          roundedCircle
          src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
        />
      </div>
      <Formik
        initialValues={{
          comment: "",
        }}
        validationSchema={commentSchema}
        onSubmit={(values, { resetForm }) => {
          handleStoryComment(values.comment, user, storyId);
          resetForm({});
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form style={{ width: "93%" }} onSubmit={handleSubmit} className='cmt-form'>
            {console.log(values, errors, touched)}
            <Form.Group style={{ marginBottom: "0" }}>
              <Form.Control
                as="textarea"
                style={{
                  width: "100%",
                  border: "1px solid grey",
                  overflow: "visible",
                  padding: ".5rem 1rem",
                }}
                rows={4}
                cols={5}
                onChange={handleChange}
                onBlur={handleBlur}
                name="comment"
                value={values.comment}
                className='cmt-textarea'
              />
              {errors.comment && touched.comment && (
                <Form.Control.Feedback
                  style={{
                    display: "flex",
                    marginBottom: "0",
                    justifyContent: "flex-end",
                  }}
                  type="invalid"
                >
                  {errors.comment}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button
              type="submit"
              variant="dark"
              style={{ width: "100%", borderRadius: "0" }}
            >
              POST
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
