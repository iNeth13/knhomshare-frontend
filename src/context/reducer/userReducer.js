import {
  USER_SIGN_UP_REQ,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_SIGN_IN_REQ,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT,
  USER_PROFILE_REQ,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_CHANGE_REQ,
  USER_PROFILE_CHANGE_SUCCESS,
  USER_PROFILE_CHANGE_FAIL,
  USER_USERNAME_BIO_CHANGE_REQ,
  USER_USERNAME_BIO_CHANGE_SUCCESS,
  USER_USERNAME_BIO_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_REQ,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
} from "../action/userAction";
import {
  RESET_USER_ERROR,
  RESET_PROFILE_MESSAGE,
} from "../action/sharedAction";
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
    case USER_PROFILE_REQ:
      return {
        ...state,
        uLoading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        uLoading: false,
        userInfo: action.payload.userInfo,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        uLoading: false,
        error: action.payload,
      };
    case "USER_GET_STORIES_REQ":
      return {
        ...state,
        userStoriesLoading: true,
      };
    case "USER_GET_STORIES_SUCCESS":
      return {
        ...state,
        userStoriesLoading: false,
        userInfo: action.payload.userInfo,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case USER_PROFILE_CHANGE_REQ:
      return {
        ...state,
        uLoading: true,
      };
    case USER_PROFILE_CHANGE_SUCCESS:
      return {
        ...state,
        uLoading: false,
        userInfo: action.payload.responseData,
        message: action.payload.message,
      };
    case USER_PROFILE_CHANGE_FAIL:
      return {
        ...state,
        uLoading: false,
        error: action.payload,
      };
    case USER_USERNAME_BIO_CHANGE_REQ:
      return {
        ...state,
        uLoading: true,
      };
    case USER_USERNAME_BIO_CHANGE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        uLoading: false,
        userInfo: action.payload.updatedUser,
        message: action.payload.message,
      };
    case USER_USERNAME_BIO_CHANGE_FAIL:
      return {
        ...state,
        uLoading: false,
        error: action.payload,
      };
    case USER_PASSWORD_CHANGE_REQ:
      return {
        ...state,
        uLoading: true,
      };
    case USER_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        uLoading: false,
        message: action.payload,
      };
    case USER_PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        uLoading: false,
        error: action.payload,
      };
    case RESET_PROFILE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        error: null,
      };
  }
};

export default userReducer;
