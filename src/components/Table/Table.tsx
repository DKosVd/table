import styled from "styled-components"
import { Row } from "../Row/Row";



type TableProps<T> =  {
    children: React.ReactNode,
    dataItem: Array<T>,
}

const TableStyle = styled.table`
    padding: 10px;
    border-collapse: collapse;
`;

export const Table =<T extends object & {id: number}>({dataItem}: TableProps<T>) => {
    return (
    <TableStyle>
        <tbody>
            {dataItem.map( (data: T, id) => <Row key={data.id + id} value={data}/>)}
        </tbody>
    </TableStyle>
    )
}