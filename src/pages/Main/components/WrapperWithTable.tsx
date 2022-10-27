import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Form, FormInput } from '../../../components/Form/Form';
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
    console.log('render table e')
    const [employees, setEmployees] = useState<Employee[]>(employeesData);
    const idActiveCompany = 15;
    
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
    console.log('render table c')
    const [companies, setCompanies] = useState<Company[]>(companiesData);
    const [selectedCompanies, setSelectedCompanies] = useState<{[k: number] : boolean}>(prepareSelectedCompanies(companies));

    
    const handlerDelete = (event: Event) => {
        setCompanies(companies.filter(company => !selectedCompanies[company.id]))
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

    if(companies.length === 0) {
        return <div>Таблица пустая</div>
    }

    return   (
            <>
                <Table selectedItems={selectedCompanies} handlerPick={handlerPick} handlerPickAll={handlerPickAll} handlerAdd={handlerAdd} handlerDelete={handlerDelete}  dataItem={companies}/>
            </>
        );
}

const FormCompanies = () => {
    console.log('render form c')
    const apply = (data: any) => {
        console.log(data)
    }

    return (
        <Form apply={apply} initialState={{
            id: 0,
            name: '',
            countEmployee: 0,
            address: ''
        }}>
            <FormInput type={'text'} label={'Название'} id={'name'} placeholder={'Введите название'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'number'} label={'Количество сотрудников'} id={'countEmployee'} placeholder={''} isRequired={false} isReadonly={true}/>
            <FormInput  type={'text'} label={'Адрес'} id={'address'} placeholder={'Введите адрес'} isRequired={true} isReadonly={false}/>
        </Form>
    )
}


const FormEmployees = () => {
    console.log('render form e')
    const apply = (data: any) => {
        console.log(data)
    }

    return (
        <Form apply={apply} initialState={{
            id: 0,
            name: '',
            surname: '',
            position: '',
            companyId: 0
        }}>
            <FormInput type={'text'} label={'Имя'} id={'name'} placeholder={'Введите имя'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'text'} label={'Фамилия'} id={'surname'} placeholder={'Введите фамилию'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'text'} label={'Должность'} id={'position'} placeholder={'Введите должность'} isRequired={true} isReadonly={false}/>
            <FormInput  type={'number'} label={'Компания'} id={'companyId'} placeholder={'Введите id компании'} isRequired={true} isReadonly={false}/>
        </Form>
    )
}


export const WrapperWithTable = () => {
    return (
        <WrapperForTable>
            <FormCompanies/>
            <TableCompanies/>
            <FormEmployees/>
            <TableEmployees/>
        </WrapperForTable>
    )
}