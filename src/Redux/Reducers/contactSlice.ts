import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { IContact } from "../../utils/Contatnts";

interface IState {
    contact: IContact[]
}

const initialState: IState = {
    contact: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action: AnyAction) => {
            state.contact = [...state.contact, action.payload];
        }
    }
})

export const { addContact }  = contactSlice.actions
export default contactSlice.reducer