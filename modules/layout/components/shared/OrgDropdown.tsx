import styled from "@emotion/styled";

const StyledDropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledOrgIcon = styled.div`
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #BFF589;
    color: #212423;
    font-size: 12px;
    font-weight: 500;
`;

const StyledOrgName = styled.div`
  
`;

type Props = {
    hideName?: boolean
}


export const OrgDropdown: React.FC<Props> = ({ hideName }) => {
  return (
    <StyledDropdownButton>
        <StyledOrgIcon>
            B
        </StyledOrgIcon>
        {!hideName && (
            <StyledOrgName>
                Blockjoy
            </StyledOrgName>
        )}
    </StyledDropdownButton>
  );
}
