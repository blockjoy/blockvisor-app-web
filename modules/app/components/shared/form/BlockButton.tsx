import styled from "@emotion/styled";

type Props = {
    children: React.ReactNode,
    onClick: () => void,
    isAccent?: boolean,
    isDefault?: boolean,
    isLoading?: boolean,
    disabled?: boolean
}

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 10px;
    border: 0;
    border-radius: 4px;
    background: ${p => p.theme.colorPrimary};
    color: ${p => p.theme.colorPrimaryText};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
`;

export const BlockButton: React.FC<Props> = ({ children, onClick }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
}