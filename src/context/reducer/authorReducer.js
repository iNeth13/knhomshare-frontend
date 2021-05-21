import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
  AUTHOR_GET_FOLLOW_REQ,
  AUTHOR_GET_FOLLOW_SUCCESS,
  AUTHOR_GET_FOLLOW_FAIL,
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
      };
    default:
      return state;
  }
};

export default authorReducer;
