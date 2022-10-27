import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';


const selectEmployees = (state: RootState) => state.employees;

export const selectEmployesByIdCompany = createSelector([selectEmployees], (employee) => employee.itemsById);
export const selectSelectedEmployees = createSelector([selectEmployees], (employee) => employee.selectedEmployees)