import styled from "@emotion/styled";

const StyledWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid ${p => p.theme.colorBorder};
    color: ${p => p.theme.colorText};
`;

export default () => {
  return (
   <StyledWrapper>
      Profile Settings
   </StyledWrapper>
  );
}
