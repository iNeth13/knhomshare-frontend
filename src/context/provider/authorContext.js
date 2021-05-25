import React, { useReducer } from "react";

import authorReducer from "../reducer/authorReducer";

//author action
import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
  AUTHOR_GET_FOLLOW_REQ,
  AUTHOR_GET_FOLLOW_SUCCESS,
  AUTHOR_GET_FOLLOW_FAIL,
} from "../action/authorAction";

const authorContext = React.createContext();

const initialState = {};

export default function AuthorProvider({ children }) {
  const [state, dispatch] = useReducer(authorReducer, initialState);
  const handleRecommendAuthor = async () => {
    try {
      dispatch({ type: AUTHOR_RECOMMEND_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/author/recommend-author`
      );
      const responseData = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTHOR_RECOMMEND_FAIL,
          payload: responseData.message,
        });
      }
      dispatch({
        type: AUTHOR_RECOMMEND_SUCCESS,
        payload: responseData.author,
      });
    } catch (error) {
      //console.log(error);
    }
  };
  const handleFollowAuthor = async (
    userId,
    userToken,
    authorId,
    type,
    remove
  ) => {
    try {
      dispatch({ type: AUTHOR_GET_FOLLOW_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/author/${type}?remove=${remove}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorId,
          }),
          method: "POST",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({ type: AUTHOR_GET_FOLLOW_SUCCESS, payload: responseData });
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTHOR_GET_FOLLOW_FAIL, payload: error.message });
    }
  };
  const handleErrorAuthorError = () => {
    dispatch({ type: "RESET_AUTHOR_ERROR" });
  };
  return (
    <authorContext.Provider
      value={{
        ...state,
        handleRecommendAuthor,
        handleFollowAuthor,
        handleErrorAuthorError,
      }}
    >
      {children}
    </authorContext.Provider>
  );
}

export const useAuthorContext = () => {
  return React.useContext(authorContext);
};
