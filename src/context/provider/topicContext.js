import { ErrorMessage } from "formik";
import React, { createContext, useReducer, useContext } from "react";
import {
  TOPIC_GET_RECOMMEND_REQ,
  TOPIC_GET_RECOMMEND_SUCCESS,
  TOPIC_GET_RECOMMEND_FAIL,
  TOPIC_POST_FOLLOW_SUCCESS,
  TOPIC_GET_RELATED_REQ,
  TOPIC_GET_RELATED_SUCCESS,
  TOPIC_GET_RELATED_FAIL,
  TOPIC_ERROR_FOLLOW,
} from "../action/topicAction";
import topicReducer from "../reducer/topicReducer";

const topicContext = createContext();

const initialValues = {};
export default function TopicProvider({ children }) {
  const [state, dispatch] = useReducer(topicReducer, initialValues);
  const handleRecommendTopic = async () => {
    try {
      dispatch({ type: TOPIC_GET_RECOMMEND_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/topic/recommend-topic`
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(responseData.message);
      }
      console.log(responseData);
      dispatch({ type: TOPIC_GET_RECOMMEND_SUCCESS, payload: responseData });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOPIC_GET_RECOMMEND_FAIL, payload: error.message });
    }
  };

  const handleFollowTopic = async (userId, userToken, topicName, type) => {
    if (!userId) {
      console.log("no user found");
      return dispatch({
        type: TOPIC_ERROR_FOLLOW,
        payload: "You are not logged in.",
      });
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/topic/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ topicName }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      dispatch({
        type: TOPIC_POST_FOLLOW_SUCCESS,
        payload: responseData.followedTopics,
      });
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRelatedStories = async (topics) => {
    console.log(topics);
    try {
      dispatch({ type: TOPIC_GET_RELATED_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/topic/get-related`,
        {
          method: "POST",
          body: JSON.stringify({ topics }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({ type: TOPIC_GET_RELATED_SUCCESS, payload: responseData });
      console.log(responseData);
    } catch (error) {
      dispatch({ type: TOPIC_GET_RELATED_FAIL, payload: error.message });
    }
  };

  return (
    <topicContext.Provider
      value={{
        ...state,
        handleRecommendTopic,
        handleFollowTopic,
        handleRelatedStories,
      }}
    >
      {children}
    </topicContext.Provider>
  );
}

export const useTopicContext = () => {
  return useContext(topicContext);
};
