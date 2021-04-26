import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
} from "../action/authorAction";

const authorReducer = (state, action) => {
  switch (action.type) {
    case AUTHOR_RECOMMEND_REQ:
      return {
        ...state,
        aLoading: true,
      };
    case AUTHOR_RECOMMEND_SUCCESS:
      console.log(action.payload);
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

    default:
      return state;
  }
};

export default authorReducer;
