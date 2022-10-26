import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import  Row  from '../../../components/Row/Row';
import { Table } from '../../../components/Table/Table';
import { companiesData } from '../../../mock/companies';
import { employeesData } from '../../../mock/employees';
import { Company, Employee } from '../../../types';
import prepareSelectedCompanies from '../../../utils/prepareSelectedCompanies';


const WrapperForTable = styled.div`
    display: flex;
    gap: 50px;
`;

const TableEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>(employeesData);
    const idActiveCompany = null;
    
    const handlerDelete = (event: MouseEvent) => {
        console.log('TableEmployees delete')
    }

    const handlerAdd = (event: MouseEvent) => {
        console.log('TableEmployees add')
    }

    const handlerPick = (idx: number) => {
        console.log(idx)
    }


    if(idActiveCompany) {
        // return <Table handlerPick={handlerPick} handlerPickAll={() => {}} handlerAdd={handlerAdd} handlerDelete={handlerDelete} dataItem={employees.filter(employee => employee.companyId === idActiveCompany)}/>
    }
    return <p>Выберите компанию</p>;
}

const TableCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>(companiesData);
    const [selectedCompanies, setSelectedCompanies] = useState<{[k: number] : boolean}>(prepareSelectedCompanies(companies));

    
    const handlerDelete = (event: Event) => {
        console.log('TableCompanies delete')
    }

    const handlerAdd = (event: Event) => {
        console.log('TableCompanies add')
    }

    const handlerPick = useCallback((idx: number) => {
        setSelectedCompanies((prevState) => ({
            ...prevState,
            [idx]: !prevState[idx]
        }) );
    }, [])

    const handlerPickAll = () => {
        const tmpObj: {[k: number] : boolean} = {};
        for(let selected in selectedCompanies) {
            tmpObj[selected] = !selectedCompanies[selected]
        }
        setSelectedCompanies(tmpObj)
    }

    console.log(selectedCompanies)

    return   <Table selectedItems={selectedCompanies} handlerPick={handlerPick} handlerPickAll={handlerPickAll} handlerAdd={handlerAdd} handlerDelete={handlerDelete}  dataItem={companies}/>;
}


export const WrapperWithTable = () => {
    return (
        <WrapperForTable>
            <TableCompanies/>
            <TableEmployees/>
        </WrapperForTable>
    )
}