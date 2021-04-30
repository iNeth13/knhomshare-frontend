import React from "react";
import "./WriteComment.css";

import { Image, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { useStoryContext } from "../../../context/provider/storyContext";

export default function WriteComment({ user,storyId }) {
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
      <div className="" style={{ width: "" }}>
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
        onSubmit={(values) => {
          console.log("hi");
          handleStoryComment(values.comment, user , storyId);
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
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
