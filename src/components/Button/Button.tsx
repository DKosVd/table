import styled from "styled-components"



const ButtonStyle = styled.button`
    padding: 10px;
`;


type ButtonProps = {
    text: string;
    handler: (e: any) => void;
}

export const Button: React.FC<ButtonProps> = ({text, handler}) => {
    return <ButtonStyle onClick={handler}>{text}</ButtonStyle>
}