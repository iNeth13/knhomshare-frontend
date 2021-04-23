import {
  USER_SIGN_UP_REQ,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_SIGN_IN_REQ,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT,
} from "../action/userAction";
import { RESET_USER_ERROR } from "../action/sharedAction";
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQ:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case USER_SIGN_IN_REQ:
        return {
          ...state,
          loading: true,
        };
      case USER_SIGN_IN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_SIGN_IN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case USER_SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        error: null,
      };
  }
};

export default userReducer;
