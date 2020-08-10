import {
  FETCH_REGISTER_SUCCESS,
  FETCH_LOGIN_FAIL,
  FETCH_ISSUES_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  FETCH_REGISTER_START,
  CREATE_ISSUE_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_PROFILE_SUCCESS,
} from "../actions/actions";

const initialState = {
  username: "",
  issues: [],
  isFetching: false,
  error: "",
  signedIn: false,
  currentProfile: {
    userInfo: {},
    userPosts: [],
  },
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTER_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        username: action.payload.data.username,
        isFetching: false,
        signedIn: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        error: "",
      };
    case FETCH_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        signedIn: false,
      };
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        issues: action.payload,
        signedIn: true,
      };
    case CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        ...state.currentProfile,
        userInfo: action.payload.userInfo,
        userPosts: action.payload.userPosts,
      };

    default:
      return state;
  }
};
