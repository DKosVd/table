import { useSelector } from 'react-redux';
import { addCompanyAction,editCompanyAction } from '../../../app-state/Company/company';
import {  isAddSelect , selectCurrentCompany } from '../../../app-state/Company/selector';
import { useAppDispatch } from '../../../app-state/hooks';
import { Form, FormInput } from '../../../components/Form/Form';
import { Company, stateForm } from '../../../types';


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


export default FormCompanies;