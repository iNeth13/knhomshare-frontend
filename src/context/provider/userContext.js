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
  USER_GET_CURRENTUSER_REQ,
  USER_GET_CURRENTUSER_SUCCESS,
  USER_GET_CURRENTUSER_FAIL,
  USER_GET_FOLLOWERS_FOLLOWING_REQ,
  USER_GET_FOLLOWERS_FOLLOWING_SUCCESS,
  USER_GET_FOLLOWERS_FOLLOWING_FAIL,
  USER_REQ_PASSWORD_RESET_REQ,
  USER_REQ_PASSWORD_RESET_SUCCESS,
  USER_REQ_PASSWORD_RESET_FAIL,
  USER_RESET_PASSWORD_REQ,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_LOVE_STORY_REQ,
  USER_LOVE_STORY_SUCCESS,
  USER_LOVE_STORY_FAIL,
  GET_USER_FAVORITE_FAIL,
  GET_USER_FAVORITE_REQ,
  GET_USER_FAVORITE_SUCCESS,
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
      console.log(responseData, response);
      if (!response.ok) {
        return dispatch({
          type: USER_SIGN_UP_FAIL,
          payload: responseData.message,
        });
      }
      localStorage.setItem("c-user", JSON.stringify(responseData.data));
      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: responseData.data });
      push("/");
    } catch (error) {
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
    if (search) {
      if (search.split("=")[1].startsWith("write")) {
        redirect = "/write";
      } else if (search.split("=")[1].startsWith("story")) {
        redirect = `/story/${search.split("=")[2]}`;
      } else if (search.split("=")[1].startsWith("homepage")) {
        redirect = "/";
      }
    } else {
      redirect = "/";
    }
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

  const handleUserProfile = async (token, action = "", page) => {
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
  const handleUserFollowersAndFollowing = async (token, action, page) => {
    console.log(page);
    try {
      dispatch({ type: USER_GET_FOLLOWERS_FOLLOWING_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/profile/fu?action=${action}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      dispatch({
        type: USER_GET_FOLLOWERS_FOLLOWING_SUCCESS,
        payload: {
          totalPages: responseData.totalPages,
          followers: responseData.followers,
          following: responseData.following,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserStories = async (token, page) => {
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
        // console.log(responseData.message);
        throw new Error(responseData.message);
      }
      //(responseData.message);
      dispatch({
        type: USER_PASSWORD_CHANGE_SUCCESS,
        payload: responseData.message,
      });
    } catch (error) {
      dispatch({ type: USER_PASSWORD_CHANGE_FAIL, payload: error.message });
    }
  };

  const handleCurrentUser = async () => {
    if (state.user) {
      try {
        dispatch({ type: USER_GET_CURRENTUSER_REQ });
        console.log(state.user.userId);
        const response = await fetch(
          `${process.env.REACT_APP_DEFAULT_URL}/api/user/current-user/${state.user.userId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        dispatch({
          type: USER_GET_CURRENTUSER_SUCCESS,
          payload: responseData.currentUser,
        });
      } catch (error) {
        dispatch({ type: USER_GET_CURRENTUSER_FAIL, payload: error.message });
      }
    }
  };

  const handleReqPasswordReset = async (email) => {
    try {
      dispatch({ type: USER_REQ_PASSWORD_RESET_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({ type: USER_REQ_PASSWORD_RESET_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_REQ_PASSWORD_RESET_FAIL, payload: error.message });
    }
  };
  const handleResetPassword = async (password, token) => {
    console.log("i got called");
    try {
      dispatch({ type: USER_RESET_PASSWORD_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/reset`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );
      if (!response.ok && response.status === 500) {
        return dispatch({ type: "RESET_LINK_EXPIRES" });
      }
      const responseData = await response.json();
      localStorage.setItem("c-user", JSON.stringify(responseData.responseUser));
      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: responseData.responseUser,
      });
      push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleValidLink = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/check/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        return dispatch({ type: "RESET_LINK_EXPIRES" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoveStories = async (storyId, userId, type) => {
    try {
      console.log(state.lLoading);
      if (state.lLoading) {
        console.log("i got called");
        return;
      }
      dispatch({ type: USER_LOVE_STORY_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/love/${type}/${userId}/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user?.token}`,
          },
        }
      );
      dispatch({ type: USER_LOVE_STORY_SUCCESS });
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_LOVE_STORY_FAIL });
    }
  };

  const handleUserFavorite = async () => {
    try {
      dispatch({ type: GET_USER_FAVORITE_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/user/favorite`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData, response);
      dispatch({
        type: GET_USER_FAVORITE_SUCCESS,
        payload: responseData.favoriteStories,
      });
    } catch (error) {
      dispatch({ type: GET_USER_FAVORITE_FAIL });
    }
  };

  const handleSignout = () => {
    localStorage.setItem("c-user", []);
    dispatch({ type: USER_SIGN_OUT });
  };

  useEffect(() => {
    dispatch({ type: RESET_USER_ERROR });
    dispatch({ type: RESET_PROFILE_MESSAGE });
  }, [useLocation().search, useLocation().pathname]);
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
        handleCurrentUser,
        handleUserFollowersAndFollowing,
        handleReqPasswordReset,
        handleValidLink,
        handleLoveStories,
        handleUserFavorite,
        handleResetPassword,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(userContext);
};
