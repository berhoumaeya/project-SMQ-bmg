import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE__USER_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
};

function authReducer(state = initialState,action){
    const {type,payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated : payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated:true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
            }
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                isAuthenticated : false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case DELETE__USER_FAIL:
            return state
        default:
            return state
    };
};

export default authReducer;