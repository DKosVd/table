import { useSelector } from 'react-redux';
import { addNewEmployeeAction } from '../../../app-state/Company/company';
import { selectCurrentCompany } from '../../../app-state/Company/selector';
import { addEmployeeAction, editEmployeeAction } from '../../../app-state/Employees/employees';
import { isAddEmployee, selectCurrentEmployee } from '../../../app-state/Employees/selector';
import { useAppDispatch } from '../../../app-state/hooks';
import { Form, FormInput } from '../../../components/Form/Form';
import { Employee } from '../../../types';


const FormEmployees = () => {
    const isEdit = useSelector(selectCurrentEmployee);
    const isAdd = useSelector(isAddEmployee)

    if(isEdit) return <FormEmployeesEdit state={isEdit[0]}/>
    if(isAdd) return <FormEmployeesAdd/>
    return null
}

const FormEmployeesAdd = () => {
    const dispatch = useAppDispatch();
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
    const dispatch = useAppDispatch();
    const apply = (data: any) => {
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

export default FormEmployees;