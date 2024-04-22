// Import necessary libraries and action types
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types';

// Action to load user profile
export const load_user = () => async dispatch => {
    // Set up HTTP headers
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
        // Send a GET request to load user profile
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, config);

        // Check response and dispatch appropriate action
        if (res.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL,
            });
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL,
        });
    }
};

// Action to update user profile
export const update_profile = (first_name, last_name, phone, city) => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Create request body with user profile data and 'withCredentials' flag
    const body = JSON.stringify({
        'withCredentials': true,
        first_name,
        last_name,
        phone,
        city
    });

    try {
        // Send a PUT request to update user profile
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.profile && res.data.username) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        });
    }
}