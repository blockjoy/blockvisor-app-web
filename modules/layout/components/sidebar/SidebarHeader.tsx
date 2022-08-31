import styled from "@emotion/styled";
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #363938;
`;

const StyledDropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledAvatar = styled.div`
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

const StyledUsername = styled.div`
  
`;

const StyledLogo = styled(LogoSmall)`
  & path {
    fill: #4c4f4d;
  }
`;

export default () => {
  return (
   <StyledWrapper>
        <StyledDropdownButton>
            <StyledAvatar>
                B
            </StyledAvatar>
            <StyledUsername>
                Blockjoy
            </StyledUsername>
        </StyledDropdownButton>
        <StyledLogo />
   </StyledWrapper>
  );
}
