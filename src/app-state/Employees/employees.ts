import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { employeesData } from "../../mock/employees";
import { ChoosenItems, Employee } from "../../types";
import { COUNTELEM } from "../../utils/permanent";


export type EmployeesState = {
    items: Employee[],
    itemsById: Employee[],
    selectedEmployees: ChoosenItems,
    status: string,
    page: number
}

const initialState:EmployeesState = {
    items: employeesData,
    itemsById: [],
    selectedEmployees: {},
    status: "",
    page: 0
}


const setEmployeesByCompanyId: CaseReducer<EmployeesState, PayloadAction<number>> = (state, action) => {
    const itemsById = state.items.filter(employe => employe.companyId === action.payload);
    const offset = state.page * COUNTELEM;
    state.page++;
    state.itemsById = itemsById.slice(0, offset + COUNTELEM)
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

const resetPage: CaseReducer<EmployeesState, PayloadAction> = (state, action) =>{
    state.page = 0;
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
        editEmployeeAction: editEmployee,
        resetPageAction: resetPage
    },
})

export const { actions, reducer } = EmployeesSlice;

export const { resetPageAction, editEmployeeAction, addEmployeeAction, setStatusEmployeeAction, setSelectedEmployeesAction, deleteEmployeeAction, setEmployeesByCompanyIdAction } = actions;

export default EmployeesSlice;