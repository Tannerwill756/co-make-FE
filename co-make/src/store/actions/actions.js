import { axiosWithAuth } from "../../utils/axiosWithAuth";
import axios from "axios";

export const FETCH_LOGIN_START = "FETCH_LOGIN_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAIL = "FETCH_LOGIN_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const FETCH_REGISTER_START = "FETCH_REGISTER_START";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";

export const FETCH_ISSUES_START = "FETCH_ISSUES_START";
export const FETCH_ISSUES_SUCCESS = "FETCH_ISSUES_SUCCESS";

export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const CREATE_ISSUE_START = "CREATE_ISSUES_START";
export const CREATE_ISSUE_SUCCESS = "CREATE_ISSUES_SUCCESS";

export const FETCH_PROFILE_START = "FETCH_PROFILE_START";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";

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

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
  };
};

export const registerAction = (f) => {
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
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("failed to retrieve issues:", err);
      });
  };
};

export const addLike = (issue_id) => {
  return (dispatch) => {
    dispatch({ type: ADD_LIKE, payload: issue_id });
    return axiosWithAuth()
      .get("/api/issues")
      .then((res) => {
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("failed to retrieve issues:", err);
      });
  };
};

export const removeLike = (issue_id) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_LIKE, payload: issue_id });
    return axiosWithAuth()
      .get("/api/issues")
      .then((res) => {
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("failed to retrieve issues:", err);
      });
  };
};

export const createIssue = (newPost) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ISSUE_START });
    return axiosWithAuth()
      .post("/api/issues", newPost)
      .then((res) => {
        return axiosWithAuth()
          .get("/api/issues")
          .then((res) => {
            dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
          })
          .catch((err) => {
            console.log("failed to retrieve issues:", err);
          });
      })
      .catch((err) => {
        console.log("failed to post issue:", err);
      });
  };
};

export const deleteIssue = (postId) => {
  return (dispatch) => {
    // dispatch({ type: DELETE_POST_START })
    return axiosWithAuth()
      .delete(`/api/issues/${postId}`)
      .then((res) => {
        return axiosWithAuth()
          .get("/api/issues")
          .then((res) => {
            dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
          })
          .catch((err) => {
            console.log("failed to retrieve issues:", err);
          });
      })
      .catch((err) => {});
  };
};

export const editPost = (postId, updatedPost) => {
  return (dispatch) => {
    // dispatch({ type: DELETE_POST_START })
    return axiosWithAuth()
      .put(`/api/issues/${postId}`, updatedPost)
      .then((res) => {
        return axiosWithAuth()
          .get("/api/issues")
          .then((res) => {
            dispatch({ type: FETCH_ISSUES_SUCCESS, payload: res.data });
          })
          .catch((err) => {
            console.log("failed to retrieve issues:", err);
          });
      })
      .catch((err) => {});
  };
};

export const getProfile = (id) => {
  console.log("profile id from action file", id);
  return (dispatch) => {
    dispatch({ type: FETCH_PROFILE_START });
    return axiosWithAuth()
      .get(`/api/users/${id}`)
      .then((res) => {
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: res.data });
        console.log("profile info!!! from action file", res.data);
      })
      .catch((err) => {
        console.log("profile error", err);
      });
  };
};
