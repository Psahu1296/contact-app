import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IContact } from "../../utils/Contatnts";

interface IState {
    contacts: IContact[]
}

const initialState: IState = {
    contacts: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<IContact>) => {
            state.contacts = [...state.contacts, action.payload];
        },
        editContact: (state, action) => {
            const updatedContact = action.payload;
            state.contacts = state.contacts.map(contact =>
              contact.id === updatedContact.id ? updatedContact : contact
            );
          },
          deleteContact: (state, action) => {
            state.contacts = state.contacts.filter(contact =>
                contact.id !== action.payload 
              );
          }
    }
})

export const { addContact, editContact, deleteContact }  = contactSlice.actions
export default contactSlice.reducer