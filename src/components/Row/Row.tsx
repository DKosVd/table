import { useId, useState } from "react";
import styled from "styled-components";
import { Company, Employee } from "../../types"


type RowProps<T> = {
    value: T;
    handler?: (e: any) => void;
}

const Td = styled.td`
    padding: 10px;
    border: 1px solid black;
`;

const Tr = styled.tr`
`

export const Row = <T extends object>( {value, handler}: RowProps<T> ) => {
    const [active, setActive] = useState<boolean>(false);

    const handleSetActive = () => {
        setActive(!active);
    }
    return (
        <Tr onClick={handler} style={ active ? {background: 'gray'} : {}}>
            <Td>
                <input onChange={handleSetActive} type={'checkbox'}/>
            </Td>
            {Object.values(value).map( (el, idx) => <Td key={el.name + idx.toString()}>{el}</Td>)}
            <Td></Td>
        </Tr>
    )
}