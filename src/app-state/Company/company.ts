import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ChoosenItems, Company } from "../../types";


export type CompanyState = {
    items: Company[],
    selectedCompanies: ChoosenItems
}

const setCompanies: CaseReducer<CompanyState, PayloadAction<Company[]>> = (state, action) => {
    state.items = action.payload;
}

const deleteEmployees: CaseReducer<CompanyState, PayloadAction<{items: ChoosenItems, id: number}>> = (state, action) => {
    const countEmployees = Object.entries(action.payload.items).filter( ([_, value]) => value ).length;
    state.items = state.items.map(company => {
        if(company.id === action.payload.id) {
            const newCountEmployes = company.countEmployee - countEmployees;
            if(newCountEmployes >= 0) {
                return {
                    ...company, 
                    countEmployee: newCountEmployes
                }
            }
        }
        return company
    })
}

const deleteCompanies: CaseReducer<CompanyState, PayloadAction<ChoosenItems>> = (state, action) => {
    state.items = state.items.filter( item => !action.payload[item.id])
}

const setSelectedCompanies: CaseReducer<CompanyState, PayloadAction<ChoosenItems | number>> = (state, action) => {
    if(typeof action.payload === 'number') {
        state.selectedCompanies[action.payload] ? state.selectedCompanies[action.payload] = !state.selectedCompanies[action.payload]: state.selectedCompanies[action.payload] = true;
    } else {
        state.selectedCompanies = action.payload;
    }
}


const initialState: CompanyState = {
    items: [],
    selectedCompanies: {}
}

const companySlice = createSlice({
    name: 'company',
    initialState, 
    reducers: {
        setCompaniesAction: setCompanies,
        deleteCompaniesAction: deleteCompanies,
        setSelectedCompaniesAction: setSelectedCompanies,
        deleteEmployeesAction: deleteEmployees
    }
});

export const { actions, reducer } = companySlice;

export const { setCompaniesAction, deleteCompaniesAction, setSelectedCompaniesAction, deleteEmployeesAction } = actions;

export default companySlice;

