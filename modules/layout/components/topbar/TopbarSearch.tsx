import styled from "@emotion/styled";

const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border-radius: 8px;
    background: ${p => p.theme.colorActive};
`;

const StyledIcon = styled.span`
  position: absolute;
  font-size: 15px;
  color: ${p => p.theme.colorLabel};
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 0;
  padding: 0 7px;
  background: transparent;
  border: 0;
  outline: none;
  color: ${p => p.theme.colorText}; 
  transition: width 0.3s;
  
  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    width: 100px;
    padding: 0 10px 0 30px;
  }

  &:focus {
    width: 160px;
    padding: 0 10px 0 24px;
  }
`;

export default () => {
  return (
   <StyledWrapper>
      <StyledIcon className="uil uil-search" />
      <StyledInput />
   </StyledWrapper>
  );
}
