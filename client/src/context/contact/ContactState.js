import React, {useReducer} from 'react';
import uuid from 'uuid';
import Contactcontext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
}from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Anant Mathur',
                email: 'anant@gmail.com',
                phone: '111222333',
                type: 'personal' 
            },
            {
                id: 2,
                name: 'Ajay Mathur',
                email: 'ajay@gmail.com',
                phone: '111444777',
                type: 'personal' 
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    // Delete Contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    // Update Contacts
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }

    // Filter Contacts

    // Clear Filter

    return (
        <Contactcontext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                updateContact,
                setCurrent, 
                clearCurrent
            }}
        >
            {props.children}
        </Contactcontext.Provider>
    )
};

export default ContactState;