import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useUserContext } from "../../context/provider/userContext";
import Loader from "../Loader/Loader";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "At least 8 characters, one number, one capital letter."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords do not match."
      ),
    })
    .required("Confirm password is required."),
});

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const {
    loading,
    handleValidLink,
    linkExpires,
    handleResetPassword,
    newValue,
  } = useUserContext();
  const { token } = useParams();
  useEffect(() => {
    handleValidLink(token);
  }, []);
  console.log(loading, newValue);
  return (
    <div className="custom-signin-container">
      {linkExpires ? (
        <div
          style={{
            fontWeight: "bold",
           
          }}
        >
          Your link has expired,please request another one.
        </div>
      ) : (
        <div>
          <h5
            className="d-flex justify-content-start mb-4"
            style={{ borderBottom: "2px solid black" }}
          >
            Your new password
          </h5>
          {loading ? (
            <Loader />
          ) : (
            <Formik
              initialValues={{
                password: "" || passwords.password,
                confirmPassword: "" || passwords.confirmPassword,
              }}
              validationSchema={passwordSchema}
              onSubmit={(values) => {
                console.log(values);
                handleResetPassword(values.password, token);
                setPasswords(values);
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
                      New Password
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="input here..."
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <Form.Control.Feedback
                        style={{ display: "block" }}
                        type="invalid"
                      >
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Form.Label className="d-flex align-items-center">
                      New Confirm Password
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="input here..."
                      name="confirmPassword"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Form.Control.Feedback
                        style={{ display: "block", maxWidth: "80%" }}
                        type="invalid"
                      >
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    )}
                  </FormGroup>
                  <Button type="submit" variant="outline-dark" size="md">
                    Reset
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </div>
  );
}
