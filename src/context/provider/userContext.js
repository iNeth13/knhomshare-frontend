import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";

import { useLocation, useHistory } from "react-router-dom";

import userReducer from "../reducer/userReducer";

//imported user actions
import {
  USER_SIGN_UP_FAIL,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_REQ,
  USER_SIGN_IN_REQ,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT,
} from "../action/userAction";

//imported share action
import { RESET_USER_ERROR } from "../action/sharedAction";

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
  const {search} = useLocation();
  const [state, dispatch] = useReducer(userReducer, initialValues);
  const handleSignUp = async (values) => {
    try {
      console.log(values.password === values.confirmPassword);
      if (values.password !== values.confirmPassword) {
        console.log("i got called");
        throw new Error("Passwords do not match", 401);
      }
      dispatch({ type: USER_SIGN_UP_REQ });
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData, response);
      if (!response.ok) {
        dispatch({ type: USER_SIGN_UP_FAIL, payload: responseData.message });
      }
      console.log(responseData);
      localStorage.setItem("c-user", JSON.stringify(responseData.data));
      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: responseData.data });
      push("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_SIGN_UP_FAIL, payload: error.message });
    }
  };

  const handleSignin = async (values) => {
    const redirect = search && search.split('=')[1] === 'write' ? '/write' : '/';
    try {
      dispatch({ type: USER_SIGN_IN_REQ });
      const response = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/api/user/signin`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  const handleSignout = () => {
    localStorage.setItem("c-user", []);
    dispatch({ type: USER_SIGN_OUT });
  };

  useEffect(() => {
    dispatch({ type: RESET_USER_ERROR });
  }, [useLocation().search]);
  console.log(useLocation());
  return (
    <userContext.Provider value={{ ...state, handleSignUp, handleSignout ,handleSignin}}>
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(userContext);
};
