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
    selectedEmployees: ChoosenItems,
    status: string
}

const initialState:EmployeesState = {
    items: employeesData,
    itemsById: [],
    selectedEmployees: {},
    status: ""
}


const setEmployeesByCompanyId: CaseReducer<EmployeesState, PayloadAction<number>> = (state, action) => {
    state.itemsById = state.items.filter(employe => employe.companyId === action.payload)
}


const deleteEmployees:CaseReducer<EmployeesState, PayloadAction<ChoosenItems>> = (state, action) => {
    state.items = state.items.filter(employe => {
        if(action.payload[employe.id]) {
            delete state.selectedEmployees[employe.id]
            return false;
        }
        return true
    })
}

const setSelectedEmployees: CaseReducer<EmployeesState, PayloadAction<ChoosenItems | number>> = (state, action) => {
    if(typeof action.payload === 'number') {
        state.selectedEmployees[action.payload] ? state.selectedEmployees[action.payload] = !state.selectedEmployees[action.payload]: state.selectedEmployees[action.payload] = true;
    } else {
        state.selectedEmployees = action.payload;
    }
}

const setStatus: CaseReducer<EmployeesState, PayloadAction<string>> = (state, action) => {
    state.status = action.payload;
}

const addEmployee: CaseReducer<EmployeesState, PayloadAction<Employee>> = (state, action) => {
    const id = +new Date();
    state.items.push({
        ...action.payload,
        id
    })
    state.itemsById.push({
        ...action.payload,
        id
    })
}

const editEmployee:CaseReducer<EmployeesState, PayloadAction<Employee>> = (state, action) => {
    state.items = state.items.map(item => {
        console.log(action.payload)
        if(item.id === action.payload.id) {
            return {
                ...action.payload
            }
        }
        return item
    })

    state.itemsById = state.itemsById.map(item => {
        console.log(action.payload)
        if(item.id === action.payload.id) {
            return {
                ...action.payload
            }
        }
        return item
    })
}


const EmployeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setSelectedEmployeesAction: setSelectedEmployees,
        deleteEmployeeAction: deleteEmployees,
        setEmployeesByCompanyIdAction: setEmployeesByCompanyId,
        setStatusEmployeeAction: setStatus,
        addEmployeeAction: addEmployee,
        editEmployeeAction: editEmployee
    },
})

export const { actions, reducer } = EmployeesSlice;

export const { editEmployeeAction, addEmployeeAction, setStatusEmployeeAction, setSelectedEmployeesAction, deleteEmployeeAction, setEmployeesByCompanyIdAction } = actions;

export default EmployeesSlice;