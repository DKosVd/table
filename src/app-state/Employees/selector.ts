import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';


const selectEmployees = (state: RootState) => state.employees;

export const selectEmployesByIdCompany = createSelector([selectEmployees], (employee) => employee.itemsById);
export const isAddEmployee = createSelector([selectEmployees], (employe) => employe.status === 'add')
export const selectSelectedEmployees = createSelector([selectEmployees], (employee) => employee.selectedEmployees)
export const selectCurrentEmployee = createSelector([selectEmployees], (employee) => {
    const currentEmploye = Object.entries(employee.selectedEmployees).filter(([_, value]) => value );
    if(currentEmploye.length === 1) {
        return employee.items.filter(item => item.id === +currentEmploye[0][0])
    };
    return false;
})