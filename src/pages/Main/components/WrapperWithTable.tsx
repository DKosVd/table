import { useState } from 'react';
import styled from 'styled-components';
import { Row } from '../../../components/Row/Row';
import { Table } from '../../../components/Table/Table';
import { companiesData } from '../../../mock/companies';
import { employeesData } from '../../../mock/employees';
import { Company, Employee } from '../../../types';


const WrapperForTable = styled.div`
    display: flex;
    gap: 50px;
`;

const TableEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>(employeesData);
    const idActiveCompany = null;
    if(idActiveCompany) {
        return <Table dataItem={employees.filter(employee => employee.companyId === idActiveCompany)}/>
    }
    return <p>Выберите компанию</p>;
}

const TableCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>(companiesData);

    const handlerDelete = (event: Event) => {
        console.log(event)
    }

    return   <Table handler={handlerDelete} dataItem={companies}/>;
}

export const WrapperWithTable = () => {
    return (
        <WrapperForTable>
            <TableCompanies/>
            <TableEmployees/>
        </WrapperForTable>
    )
}