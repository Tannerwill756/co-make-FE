import { axiosWithAuth } from "../../utils/axiosWithAuth";
import axios from "axios";

export const FETCH_LOGIN_START = "FETCH_LOGIN_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAIL = "FETCH_LOGIN_FAIL";

export const FETCH_REGISTER_START = "FETCH_REGISTER_START";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";

export const FETCH_ISSUES_START = "FETCH_ISSUES_START";
export const FETCH_ISSUES_SUCCESS = "FETCH_ISSUES_SUCCESS";

export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const CREATE_ISSUE_START = "CREATE_ISSUES_START";
export const CREATE_ISSUE_SUCCESS = "CREATE_ISSUES_SUCCESS";

export const loginAction = (info) => {
  return (dispatch) => {
    dispatch({ type: FETCH_LOGIN_START });
    return axios
      .post("https://co-make-buildweek.herokuapp.com/auth/login/", { ...info })
      .then((res) => {
        dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        window.location.pathname = "/issues";
      })
      .catch((err) => {
        dispatch({ type: FETCH_LOGIN_FAIL, payload: "Invalid Credentials" });
      });
  };
};

export const registerAction = (f) => {
  console.log("info being sent in post:", f);
  return (dispatch) => {
    dispatch({ type: FETCH_REGISTER_START });
    return axios
      .post("https://co-make-buildweek.herokuapp.com/auth/register/", { ...f })
      .then((res) => {
        dispatch({ type: FETCH_REGISTER_SUCCESS, payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        window.location.pathname = "/issues";
      })
      .catch((err) => {
        console.log("it failed :(", err);
      });
  };
};

export const getAllIssues = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ISSUES_START });
    return axiosWithAuth()
      .get("/api/issues")
      .then((res) => {
        console.log("issues payload!!!", res.data);
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("failed to retrieve issues:", err);
      });
  };
};

export const addLike = (issue_id) => {
  console.log("action issue id:", issue_id);
  return (dispatch) => {
    dispatch({ type: ADD_LIKE, payload: issue_id });
  };
};

export const removeLike = (issue_id) => {
  console.log("REMOVE issue id:", issue_id);
  return (dispatch) => {
    dispatch({ type: REMOVE_LIKE, payload: issue_id });
  };
};

export const createIssue = (newPost) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ISSUE_START });
    return axiosWithAuth()
      .post("/api/issues", newPost)
      .then((res) => {
        console.log("post Succesful", res.data);
        // dispatch({ type: CREATE_ISSUE_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("failed to post issue:", err);
      });
  };
};
