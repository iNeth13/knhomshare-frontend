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
} from "../action/storyAction";
import { RESET_STORY_ERROR, RESET_POST_MESSAGE } from "../action/sharedAction";
import storyReducer from "../reducer/storyReducer";

import img from "../../assets/topicImage/art-entertainment/bookLogo.jpeg";

const storyContext = createContext();

const initialValues = {
  sLoading: false,
  error: null,
};
let name = "inetca";
let title =
  "title title title title title title  title title titletitletitletitletitletitletitletitletitletitle";
console.log(title.length);
let content =
  "title title title title title title  title title titletitletitletitletitletitletitletitletitletitle title title title title title title  title title titletitletitletitletitletitletitletitletitletitle title title title title title title  title title titletitletitletitletitletitletitletitletitletitle title title title title title title  title title titletitletitletitletitletitletitletitletitletitle";
let stories = [
  {
    user: "user",
    userImage: img,
    image: img,
    title,
    content,
  },
  {
    user: "user",
    userImage: img,
    image: img,
    title,
    content,
  },
  {
    user: "user",
    userImage: img,
    image: img,
    title,
    content,
  },
];

export default function StoryProvider({ children }) {
  const [state, dispatch] = useReducer(storyReducer, initialValues);
  const handleStoryPost = async (title, images, tags, content, user) => {
    console.log(title, images, tags, content);
    console.log(user);
    console.log(images);
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
      console.log(responseData, response);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData.story);
      dispatch({ type: STORY_POST_SUCCESS });
    } catch (error) {
      console.log(error.message);
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
      console.log(responseData.pageCount, responseData.popularStories);
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

  const handleNewestStories = async () => {
    try {
      dispatch({ type: STORY_GET_NEWEST_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/get-newest`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      dispatch({
        type: STORY_GET_NEWEST_SUCCESS,
        payload: responseData.stories,
      });
    } catch (error) {
      dispatch({ type: STORY_GET_NEWEST_FAIL, payload: error.message });
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
      }}
    >
      {children}
    </storyContext.Provider>
  );
}

export const useStoryContext = () => {
  return useContext(storyContext);
};
