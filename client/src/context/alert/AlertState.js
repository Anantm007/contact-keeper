import React, {useReducer} from 'react';
import uuid from 'uuid';
import Alertcontext from './AlertContext';
import AlertReducer from './AlertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
}from '../types';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        });

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout)
    }
    
    return (
        <Alertcontext.Provider
            value={{
               alerts: state,
               setAlert
            }}
        >
            {props.children}
        </Alertcontext.Provider>
    )
};

export default AlertState;