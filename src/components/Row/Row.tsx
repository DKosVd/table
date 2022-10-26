import { useId, useState } from "react";
import styled from "styled-components";
import { Company, Employee } from "../../types"


type RowProps<T> = {
    value: T;
}

const Td = styled.td`
    cursor: pointer;
`;

const Tr = styled.tr`
`

export const Row = <T extends object>( {value}: RowProps<T> ) => {
    const [active, setActive] = useState<boolean>(false);

    const handleSetActive = () => {
        setActive(!active);
    }
    return (
        <Tr style={ active ? {background: 'gray'} : {}}>
            <td><input onChange={handleSetActive} type={'checkbox'}/></td>
            {Object.values(value).map( (el, idx) => <Td key={el.name + idx.toString()}>{el}</Td>)}
        </Tr>
    )
}