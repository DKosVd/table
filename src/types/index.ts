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
