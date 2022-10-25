import { Row } from "../../components/Row/Row"
import { Table } from "../../components/Table/Table"
import { PageTemplate } from "../../templates/PageTemplate"
import styled from 'styled-components';


const WrapperForTable = styled.div`
    display: flex;
`;


export const Main = () => {
    return (
        <PageTemplate>
            <WrapperForTable>
                <Table>
                    <Row/>
                </Table>
                <Table>
                    <Row/>
                </Table>
            </WrapperForTable>
        </PageTemplate>
    )
}