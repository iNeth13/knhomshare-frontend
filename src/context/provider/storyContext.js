import React, { useContext, createContext, useReducer } from "react";
import {
  STORY_POST_REQ,
  STORY_POST_SUCCESS,
  STORY_POST_FAIL,
  STORY_POST_COMMENT_REQ,
  STORY_POST_COMMENT_SUCCESS,
  STORY_POST_COMMENT_FAIL,
  STORY_GET_COMMENT_REQ,
  STORY_GET_COMMENT_SUCCESS,
  STORY_GET_COMMENT_FAIL,
  STORY_GET_POPULAR_REQ,
  STORY_GET_POPULAR_SUCCESS,
  STORY_GET_POPULAR_FAIL,
  STORY_GET_NEWEST_REQ,
  STORY_GET_NEWEST_SUCCESS,
  STORY_GET_NEWEST_FAIL,
  STORY_GET_SINGLE_REQ,
  STORY_GET_SINGLE_SUCCESS,
  STORY_GET_SINGLE_FAIL,
  STORY_GET_SEARCH_REQ,
  STORY_GET_SEARCH_SUCCESS,
  STORY_GET_SEARCH_FAIL,
  STORY_GET_EDIT_REQ,
  STORY_GET_EDIT_SUCCESS,
  STORY_GET_EDIT_FAIL,
  STORY_DELETE_REQ,
  STORY_DELETE_SUCCESS,
  STORY_DELETE_FAIL,
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
  const handleStoryPost = async (
    title,
    images,
    tags,
    content,
    user,
    subtitle
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
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

  const handleStoryComment = async (comment, user, storyId) => {
    // console.log("line 62");
    // console.log(comment, user, storyId);
    try {
      dispatch({ type: STORY_POST_COMMENT_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/post-comment`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            comment: comment,
            storyId: storyId,
          }),
          method: "POST",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        //console.log(responseData.message);
      }
      // dispatch({type : STORY_POST_COMMENT_SUCCESS,payload})
      //console.log(responseData);
    } catch (error) {
    }
  };

  const handleGetStoryComment = () => {
    try {
      dispatch({ type: STORY_GET_COMMENT_REQ });
    } catch (error) {}
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

  const handleNewestStories = async (page, keyword) => {
    //console.log(keyword, page);
    try {
      dispatch({ type: STORY_GET_NEWEST_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/get-newest?keyword=${keyword}&page=${page}`
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

  const handleStorySearch = async (page, keyword) => {
    try {
      dispatch({ type: STORY_GET_SEARCH_REQ });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/api/story/get-newest?keyword=${keyword}&page=${page}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({
        type: STORY_GET_SEARCH_SUCCESS,
        payload: responseData.stories,
      });
    } catch (error) {
      dispatch({ type: STORY_GET_SEARCH_FAIL, payload: error.message });
    }
  };

  const handleResetStorySearch = () => {
    dispatch({ type: "RESET_STORY_SEARCH" });
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

  const handleStoryEdit = async (storyId, token, method, values = {}) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let options =
      method === "GET"
        ? {
            route: `${process.env.REACT_APP_DEFAULT_URL}/api/story/edit/${storyId}`,
            option: {
              headers,
            },
          }
        : {
            route: `${process.env.REACT_APP_DEFAULT_URL}/api/story/edit/${storyId}/submit`,
            option: {
              headers,
              body: JSON.stringify({
                title: values.title,
                subtitle: values.subtitle,
                paragraph: values.content,
              }),
              method: "PATCH",
            },
          };

    try {
      dispatch({ type: STORY_GET_EDIT_REQ, payload: method });
      const response = await fetch(options.route, options.option);
      const responseData = await response.json();
      //console.log(responseData);
      dispatch({
        type: STORY_GET_EDIT_SUCCESS,
        payload: {
          story: responseData.story,
          message: responseData.message,
          method,
        },
      });
    } catch (error) {
      dispatch({
        type: STORY_GET_EDIT_FAIL,
        payload: { error: error.message, method },
      });
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
        handleStoryComment,
        handleGetStoryComment,
        handleStorySearch,
        handleResetStorySearch,
        handleStoryEdit,
      }}
    >
      {children}
    </storyContext.Provider>
  );
}

export const useStoryContext = () => {
  return useContext(storyContext);
};
