import {
  TOPIC_GET_RECOMMEND_REQ,
  TOPIC_GET_RECOMMEND_SUCCESS,
  TOPIC_GET_RECOMMEND_FAIL,
  TOPIC_POST_FOLLOW_SUCCESS,
  TOPIC_ERROR_FOLLOW,
} from "../action/topicAction";
export default function topicReducer(state, action) {
  console.log("hi from topic reducer");
  switch (action.type) {
    case TOPIC_GET_RECOMMEND_REQ:
      return {
        ...state,
        tLoading: true,
      };
    case TOPIC_GET_RECOMMEND_SUCCESS:
      return {
        ...state,
        tLoading: false,
        recommendedTopic: action.payload,
      };
    case TOPIC_GET_RECOMMEND_FAIL:
      return {
        ...state,
        tLoading: false,
      };
    case TOPIC_POST_FOLLOW_SUCCESS:
      return {
        ...state,
        followMessage: action.payload,
      };
    case TOPIC_ERROR_FOLLOW:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
