import styled from "styled-components"



const ButtonStyle = styled.button`
    padding: 10px;
    border: 0;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
`;


type ButtonProps = {
    text: string;
    handler: (e: any) => void;
    type?: any;
}

export const Button: React.FC<ButtonProps> = ({type ='button', text, handler}) => {
    return <ButtonStyle type={type} onClick={handler}>{text}</ButtonStyle>
}