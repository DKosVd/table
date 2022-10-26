import styled from "styled-components"
import { Row } from "../Row/Row";



type TableProps<T> =  {
    dataItem: Array<T>,
    handler?: (e: any) => void;
}

const TableStyle = styled.table`
    padding: 10px;
    border-collapse: collapse;
    border: 1px solid black;
    align-self: flex-start;
`;

export const Table =<T extends object & {id: number}>({dataItem, handler}: TableProps<T>) => {
    return (
    <TableStyle>
        <tbody>
            {dataItem.map( (data: T, id) => <Row handler={handler} key={data.id + id} value={data}/>)}
        </tbody>
    </TableStyle>
    )
}