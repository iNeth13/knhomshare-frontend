import React, { useState } from "react";
import "./SignIn.css";

import { NavLink, Link } from "react-router-dom";

import { useUserContext } from "../../context/provider/userContext";

import { Form, Button, FormGroup } from "react-bootstrap";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";

import Loader from "../Loader/Loader";

export default function SignIn({ handleModeChange }) {
  const { handleSignin, error, loading } = useUserContext();
  console.log(error);
  const [signinState, setSigninState] = useState([]);
  const SigninSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
    .min(5,'Username must be longer than 5 characters.')
      .matches(
        /^(?:[A-Z\d][A-Z\d_-]{4,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i
      ,'Invalid Email Address')
      .required("Email/Username is required to Signin."),
    password: Yup.string()
      .min(6, "Password must be 6 characters long.")
      .required("Password is empty."),
  });

  return (
    <div className="custom-signin-container">
      <h5
        className="d-flex justify-content-start mb-4"
        style={{ borderBottom: "2px solid black" }}
      >
        Welcome back!
      </h5>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            emailOrUsername: "" || signinState.emailOrUsername,
            password: "" || signinState.password,
          }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            setSigninState(values);
            handleSignin(values);
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
              {console.log(errors, touched)}
              <FormGroup>
                <Form.Label className="d-flex align-items-center">
                  <FaEnvelope className="form-icons mr-2" />
                  Email or Username
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailOrUsername}
                  placeholder="input here..."
                  name="emailOrUsername"
                />
                {errors.emailOrUsername && touched.emailOrUsername ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.emailOrUsername}
                  </Form.Control.Feedback>
                ) : error?.startsWith("Email/Username") ? (
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
                  <FaLock className="form-icons mr-2" />
                  Password
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="input here..."
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                ) : error?.startsWith("Password") ? (
                  <Form.Control.Feedback
                    style={{ display: "block" }}
                    type="invalid"
                  >
                    {error}
                  </Form.Control.Feedback>
                ) : null}
              </FormGroup>
              <div className="form-footer">
                <Button variant="outline-dark" type="submit">
                  Sign In
                </Button>
                <p
                  style={{ fontSize: "14px", marginBottom: "0" }}
                  onClick={() => handleModeChange(true)}
                >
                  New user?
                  <Link to={`auth?signup&redirect=/`}>Sign up now!</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
//     name : Yup.string().min(5,'Name must be atleast 5 characters long.').max(20,'Name cannot contain more than 20 characters long').required('Name is required to SignIn')
