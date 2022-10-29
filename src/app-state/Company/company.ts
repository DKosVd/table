import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { companiesData } from "../../mock/companies";
import { ChoosenItems, Company } from "../../types";
import { COUNTELEM } from "../../utils/permanent";


export type CompanyState = {
    items: Company[],
    selectedCompanies: ChoosenItems,
    status: string,
    page: 0
}

const setCompanies: CaseReducer<CompanyState, PayloadAction> = (state, action) => {
    const offset = COUNTELEM * state.page;
    state.page++;
    state.items.push(...companiesData.slice(offset, offset + COUNTELEM));
}

const deleteEmployees: CaseReducer<CompanyState, PayloadAction<{items: ChoosenItems, id: number}>> = (state, action) => {
    const countEmployees = Object.entries(action.payload.items).filter( ([_, value]) => value ).length;
    console.log(action.payload)
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

const addNewEmployee:CaseReducer<CompanyState, PayloadAction<number>> = (state, action) => {
    const item = state.items.find( item => item.id === action.payload);
    if(item) {
        item.countEmployee++
    }
    ;
} 

const deleteCompanies: CaseReducer<CompanyState, PayloadAction<ChoosenItems>> = (state, action) => {
    state.items = state.items.filter( item => {
        if(action.payload[item.id]) {
            delete state.selectedCompanies[item.id]
            return false;
        }
        return true
    })
}

const setSelectedCompanies: CaseReducer<CompanyState, PayloadAction<ChoosenItems | number>> = (state, action) => {
    if(typeof action.payload === 'number') {
        state.selectedCompanies[action.payload] ? state.selectedCompanies[action.payload] = !state.selectedCompanies[action.payload]: state.selectedCompanies[action.payload] = true;
    } else {
        state.selectedCompanies = action.payload;
    }
}

const setStatus: CaseReducer<CompanyState, PayloadAction<string>> = (state, action) => {
    state.status = action.payload;
}

const addCompany: CaseReducer<CompanyState, PayloadAction<Company>> = (state, action) => {
    const company = action.payload;
    company.id = +new Date();
    state.items.push(company)
}

const editCompany: CaseReducer<CompanyState, PayloadAction<Company>> = (state, action) => {
    state.items = state.items.map(item => {
        if(item.id === action.payload.id) {
            return {
                ...action.payload
            }
        }
        return item
    })
}


const initialState: CompanyState = {
    items: [],
    selectedCompanies: {},
    status: "",
    page: 0
}

const companySlice = createSlice({
    name: 'company',
    initialState, 
    reducers: {
        setCompaniesAction: setCompanies,
        deleteCompaniesAction: deleteCompanies,
        setSelectedCompaniesAction: setSelectedCompanies,
        deleteEmployeesAction: deleteEmployees,
        setStatusAction: setStatus,
        addCompanyAction: addCompany,
        editCompanyAction: editCompany,
        addNewEmployeeAction: addNewEmployee
    }
});

export const { actions, reducer } = companySlice;

export const { addNewEmployeeAction, setStatusAction, setCompaniesAction, deleteCompaniesAction, setSelectedCompaniesAction, deleteEmployeesAction, addCompanyAction, editCompanyAction } = actions;

export default companySlice;

