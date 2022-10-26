import styled from "styled-components"
import { Button } from "../Button/Button";
import  Row  from "../Row/Row";



type TableProps<T> =  {
    dataItem: Array<T>;
    selectedItems: {[k: number] : boolean};
    handlerPick: (e: number) => void;
    handlerDelete: (e: MouseEvent) => void;
    handlerPickAll: (e: MouseEvent) => void;
    handlerAdd: (e: MouseEvent) => void;
}


const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: right;
`

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TableStyle = styled.table`
    padding: 10px;
    border-collapse: collapse;
    align-self: flex-start;
`;

export const Table =<T extends object & {id: number, name: string}>({dataItem, selectedItems, handlerPick, handlerDelete, handlerAdd, handlerPickAll}: TableProps<T>) => {
    return (
    <TableContainer>
        <ButtonsContainer>
            <Button handler={handlerPickAll} text={"Выделить все"}/>
            <Button handler={handlerAdd} text={"Добавить"} />
            <Button handler={handlerDelete} text={"Х"}/>
        </ButtonsContainer>
        <TableStyle>
            <tbody>
                {dataItem.map( (data: T, id) => <Row clearActive={selectedItems[data.id]} handlerPick={handlerPick} key={data.id + id} value={data}/>)}
            </tbody>  
        </TableStyle>
    </TableContainer>
    )
}