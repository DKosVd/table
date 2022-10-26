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

export const WrapperWithTable = () => {
    const [companies, setCompanies] = useState<Company[]>(companiesData);
    const [employees, setEmployees] = useState<Employee[]>(employeesData);

    return (
        <WrapperForTable>
            <Table dataItem={companies}>
            </Table>
            <Table dataItem={employees}>
            </Table>
        </WrapperForTable>
    )
}