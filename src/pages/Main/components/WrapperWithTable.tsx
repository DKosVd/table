import styled from 'styled-components';
import TableEmployees from './TableEmployees';
import TableCompanies from './TableCompanies';
import FormCompanies from './FormCompanies';
import FormEmployees from './FormEmployees';

const WrapperForTable = styled.div`
    display: flex;
    gap: 50px;
    padding: 30px 0px 0px 0pxs;
`;



const FormTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const WrapperWithTable = () => {
    return (
        <WrapperForTable>
            <FormTable>
                <TableCompanies/>
                <FormCompanies/>
            </FormTable>
            <FormTable>
                <TableEmployees/>
                <FormEmployees/>
            </FormTable>
        </WrapperForTable>
    )
}