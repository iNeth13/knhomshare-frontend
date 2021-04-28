import React, { useContext, createContext, useReducer } from "react";
import {
  STORY_POST_REQ,
  STORY_POST_SUCCESS,
  STORY_POST_FAIL,
  STORY_GET_POPULAR_REQ,
  STORY_GET_POPULAR_SUCCESS,
  STORY_GET_POPULAR_FAIL,
  STORY_GET_NEWEST_REQ,
  STORY_GET_NEWEST_SUCCESS,
  STORY_GET_NEWEST_FAIL,
  STORY_GET_SINGLE_REQ,
  STORY_GET_SINGLE_SUCCESS,
  STORY_GET_SINGLE_FAIL,
} from "../action/storyAction";
import { RESET_STORY_ERROR, RESET_POST_MESSAGE } from "../action/sharedAction";
import storyReducer from "../reducer/storyReducer";

const storyContext = createContext();

const initialValues = {
  sLoading: false,
  error: null,
};
export default function StoryProvider({ children }) {
  const [state, dispatch] = useReducer(storyReducer, initialValues);
  const handleStoryPost = async (title, images, tags, content, user) => {
    const formData = new FormData();
    formData.append("title", title);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("tags", tags);
    formData.append("paragraph", content);
    formData.append("userId", user.userId);
    try {
      dispatch({ type: STORY_POST_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/write`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
          method: "POST",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({ type: STORY_POST_SUCCESS });
    } catch (error) {
      dispatch({ type: STORY_POST_FAIL, payload: error.message });
    }
  };

  const handlePopularStories = async () => {
    try {
      dispatch({ type: STORY_GET_POPULAR_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/popular?page=${1}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({
        type: STORY_GET_POPULAR_SUCCESS,
        payload: responseData.popularStories,
      });
    } catch (error) {
      dispatch({ type: STORY_GET_POPULAR_FAIL, payload: error.message });
    }
  };

  const handleNewestStories = async (page) => {
    try {
      dispatch({ type: STORY_GET_NEWEST_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/get-newest?page=${page}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({
        type: STORY_GET_NEWEST_SUCCESS,
        payload: {
          stories: responseData.stories,
          allStories: responseData.allStories,
        },
      });
    } catch (error) {
      dispatch({ type: STORY_GET_NEWEST_FAIL, payload: error.message });
    }
  };

  const handleSingleStory = async (id) => {
    try {
      dispatch({ type: STORY_GET_SINGLE_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/${id}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({ type: STORY_GET_SINGLE_SUCCESS, payload: responseData.story });
    } catch (error) {
      dispatch({ type: STORY_GET_SINGLE_FAIL, payload: error.message });
    }
  };

  const handleResetStoryError = () => {
    dispatch({ type: RESET_STORY_ERROR });
  };
  const handleResetPostMessage = () => {
    dispatch({ type: RESET_POST_MESSAGE });
  };
  return (
    <storyContext.Provider
      value={{
        ...state,
        handleStoryPost,
        handleResetStoryError,
        handleResetPostMessage,
        handlePopularStories,
        handleNewestStories,
        handleSingleStory,
      }}
    >
      {children}
    </storyContext.Provider>
  );
}

export const useStoryContext = () => {
  return useContext(storyContext);
};
