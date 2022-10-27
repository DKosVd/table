import { createSlice, CaseReducer, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { employeesData } from "../../mock/employees";
import { ChoosenItems, Employee } from "../../types";

// Todo: After delete company, delete all employees
// Add adding ))00)0
// Build counter employees
// Scrolling 
export type EmployeesState = {
    items: Employee[],
    itemsById: Employee[],
    selectedEmployees: ChoosenItems
}

const initialState:EmployeesState = {
    items: employeesData,
    itemsById: [],
    selectedEmployees: {}
}


const setEmployeesByCompanyId: CaseReducer<EmployeesState, PayloadAction<number>> = (state, action) => {
    state.itemsById = state.items.filter(employe => employe.companyId === action.payload)
}


const deleteEmployees:CaseReducer<EmployeesState, PayloadAction<ChoosenItems>> = (state, action) => {
    state.items = state.items.filter(employe => !action.payload[employe.id])
}

const setSelectedEmployees: CaseReducer<EmployeesState, PayloadAction<ChoosenItems | number>> = (state, action) => {
    if(typeof action.payload === 'number') {
        state.selectedEmployees[action.payload] ? state.selectedEmployees[action.payload] = !state.selectedEmployees[action.payload]: state.selectedEmployees[action.payload] = true;
    } else {
        state.selectedEmployees = action.payload;
    }
}


const EmployeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setSelectedEmployeesAction: setSelectedEmployees,
        deleteEmployeeAction: deleteEmployees,
        setEmployeesByCompanyIdAction: setEmployeesByCompanyId
    },
})

export const { actions, reducer } = EmployeesSlice;

export const { setSelectedEmployeesAction, deleteEmployeeAction, setEmployeesByCompanyIdAction } = actions;

export default EmployeesSlice;