import {axiosWithAuth} from '../../utils/axiosWithAuth';
import axios from 'axios';

export const FETCH_LOGIN_START = "FETCH_LOGIN_START"
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAIL = "FETCH_LOGIN_FAIL";

export const FETCH_REGISTER_START = "FETCH_REGISTER_START";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS"



export const loginAction = info => {
    return(dispatch)=>{
        dispatch({type: FETCH_LOGIN_START});
        axiosWithAuth()
            .post("https://co-make-buildweek.herokuapp.com/auth/login/", info)
            .then(res => {
                dispatch({type: FETCH_LOGIN_SUCCESS, payload:res.data })
            })
            .catch(err => {
                console.log(err)
                dispatch({type: FETCH_LOGIN_FAIL})
            })
    }
}

export const registerAction = info => {
    console.log("info being sent in post:", info)
    return (dispatch) => {
        dispatch({type: FETCH_REGISTER_START});
        return axios
            .post("https://co-make-buildweek.herokuapp.com/auth/register/", {...info})
            .then(res => {
                console.log("it worked!!", res)
                dispatch({type: FETCH_REGISTER_SUCCESS, payload:res.data })
            })
            .catch(err => {
                console.log("it failed :(", err)
            })
    }
}