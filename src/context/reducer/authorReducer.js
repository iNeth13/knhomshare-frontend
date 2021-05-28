import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
  AUTHOR_GET_FOLLOW_REQ,
  AUTHOR_GET_FOLLOW_SUCCESS,
  AUTHOR_GET_FOLLOW_FAIL,
  AUTHOR_GET_PROFILE_REQ,
  AUTHOR_GET_PROFILE_SUCCESS,
  AUTHOR_GET_PROFILE_FAIL,
} from "../action/authorAction";

const authorReducer = (state, action) => {
  switch (action.type) {
    case AUTHOR_RECOMMEND_REQ:
      return {
        ...state,
        aLoading: true,
      };
    case AUTHOR_RECOMMEND_SUCCESS:
      return {
        ...state,
        recommendedAuthors: action.payload,
        aLoading: false,
      };
    case AUTHOR_RECOMMEND_FAIL:
      return {
        ...state,
        aLoading: false,
      };
    case AUTHOR_GET_FOLLOW_REQ:
      return {
        ...state,
        authorFollowLoading: true,
      };
    case AUTHOR_GET_FOLLOW_SUCCESS:
      return {
        ...state,
        authorFollowLoading: false,
      };
    case AUTHOR_GET_FOLLOW_FAIL:
      return {
        ...state,
        authorFollowLoading: false,
        authorErrorMessage: action.payload,
      };
    case AUTHOR_GET_PROFILE_REQ:
      console.log("author get profile req 1");
      return {
        ...state,
        aLoading: true,
      };
    case AUTHOR_GET_PROFILE_SUCCESS:
      console.log("author get profile req 2");
      return {
        ...state,
        aLoading: false,
        authorProfile: action.payload,
        mLoading: false,
      };
    case AUTHOR_GET_PROFILE_FAIL:
      console.log("this line got");
      return {
        ...state,
        aLoading: false,
        authorNotFound: true,
      };
    case "AUTHOR_GET_PPROFILE_MORESTORIES_REQ":
      console.log("  mLoading: true, got called");
      return {
        ...state,
        mLoading: true,
      };
    case "REMOVE_AUTHOR_PROFILE":
      return {
        ...state,
        authorProfile: {},
      };
    case "RESET_AUTHOR_ERROR":
      return {
        ...state,
        authorErrorMessage: null,
      };
    default:
      return state;
  }
};

export default authorReducer;
