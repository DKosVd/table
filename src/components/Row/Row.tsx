import React from "react";
import styled from "styled-components";


type RowProps<T> = {
    value: T;
    handlerPick: (id: number) => void;
    clearActive?: boolean;
}

const Td = styled.td`
    padding: 10px;
    border: 1px solid gray;
    border-right: 0px;
    border-left: 0px;
`;

const Tr = styled.tr`
`

const Row = <T extends object & {id: number, name: string}>( {value, handlerPick, clearActive = false}: RowProps<T> ) => {
    const handleSetActive = (e: React.SyntheticEvent) => {
        handlerPick(value.id)
    }
    return (
        <Tr style={ clearActive ? {background: 'gray'} : {}}>
            <Td>
                <input onChange={handleSetActive} type={'checkbox'} checked={clearActive}/>
            </Td>
            {Object.values(value).map( (el, idx) => <Td key={value.name + idx.toString()}>{el}</Td>)}
        </Tr>
    )
}

export default React.memo(Row)