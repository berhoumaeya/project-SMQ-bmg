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
            'Accept': '*/*'
        }
    };

    try {
        // Send a GET request to load user profile
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/`, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL,
                payload: false
            });
        }
    } catch (err) {
        console.log('dispatch:', typeof dispatch);
    }
};

// Action to update user profile
export const update_profile = (username, nom, prenom, password) => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        }
    };

    // Create request body with user profile data
    const body = JSON.stringify({
        username,
        nom,
        prenom,
        password
    });

    try {
        // Send a PUT request to update user profile
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.profile && res.data.username) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
        }

    } catch (err) {
        console.error('Error updating user profile:', err);
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        });
    }
};
