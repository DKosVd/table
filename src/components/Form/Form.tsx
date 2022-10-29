import React, { createContext, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';

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

type FormProps = {
    children: JSX.Element | JSX.Element[];
    buttonTitle?: string;
    initialState: stateForm;
    apply: (data: stateForm) => void;
}

type ContextProps = {
    form: stateForm;
    handleChangeForm: (e: React.FormEvent<HTMLInputElement>) => void;
}

type FormInputProps = {
    type: string;
    label: string;
    id: string;
    placeholder: string;
    isRequired: boolean;
    isReadonly: boolean;
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const InputStyle = styled.input`
    height: 25px;
    border-radius: 5px;
    border: 1px solid black;
`

const LabelStyle = styled.label`
    margin: 5px 0px 0px 0px;
`

const ButtonMargin = styled.div`
    margin: 10px 0px;
`



const FormContext = createContext({} as ContextProps)

export const Form: React.FC<FormProps> = ({children, buttonTitle = 'Применить', initialState, apply}) => {
    const [form, setForm] = useState<stateForm>(initialState);
    // console.log(form)
    const handleChangeForm = useCallback( (e: React.FormEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget;
        setForm((prev) => ({
            ...prev,
            [id]: value
        }))
    }, []);

    const handleApply = () => {
        apply(form)
    }
    

    return (
        <form>
            <FormContext.Provider value={{
                form,
                handleChangeForm
            }}>
                {children}
            </FormContext.Provider>
            <ButtonMargin>
                <Button  handler={handleApply} text={buttonTitle}/>
            </ButtonMargin>
        </form>
     
    );
}



export const FormInput: React.FC<FormInputProps> = ({type, label, id, placeholder, isReadonly, isRequired}) => {
    const {form, handleChangeForm} = useContext(FormContext);
    // console.log(form)
    return (
        <InputContainer>
            <LabelStyle htmlFor={id}>{label}</LabelStyle>
            <InputStyle onChange={handleChangeForm} value={form[id]} type={type}  id={id} placeholder={placeholder} readOnly={isReadonly} required={isRequired}  />
        </InputContainer>
    )
}
