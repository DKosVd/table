export type Company =  {
    id: number;
    name: string;
    countEmployee: number;
    address: string;
}

export type Employee = {
    id: number;
    name: string;
    surname: string;
    position: string;
    companyId: number;
}

export type ChoosenItems = {
    [k: number]: boolean;
} 


export type Pagination = {
    page: number;
}


export type CompanyState = {
    items: Company[],
    selectedCompanies: ChoosenItems,
    status: string,
    page: 0
}


export type EmployeesState = {
    items: Employee[],
    itemsById: Employee[],
    selectedEmployees: ChoosenItems,
    status: string,
    page: number
}

export type stateForm = {
    id: number;
    name: string;
    countEmployee?: number;
    address?: string;
    surname?: string;
    position?: string;
    companyId?: number; 
    [k: string]: string | undefined | number;
}