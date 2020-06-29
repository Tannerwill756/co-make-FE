import {axiosWithAuth} from '../../utils/axiosWithAuth';

export const FETCH_LOGIN_START = "FETCH_LOGIN_START"
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAIL = "FETCH_LOGIN_FAIL";



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