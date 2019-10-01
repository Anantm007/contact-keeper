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
            },

            {
                id: 3,
                name: 'dummy',
                type: 'professional'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contacts

    // Filter Contacts

    // Clear Filter

    return (
        <Contactcontext.Provider
            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </Contactcontext.Provider>
    )
};

export default ContactState;