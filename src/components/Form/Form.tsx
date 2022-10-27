import React, { createContext, useCallback, useContext, useState } from 'react';

type stateForm = {
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

const FormContext = createContext({} as ContextProps)

export const Form: React.FC<FormProps> = ({children, buttonTitle = 'Применить', initialState, apply}) => {
    const [form, setForm] = useState<stateForm>(initialState);
    console.log(form)
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
            <button type='button' onClick={handleApply}>{buttonTitle}</button>
        </form>
     
    );
}


export const FormInput: React.FC<FormInputProps> = ({type, label, id, placeholder, isReadonly, isRequired}) => {
    const {form, handleChangeForm} = useContext(FormContext);
    console.log(form)
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input onChange={handleChangeForm} value={form[id]} type={type}  id={id} placeholder={placeholder} readOnly={isReadonly} required={isRequired}  />
        </div>
    )
}
