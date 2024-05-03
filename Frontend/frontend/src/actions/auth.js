// Import necessary libraries and actions
import Cookies from 'js-cookie';
import axios from 'axios';
import { load_user } from './profile';
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
    DELETE__USER_FAIL,
    AJOUTER_FORMATION_SUCCESS,
    AJOUTER_FORMATION_FAIL,
} from './types';

// Action to check if the user is authenticated
export const checkAuthenticated = (username, password) => async dispatch => {
    // Set up HTTP headers
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
        // Send a POST request to check authentication status
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/authenticated`, config);

        // Check response and dispatch appropriate action
        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        } else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};

// Action to handle user login
export const login = (username, password) => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Create request body with username and password
    const body = JSON.stringify({username,password});

    try {
        // Send a POST request to login endpoint
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });
            // Load user data after successful login
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Action to handle user logout
export const logout = () => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Create request body with 'withCredentials' flag
    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        // Send a POST request to logout endpoint
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        })
    }
};

// Action to handle user registration
export const register = (username , password, prenom, nom, re_password) => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Create request body with prenom, password, and re_password
    const body = JSON.stringify({username , password, prenom, nom, re_password});

    try {
        // Send a POST request to register endpoint
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: REGISTER_SUCCESS
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Action to handle user account deletion
export const delete_account = () => async dispatch => {
    // Set up HTTP headers with CSRF token and 'withCredentials' flag
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
    };

    try {
        // Send a DELETE request to delete account endpoint
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete`, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE__USER_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: DELETE__USER_FAIL
        });
    }
}


export const ajouter_formation = (intitule_formation , type_formation, organisme_formation, theme_formation, date_debut_formation,date_fin_formation,responsable_formation,responsable_validation,participants,pieces_jointes,parametre_validation) => async dispatch => {
    // Set up HTTP headers with CSRF token
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Create request body with prenom, password, and re_password
    const body = JSON.stringify({intitule_formation , type_formation, organisme_formation, theme_formation, date_debut_formation,date_fin_formation,responsable_formation,responsable_validation,participants,pieces_jointes,parametre_validation});

    try {
        // Send a POST request to register endpoint
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/RH/create_formation`, body, config);

        // Check response and dispatch appropriate action
        if (res.data.success) {
            dispatch({
                type: AJOUTER_FORMATION_SUCCESS
            });
        } else {
            dispatch({
                type: AJOUTER_FORMATION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: AJOUTER_FORMATION_FAIL
        });
    }
};