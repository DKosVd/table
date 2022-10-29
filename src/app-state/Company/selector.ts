import { createSelector } from "@reduxjs/toolkit";
import { companiesData } from "../../mock/companies";
import { RootState } from '../store';


const selectCompanies = (state: RootState) => state.companies;



export const hasMoreCompaniesSelector = createSelector([selectCompanies], (company) => company.items.length < companiesData.length)
export const isAddSelect = createSelector([selectCompanies], (company) => company.status === 'add');
export const selectCompaniesItems = createSelector([selectCompanies], (company) => company.items);
export const selectSelectedCompanies = createSelector([selectCompanies], (company) => company.selectedCompanies);
export const selectCurrentCompany = createSelector([selectCompanies], (company) => {
    const currentCompany = Object.entries(company.selectedCompanies).filter(([_, value]) => value );
    if(currentCompany.length === 1) {
        return company.items.filter(item => item.id === +currentCompany[0][0])
    };
    return false;
})