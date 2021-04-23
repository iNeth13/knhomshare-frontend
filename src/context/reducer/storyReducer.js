import {
  STORY_POST_REQ,
  STORY_POST_SUCCESS,
  STORY_POST_FAIL,
} from "../action/storyAction";
import {RESET_STORY_ERROR} from '../action/sharedAction';

const storyReducer = (state, action) => {
  switch (action.type) {
    case STORY_POST_FAIL:
      console.log('i got called');
      console.log(action.payload)
      return {
        ...state,
        sLoading: false,
        error: action.payload,
      };
    case RESET_STORY_ERROR:
      return {
        ...state,
        error : null
      };
    default:
      return state;
  }
};
export default storyReducer;
