import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteCompaniesAction, deleteEmployeesAction, setCompaniesAction, setSelectedCompaniesAction } from '../../../app-state/Company/company';
import { selectCompaniesItems, selectCurrentCompany, selectSelectedCompanies } from '../../../app-state/Company/selector';
import { deleteEmployeeAction, setEmployeesByCompanyIdAction, setSelectedEmployeesAction } from '../../../app-state/Employees/employees';
import { selectEmployesByIdCompany, selectSelectedEmployees } from '../../../app-state/Employees/selector';
import { useAppDispatch } from '../../../app-state/hooks';
import { Form, FormInput } from '../../../components/Form/Form';
import { Table } from '../../../components/Table/Table';
import { companiesData } from '../../../mock/companies';
import selectedAllElements from '../../../utils/prepareSelectedCompanies';


const WrapperForTable = styled.div`
    display: flex;
    gap: 50px;
`;


const TableEmployees = () => {
    const dispatch = useAppDispatch();
    const idCompany = useSelector(selectCurrentCompany);
    const employees = useSelector(selectEmployesByIdCompany);
    const selectedEmployees = useSelector(selectSelectedEmployees)

    useEffect( () => {
        if(idCompany) {
            const id = +idCompany[0];
            dispatch(setEmployeesByCompanyIdAction(id))
        }
    }, [dispatch, idCompany])

    const handlerDelete = (event: MouseEvent) => {
        if(idCompany) {
            dispatch(deleteEmployeesAction({
                items: selectedEmployees,
                id: +idCompany[0]
            }))
            dispatch(deleteEmployeeAction(selectedEmployees))
        }
    }

    const handlerAdd = (event: MouseEvent) => {
        
    }

    const handlerPick = useCallback((idx: number) => {
        dispatch(setSelectedEmployeesAction(idx))
    }, [])

    const handlerPickAll = () => {
        dispatch(setSelectedEmployeesAction(selectedAllElements(employees)))
    }


    if(idCompany) {
        return <Table handlerPick={handlerPick} selectedItems={selectedEmployees} handlerPickAll={handlerPickAll} handlerAdd={handlerAdd} handlerDelete={handlerDelete} dataItem={employees}/>
    }
    
    return <p>Выберите компанию</p>;
}

const TableCompanies = () => {

    const dispatch = useAppDispatch();
    const companies = useSelector(selectCompaniesItems);
    const selectedCompanies = useSelector(selectSelectedCompanies);

    useEffect( () => {
        dispatch(setCompaniesAction(companiesData))
    }, [dispatch])


    const handlerDelete = () => {
        dispatch(deleteCompaniesAction(selectedCompanies))
    }


    const handlerAdd = (event: Event) => {
        console.log('TableCompanies add')
    }

    const handlerPick = useCallback((idx: number) => {
        dispatch(setSelectedCompaniesAction(idx))
    }, [])

    const handlerPickAll = () => {
        console.log(selectedCompanies)
        dispatch(setSelectedCompaniesAction(selectedAllElements(companies)))
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