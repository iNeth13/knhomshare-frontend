import React, { useReducer } from "react";

import authorReducer from "../reducer/authorReducer";

//author action
import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
} from "../action/authorAction";

const authorContext = React.createContext();

const initialState = {

};

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
      console.log(error);
    }
  };
  return (
    <authorContext.Provider value={{ ...state, handleRecommendAuthor }}>
      {children}
    </authorContext.Provider>
  );
}

export const useAuthorContext = () => {
  return React.useContext(authorContext);
};
