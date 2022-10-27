import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';


const selectCompanies = (state: RootState) => state.companies;

export const selectCompaniesItems = createSelector([selectCompanies], (company) => company.items);
export const selectSelectedCompanies = createSelector([selectCompanies], (company) => company.selectedCompanies);
export const selectCurrentCompany = createSelector([selectCompanies], (company) => {
    const currentCompany = Object.entries(company.selectedCompanies).filter(([_, value]) => value );
    if(currentCompany.length === 1) return currentCompany.pop();
    return [];
})