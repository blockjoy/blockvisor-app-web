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
  color: #1a1a1a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const BlockButton: React.FC<Props> = ({ children, onClick }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
}