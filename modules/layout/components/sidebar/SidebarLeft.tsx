import styled from "@emotion/styled";
import IconBlockvisor from "@public/assets/icons/blockvisor-20.svg";

const StyledWrapper = styled.main`
  display: grid;
  justify-items: center;
  width: 56px;
  padding: 16px 0 0;
  border-right: 1px solid #363938;
`;

const StyledButton = styled.button`
  display: grid;
  place-items: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  border: 0;
  background: ${p => p.theme.colorActive};
`;

const StyledIcon = styled(IconBlockvisor)`
  & path {
    fill: ${p => p.theme.colorPrimary};
    fill-opacity: 1;
  }
`;

export default () => {
  return (
   <StyledWrapper>
    <StyledButton>
    <StyledIcon />
    </StyledButton>
   </StyledWrapper>
  );
}
