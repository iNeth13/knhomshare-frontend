import React, { useContext, createContext, useReducer } from "react";
import {
  STORY_POST_REQ,
  STORY_POST_SUCCESS,
  STORY_POST_FAIL,
} from "../action/storyAction";
import { RESET_STORY_ERROR } from "../action/sharedAction";
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
    console.log(images);
    const image = images[0];
    const formData = new FormData();
    formData.append("title", title);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("tags", tags);
    formData.append("paragraph", content);
    formData.append("userId", user._id);
    const response = await fetch("api/story/write", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
      method: "POST",
    });
    const responseData = await response.json();
    console.log(responseData, response);
    if (!response.ok) {
      console.log("i got called");
      dispatch({ type: STORY_POST_FAIL, payload: responseData.message });
    }
  };
  const handleResetStoryError = () => {
    dispatch({ type: RESET_STORY_ERROR });
  };

  return (
    <storyContext.Provider
      value={{ ...state, handleStoryPost, handleResetStoryError, stories }}
    >
      {children}
    </storyContext.Provider>
  );
}

export const useStoryContext = () => {
  return useContext(storyContext);
};
