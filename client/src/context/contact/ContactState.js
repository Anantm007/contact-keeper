import React, {useReducer} from 'react';
import Contactcontext from './contactContext';
import contactReducer from './contactReducer';

import axios from 'axios';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    CLEAR_FILTER
}from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async() => {
        
        try {
            const res = await axios.get('/api/contacts');
            
            dispatch({type: GET_CONTACTS, payload: res.data})
        
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg})
        }

    }


    // Add Contact
    const addContact = async(contact) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            
            dispatch({type: ADD_CONTACT, payload: res.data})
        
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg})
        }

    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS})
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
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }
    return (
        <Contactcontext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                updateContact,
                setCurrent, 
                clearCurrent,
                filterContacts,
                clearContacts,
                clearFilter
            }}
        >
            {props.children}
        </Contactcontext.Provider>
    )
};

export default ContactState;