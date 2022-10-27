import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {reducer as companies } from "./Company/company";
import {reducer as employees} from  "./Employees/employees";

export const RootReducer = combineReducers({
    companies,
    employees
});


export const store = configureStore({
    reducer: RootReducer,
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>