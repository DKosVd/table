import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { addCompanyAction, addNewEmployeeAction, deleteCompaniesAction, deleteEmployeesAction, editCompanyAction, setCompaniesAction, setSelectedCompaniesAction, setStatusAction } from '../../../app-state/Company/company';
import { isAddSelect, selectCompaniesItems, selectCurrentCompany, selectSelectedCompanies } from '../../../app-state/Company/selector';
import { addEmployeeAction, deleteEmployeeAction, editEmployeeAction, setEmployeesByCompanyIdAction, setSelectedEmployeesAction, setStatusEmployeeAction } from '../../../app-state/Employees/employees';
import { isAddEmployee, selectCurrentEmployee, selectEmployesByIdCompany, selectSelectedEmployees } from '../../../app-state/Employees/selector';
import { useAppDispatch } from '../../../app-state/hooks';
import { Form, FormInput, stateForm } from '../../../components/Form/Form';
import { Table } from '../../../components/Table/Table';
import { companiesData } from '../../../mock/companies';
import { Company, Employee } from '../../../types';
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
        if(idCompany && idCompany[0]) {
            const id = idCompany[0].id;
            dispatch(setEmployeesByCompanyIdAction(id))
        }
    }, [dispatch, idCompany])

    const handlerDelete = (event: MouseEvent) => {
        if(idCompany && idCompany[0]) {
            dispatch(deleteEmployeesAction({
                items: selectedEmployees,
                id: +idCompany[0].id
            }))
            dispatch(deleteEmployeeAction(selectedEmployees))
        }
    }

    const handlerAdd = () => {
        dispatch(setStatusEmployeeAction('add'))
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
    const isEdit = useSelector(selectCurrentCompany);

    useEffect( () => {
        dispatch(setCompaniesAction(companiesData))
    }, [dispatch])


    const handlerDelete = () => {
        dispatch(deleteCompaniesAction(selectedCompanies))
    }


    const handlerAdd = (event: Event) => {
        if(!isEdit) {
            dispatch(setStatusAction('add'));
        }
    }

    const handlerPick = useCallback((idx: number) => {
        dispatch(setSelectedCompaniesAction(idx))
    }, [])

    const handlerPickAll = () => {
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
    const isEdit = useSelector(selectCurrentCompany)
    const isAdd = useSelector(isAddSelect)

    if(isEdit) return <FormCompaniesEdit state={isEdit[0]}/>
    if(isAdd) return <FormCompaniesAdd/>
    return null
}

const FormCompaniesEdit = ({state}:any ) => {
    const dispatch = useAppDispatch();

    const apply = (data: stateForm) => {
        if(!data.name || !data.address) return
        dispatch(editCompanyAction(data as Company));
    }

    if(state.id) {
        return (<Form apply={apply} initialState={state}>
            <FormInput type={'text'} label={'Название'} id={'name'} placeholder={'Введите название'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'number'} label={'Количество сотрудников'} id={'countEmployee'} placeholder={''} isRequired={false} isReadonly={true}/>
            <FormInput  type={'text'} label={'Адрес'} id={'address'} placeholder={'Введите адрес'} isRequired={true} isReadonly={false}/>
        </Form>)
    }
    return null
  
}

const FormCompaniesAdd = () => {
    const dispatch = useAppDispatch();

    const apply = (data: stateForm) => {
        if(!data.name || !data.address) return
        dispatch(addCompanyAction(data as Company));
    }
    return (<Form apply={apply} initialState={{
        id: 0,
        name: '',
        countEmployee: 0,
        address: ''
    }}>
        <FormInput type={'text'} label={'Название'} id={'name'} placeholder={'Введите название'} isRequired={false} isReadonly={false}/>
        <FormInput  type={'number'} label={'Количество сотрудников'} id={'countEmployee'} placeholder={''} isRequired={false} isReadonly={true}/>
        <FormInput  type={'text'} label={'Адрес'} id={'address'} placeholder={'Введите адрес'} isRequired={true} isReadonly={false}/>
    </Form>)
}


const FormEmployees = () => {
    const isEdit = useSelector(selectCurrentEmployee);
    const isAdd = useSelector(isAddEmployee)

    if(isEdit) return <FormEmployeesEdit state={isEdit[0]}/>
    if(isAdd) return <FormEmployeesAdd/>
    return null
}

const FormEmployeesAdd = () => {
    const dispatch = useDispatch();
    const idCompany = useSelector(selectCurrentCompany);
    const apply = (data: any) => {
        if(idCompany && idCompany[0]) {
            dispatch(addEmployeeAction({...data, companyId: idCompany[0].id}))
            dispatch(addNewEmployeeAction(idCompany[0].id))
        }
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
        </Form>
    )
}


const FormEmployeesEdit = ({state}: any) => {
    const dispatch = useDispatch();
    const apply = (data: any) => {
        console.log(data)
        dispatch(editEmployeeAction(data as Employee))
    }
    return (
        <Form apply={apply} initialState={state}>
            <FormInput type={'text'} label={'Имя'} id={'name'} placeholder={'Введите имя'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'text'} label={'Фамилия'} id={'surname'} placeholder={'Введите фамилию'} isRequired={false} isReadonly={false}/>
            <FormInput  type={'text'} label={'Должность'} id={'position'} placeholder={'Введите должность'} isRequired={true} isReadonly={false}/>
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