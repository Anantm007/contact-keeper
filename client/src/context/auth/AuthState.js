import React, {useReducer} from 'react';
import Authcontext from './AuthContext';
import authReducer from './AuthReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
}from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User

    // Reghister User

    // Login User

    // Logout

    // Clear Errors
    
    return (
        <Authcontext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
            }}
        >
            {props.children}
        </Authcontext.Provider>
    )
};

export default AuthState;