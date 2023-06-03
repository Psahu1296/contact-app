import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../Reducers/contactSlice'

export const store = configureStore({
    reducer: contactReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch