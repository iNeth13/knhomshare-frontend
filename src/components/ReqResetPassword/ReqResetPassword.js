import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, FormGroup, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { FaEnvelope } from "react-icons/fa";

import { useUserContext } from "../../context/provider/userContext";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
});
export default function ReqResetPassword() {
  const [prevEmail, setPrevEmail] = useState();
  const { error, loading, handleReqPasswordReset, isSubmitted } =
    useUserContext();
  return (
    <div className="custom-signin-container">
      <h5
        className="d-flex justify-content-start mb-4"
        style={{ borderBottom: "2px solid black" }}
      >
        Please enter your email address.
      </h5>
      {loading ? (
        <Loader />
      ) : !isSubmitted ? (
        <Formik
          initialValues={{
            email: "" || prevEmail,
          }}
          validationSchema={emailSchema}
          onSubmit={(values) => {
            handleReqPasswordReset(values.email);
            setPrevEmail(values.email);
          }}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            handleChange,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaEnvelope className="form-icons mr-2" />
                  Email
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="input here..."
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                ) : error?.startsWith("We") ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {error}
                  </Form.Control.Feedback>
                ) : null}
              </FormGroup>
              <Button type="submit" variant="outline-dark" size="md">
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <div style={{ fontWeight: "bold" }}>
          Reset link have been sent to your email address, please kindly check.
        </div>
      )}
    </div>
  );
}
