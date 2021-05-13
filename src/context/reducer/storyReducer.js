import {
  STORY_POST_REQ,
  STORY_POST_SUCCESS,
  STORY_POST_FAIL,
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
  STORY_DELETE_COMMENT_REQ,
  STORY_DELETE_COMMENT_SUCCESS,
  STORY_DELETE_COMMENT_FAIL,
} from "../action/storyAction";
import { RESET_STORY_ERROR, RESET_POST_MESSAGE } from "../action/sharedAction";

const storyReducer = (state, action) => {
  switch (action.type) {
    case STORY_POST_REQ:
      return {
        ...state,
        sLoading: true,
      };
    case STORY_POST_SUCCESS:
      return {
        ...state,
        sLoading: false,
        sMessage: "Your story was published.",
      };
    case STORY_POST_FAIL:
      return {
        ...state,
        sLoading: false,
        error: action.payload,
      };
    case STORY_GET_POPULAR_REQ:
      return {
        ...state,
        sLoading: true,
      };
    case STORY_GET_POPULAR_SUCCESS:
      return {
        ...state,
        sLoading: false,
        popularStories: action.payload,
      };
    case STORY_GET_POPULAR_FAIL:
      return {
        ...state,
        sLoading: false,
        error: action.payload,
      };
    case STORY_GET_NEWEST_REQ: {
      return {
        ...state,
        nLoading: true,
      };
    }
    case STORY_GET_NEWEST_SUCCESS: {
      return {
        ...state,
        newestStories: action.payload.stories,
        allStories: action.payload.allStories,
        nLoading: false,
      };
    }
    case STORY_GET_NEWEST_FAIL: {
      return {
        ...state,
        error: action.payload,
        nLoading: false,
      };
    }
    case STORY_GET_SINGLE_REQ:
      return {
        ...state,
        sLoading: true,
      };

    case STORY_GET_SINGLE_SUCCESS:
      return {
        ...state,
        singleStory: action.payload,
        sLoading: false,
      };
    case STORY_GET_SINGLE_FAIL:
      return {
        ...state,
        sLoading: false,
        error: action.payload,
      };
    case STORY_GET_SEARCH_REQ:
      return {
        ...state,
        sLoading: true,
      };
    case STORY_GET_SEARCH_SUCCESS:
      return {
        ...state,
        sLoading: false,
        storySearchResult: action.payload,
      };
    case STORY_GET_EDIT_REQ:
      return {
        ...state,
        editStoryLoading: true,
        editSubmitLoading: action.payload === "PATCH" && true,
      };
    case STORY_GET_EDIT_SUCCESS:
      return {
        ...state,
        editStoryLoading: false,
        editSubmitLoading: action.payload.method === "PATCH" && false,
        story: action.payload.story,
        message: action.payload.message,
        editTime: action.payload.editTime,
      };
    case STORY_GET_EDIT_FAIL:
      return {
        ...state,
        editStoryLoading: false,
        editSubmitLoading: action.payload.method === "PATCH" && false,
        error: action.payload.error,
      };
    case "RESET_STORY_SEARCH":
      return {
        ...state,
        storySearchResult: [],
      };
    case STORY_DELETE_REQ:
      return {
        ...state,
        deleteStoryLoading: true,
      };
    case STORY_DELETE_SUCCESS:
      return {
        ...state,
        deleteStoryLoading: false,
        deleteTime: action.payload.deleteTime,
        message: action.payload.message,
      };
    case STORY_DELETE_FAIL:
      return {
        ...state,
        deleteStoryLoading: false,
        message: action.payload,
      };
    case RESET_STORY_ERROR:
      return {
        ...state,
        error: null,
      };
    case RESET_POST_MESSAGE:
      return {
        ...state,
        sMessage: null,
      };
    case "RESET_EDIT_MESSAGE":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
export default storyReducer;
