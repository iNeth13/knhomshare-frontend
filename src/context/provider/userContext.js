import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";

import { useLocation, useHistory } from "react-router-dom";

import userReducer from "../reducer/userReducer";
import useLocalStorage from "../../components/utils/useLocalStorage";

//imported user actions
import {
  USER_SIGN_UP_FAIL,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_REQ,
  USER_SIGN_IN_REQ,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT,
  USER_PROFILE_REQ,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_CHANGE_REQ,
  USER_PROFILE_CHANGE_SUCCESS,
  USER_PROFILE_CHANGE_FAIL,
  USER_USERNAME_BIO_CHANGE_REQ,
  USER_USERNAME_BIO_CHANGE_SUCCESS,
  USER_USERNAME_BIO_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_REQ,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
} from "../action/userAction";

//imported share action
import {
  RESET_USER_ERROR,
  RESET_PROFILE_MESSAGE,
} from "../action/sharedAction";

const getUserFromLocalStorage = localStorage.getItem("c-user")
  ? JSON.parse(localStorage.getItem("c-user"))
  : null;

const userContext = createContext();

const initialValues = {
  loading: false,
  user: getUserFromLocalStorage,
  error: null,
};

export default function UserProvider({ children }) {
  const { push } = useHistory();
  const { search } = useLocation();
  const [getFromLocal, setToLocal] = useLocalStorage();
  const [state, dispatch] = useReducer(userReducer, initialValues);

  const handleSignUp = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match", 401);
      }
      dispatch({ type: USER_SIGN_UP_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/signup`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        dispatch({ type: USER_SIGN_UP_FAIL, payload: responseData.message });
      }
      localStorage.setItem("c-user", JSON.stringify(responseData.data));
      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: responseData.data });
      push("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_SIGN_UP_FAIL, payload: error.message });
    }
  };

  const handleSignin = async (values) => {
    // const redirect =
    //   search && search.split("=")[1] === "write"
    //     ? "/write"
    //     : "story"
    //     ? `/story/${search.split("=")[2]}`
    //     : "homepage"
    //     ? "/"
    //     : "";
    let redirect;
    if (search.split("=")[1].startsWith("write")) {
      redirect = "/write";
    } else if (search.split("=")[1].startsWith("story")) {
      redirect = `/story/${search.split("=")[2]}`;
    } else if (search.split("=")[1].startsWith("homepage")) {
      redirect = "/";
    }
    console.log(search.split("="));
    console.log("redirect : " + redirect);
    try {
      dispatch({ type: USER_SIGN_IN_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/signin`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      localStorage.setItem("c-user", JSON.stringify(responseData.data));
      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: responseData.data });
      push(redirect);
    } catch (error) {
      dispatch({ type: USER_SIGN_IN_FAIL, payload: error.message });
    }
  };

  const handleUserProfile = async (token, page) => {
    console.log(token, page);
    try {
      dispatch({ type: USER_PROFILE_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/profile?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: {
          userInfo: responseData.responseData,
          totalPages: responseData.totalPages,
        },
      });
    } catch (error) {
      dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
    }
  };

  const handleUserStories = async (token, page) => {
    console.log(page);
    try {
      dispatch({ type: "USER_GET_STORIES_REQ" });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/profile?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      console.log(responseData);
      dispatch({
        type: "USER_GET_STORIES_SUCCESS",
        payload: {
          userInfo: responseData.responseData,
          totalPages: responseData.totalPages,
          currentPage: responseData.currentPage,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImageChange = async (file, userId, userToken) => {
    try {
      dispatch({ type: USER_PROFILE_CHANGE_REQ });
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData, userId);
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/change-profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const getExistedUserFromStorage = getFromLocal("c-user");
      getExistedUserFromStorage.profilePic =
        responseData.responseData.profilePic;
      setToLocal("c-user", getExistedUserFromStorage);
      state.user.profilePic = responseData.responseData.profilePic;
      dispatch({
        type: USER_PROFILE_CHANGE_SUCCESS,
        payload: {
          responseData: responseData.responseData,
          message: responseData.message,
        },
      });
    } catch (error) {
      dispatch({ type: USER_PROFILE_CHANGE_FAIL, payload: error.message });
    }
  };

  const handleUsernameAndBioChange = async (
    newUsername,
    newBio,
    userId,
    userToken
  ) => {
    console.log(newUsername, newBio, userId, userToken);
    try {
      dispatch({ type: USER_USERNAME_BIO_CHANGE_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/username-bio-change/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            newUsername: newUsername,
            newBio: newBio,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      const getUserFromLocalStorage = getFromLocal("c-user");
      getUserFromLocalStorage.username = responseData.responseData.username;
      setToLocal("c-user", getUserFromLocalStorage);
      state.user.username = responseData.responseData.username;
      dispatch({
        type: USER_USERNAME_BIO_CHANGE_SUCCESS,
        payload: {
          updatedUser: responseData.responseData,
          message: responseData.message,
        },
      });
    } catch (error) {
      dispatch({ type: USER_USERNAME_BIO_CHANGE_FAIL, payload: error.message });
    }
  };

  const handlePasswordChange = async (
    password,
    newPassword,
    userId,
    userToken
  ) => {
    try {
      dispatch({ type: USER_PASSWORD_CHANGE_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/password-change/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, newPassword }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData.message);
        throw new Error(responseData.message);
      }
      console.log(responseData.message);
      dispatch({
        type: USER_PASSWORD_CHANGE_SUCCESS,
        payload: responseData.message,
      });
    } catch (error) {
      dispatch({ type: USER_PASSWORD_CHANGE_FAIL, payload: error.message });
    }
  };

  const handleStoryEdit = async (storyId)=>{
    console.log(storyId)
  }

  const handleSignout = () => {
    localStorage.setItem("c-user", []);
    dispatch({ type: USER_SIGN_OUT });
  };

  useEffect(() => {
    dispatch({ type: RESET_USER_ERROR });
    dispatch({ type: RESET_PROFILE_MESSAGE });
  }, [useLocation().search]);
  return (
    <userContext.Provider
      value={{
        ...state,
        handleSignUp,
        handleSignout,
        handleSignin,
        handleUserProfile,
        handleProfileImageChange,
        handleUsernameAndBioChange,
        handlePasswordChange,
        handleUserStories,
        handleStoryEdit
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(userContext);
};
