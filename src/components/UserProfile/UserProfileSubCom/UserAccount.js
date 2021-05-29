import React, { useEffect, useState, useRef } from "react";
import "./UserAccount.css";
import { useHistory, useLocation } from "react-router-dom";
import { Image, Form, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";

import { useUserContext } from "../../../context/provider/userContext";
import AlertMessageDBlock from "../../AlertMessageDBlock/AlertMessageDBlock";
import Feedback from "../../Feedback/Feedback";

const editProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long.")
    .required("Username is empty."),
  bio: Yup.string().max(200, "Bio can no longer than 200 characters long."),
});
const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password should be 8 characters long.")
    .required("Your current password"),
  newPassword: Yup.string()
    .min(8, "Password is too short.")
    .matches(
      /^(?=.*[A-Za-z ])(?=.*\d)(?=.*[@$!%*#^?&()])[A-Za-z\d@$!%*#?&() ]{8,}$/,
      "Minimum eight characters, at least one letter, one number and one special character(!,@,#,$,%,^,&,*,(,) )."
    )
    .required("Password is empty."),
  confirmNewPassword: Yup.string()
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Passwords are not matched"
      ),
    })
    .required("Confirm Password is empty"),
});

export default function UserAccount({
  username,
  gender,
  email,
  profilePic,
  bio,
}) {
  const { push } = useHistory();
  const { search } = useLocation();
  const {
    user,
    handleProfileImageChange,
    message,
    handleUsernameAndBioChange,
    handlePasswordChange,
    error,
  } = useUserContext();
  const [newPassword, setNewPassword] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editProfile, setEditProfile] = useState({
    editUsername: false,
    editBio: false,
  });
  // const [updatedUsername, setUpdatedUserName] = useState(usernameA);
  // const [updatedBio, setUpdatedBio] = useState(bioA);
  const [pendingProfile, setPendingProfile] = useState();
  const openFileBrowser = useRef(null);
  if (!user) {
    push("/");
  }
  const handleOpenFileBrowser = () => {
    openFileBrowser.current.click();
  };
  const handlePendingProfile = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    console.log("hi");
    handleProfileImageChange(file, user.userId, user.token);
  };
  const handleEditOption = (option) => {
    setEditProfile((prev) => {
      if (option === "username") {
        return {
          ...prev,
          editUsername: !editProfile.editUsername,
        };
      } else if (option === "bio") {
        return {
          ...prev,
          editBio: !editProfile.editBio,
        };
      }
      return prev;
    });
  };
  return (
    <div className="">
      <div>
        {message ? (
          <AlertMessageDBlock variant="success" alertMessage={message} />
        ) : error ? (
          <AlertMessageDBlock variant="danger" alertMessage={error} />
        ) : null}
      </div>
      <div className="user-account-container">
        <div
          className="user-profile-container"
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
        >
          <Image
            src={`${process.env.REACT_APP_DEFAULT_URL}/${profilePic}`}
            rounded
            className="user-profile-image"
            width={100}
            height={100}
          />
          <div className="show-edit" edit-profile-container`}>
            <p className="edit-profile" onClick={handleOpenFileBrowser}>
              Edit
            </p>
            <Form.File
              accept=".jpeg,.png,.jpg"
              ref={openFileBrowser}
              style={{ display: "none" }}
              id="image"
              onChange={handlePendingProfile}
            />
          </div>
        </div>
        <div style={{ width: "80%" }}>
          <Formik
            initialValues={{
              username: "" || username,
              bio: "" || bio,
            }}
            validationSchema={editProfileSchema}
            onSubmit={(value) => {
              handleUsernameAndBioChange(
                value.username,
                value.bio,
                user.userId,
                user.token
              );
            }}
          >
            {({ values, handleChange, errors, setErrors, handleSubmit }) => (
              <div style={{ width: "70%" }}>
                {/* username */}
                {console.log(values)}
                <div>
                  <input
                    value={values.username}
                    disabled={!editProfile.editUsername && true}
                    className="change-form"
                    name="username"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.username && editProfile.editUsername && (
                    <Feedback feedbackMessage={errors.username} />
                  )}
                  <div style={{ margin: ".5rem 0" }}>
                    {!editProfile.editUsername ? (
                      <span
                        onClick={() => handleEditOption("username")}
                        className="edit-btn"
                      >
                        Edit Username
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          handleEditOption("username", true);
                          values.username = username;
                          setErrors("");
                        }}
                        className="edit-btn"
                      >
                        Cancle
                      </span>
                    )}
                    {editProfile.editUsername && (
                      <span
                        style={{ marginLeft: ".5rem" }}
                        className="edit-btn"
                        onClick={handleSubmit}
                      >
                        Save
                      </span>
                    )}
                  </div>
                </div>
                {/* bio */}
                <div>
                  <textarea
                    value={values.bio}
                    onChange={handleChange}
                    name="bio"
                    className="change-form textarea"
                    disabled={!editProfile.editBio && true}
                    rows={4}
                  />
                  <div>
                    {!editProfile.editBio ? (
                      <span
                        onClick={() => handleEditOption("bio")}
                        className="edit-btn"
                      >
                        Edit Bio
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          handleEditOption("bio");
                          values.bio = bio;
                          setErrors("");
                        }}
                        className="edit-btn"
                      >
                        Cancle
                      </span>
                    )}
                    {editProfile.editBio && (
                      <span
                        style={{ marginLeft: ".5rem" }}
                        className="edit-btn"
                        onClick={handleSubmit}
                      >
                        Save
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Formik>
          <Formik
            initialValues={{
              password: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={(value) => {
              handlePasswordChange(
                value.password,
                value.newPassword,
                user.userId,
                user.token
              );
            }}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <div className="password-change-container">
                {/* current password */}
                {console.log(errors)}
                <input
                  type="password"
                  value={values.password}
                  className="password-form"
                  name="password"
                  onChange={handleChange}
                  placeholder="Current Password"
                  autoComplete="off"
                />
                {errors.password && (
                  <Feedback feedbackMessage={errors.password} />
                )}
                {/* new password */}
                <input
                  type="password"
                  value={values.newPassword}
                  name="newPassword"
                  onChange={handleChange}
                  autoComplete="off"
                  className="password-form"
                  placeholder="New Password"
                />
                {errors.newPassword && (
                  <Feedback feedbackMessage={errors.newPassword} />
                )}
                {/* confirm new password */}
                <input
                  type="password"
                  value={values.confirmNewPassword}
                  className="password-form"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Confirm New Password"
                />
                {errors.confirmNewPassword && (
                  <Feedback feedbackMessage={errors.confirmNewPassword} />
                )}
                <Button
                  onClick={handleSubmit}
                  variant="outline-dark"
                  style={{ marginTop: "1rem" }}
                >
                  Change Password
                </Button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
