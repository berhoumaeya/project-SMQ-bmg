// src/reducers/userReducer.js
import { LOAD_USER_PROFILE_SUCCESS, LOAD_USER_PROFILE_FAIL } from '../actions/types';

const initialState = {
    user: null,
    error: null
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                user: payload,
                error: null
            };
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                user: null,
                error: payload
            };
        default:
            return state;
    }
};

export default profileReducer;
