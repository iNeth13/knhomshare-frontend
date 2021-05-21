import React, { useState } from "react";
import "./SignUp.css";

import { useUserContext } from "../../context/provider/userContext";

import { NavLink, Link } from "react-router-dom";

import { Form, Button, FormGroup } from "react-bootstrap";
import { FaEnvelope, FaLock, FaFont, FaMale } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";

//imported components
import Loader from "../Loader/Loader";

export default function SignUp({ handleModeChange }) {
  const { handleSignUp, loading, error } = useUserContext();
  const [signupState, setSignupState] = useState([]);
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required to signup"),
    username: Yup.string()
      .min(5, "Username must be 5 characters long")
      .required("Username is empty."),
    password: Yup.string()
      .min(8, "Password is too short.")
      .required("Password is empty.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number."
      ),
    confirmPassword: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords are not matched"
        ),
      })
      .required("Confirm Passowrd is empty."),
    gender: Yup.string().required("Please choose your gender."),
  });
  return (
    <div className="custom-signup-container">
      <h5 className="d-flex justify-content-start">
        Join us , many amazing stories await you , share as many as you want!
      </h5>
      <p style={{ borderBottom: "2px solid black", width: "30%" }} />
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            email: "" || signupState.email,
            username: "" || signupState.username,
            password: "" || signupState.password,
            confirmPassword: "" || signupState.confirmPassword,
            gender: "" || signupState.gender,
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            setSignupState(values);
            handleSignUp(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              {console.log(values)}
              <FormGroup>
                <Form.Label>
                  <FaEnvelope className="form-icons mr-2" />
                  Email
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  placeholder="input here..."
                />
                {errors.email && touched.email && (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                )}
                {error?.startsWith("Email") && (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {error}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaFont className="form-icons mr-2" />
                  Username
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  name="username"
                  placeholder="input here..."
                />
                {errors.username && touched.username && (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.username}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaLock className="form-icons mr-2" /> Password
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  placeholder="input here..."
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                ) : error?.startsWith("Passwords") ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {error}
                  </Form.Control.Feedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaLock className="form-icons mr-2" /> Confirm Password
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  placeholder="input here..."
                  type="password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                ) : error?.startsWith("Passwords") ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {error}
                  </Form.Control.Feedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaMale className="form-icons mr-2" /> Gender
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                  name="gender"
                  placeholder="input here..."
                >
                  {["...", "Male", "Femail"].map((gender, index) => (
                    <option value={index === 0 ? "" : gender} key={index}>
                      {gender}
                    </option>
                  ))}
                </Form.Control>
                {errors.gender && touched.gender && (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.gender}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <div className="form-footer">
                <Button variant="outline-dark" type="submit">
                  Sign Up
                </Button>
                <p
                  style={{
                    fontSize: "14px",
                    marginBottom: "0",
                    marginTop: "1rem",
                  }}
                >
                  Back to
                  <Link
                    to={"/auth/login"}
                    className="ml-1"
                    style={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    sign in.
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
