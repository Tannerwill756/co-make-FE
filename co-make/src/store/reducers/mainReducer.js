import {FETCH_REGISTER_SUCCESS, FETCH_LOGIN_FAIL, FETCH_ISSUES_SUCCESS, FETCH_LOGIN_SUCCESS, ADD_LIKE, REMOVE_LIKE, FETCH_REGISTER_START} from '../actions/actions'

const initialState = {
    username: "",
    issues:[],
    likes:[],
    isFetching: false,
    error:"",
    signedIn: false,
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_REGISTER_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_REGISTER_SUCCESS:
            return {
                ...state,
                username: action.payload.data.username,
                isFetching: false
            }
        case FETCH_LOGIN_SUCCESS:
            return{
                ...state,
                signedIn: true,
            }
        case FETCH_LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case FETCH_ISSUES_SUCCESS:
            return {
                ...state,
                issues: action.payload,
                signedIn: true,
            }
        case ADD_LIKE:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    action.payload
                ]               
            }
        case REMOVE_LIKE:
            state.likes.filter(num => {
                if (num === action.payload){
                    const index = state.likes.indexOf(num)

                    state.likes.splice(index,1)
                }else{
                    return state
                }
            })
            
        default:
            return state
    }
}
