import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header/Header';


const Container = styled.div`
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

type PageTemplateProps = {
    children: React.ReactNode;
}

const Spacing = styled.div`
    margin: 20px 0px;
`

export const PageTemplate: React.FC<PageTemplateProps> = ({children}) => {
    return (
        <>
            <Header/>
            <Spacing/>
            <Container>{children}</Container>
        </>
    )
}