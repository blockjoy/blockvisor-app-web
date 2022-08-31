import styled from "@emotion/styled";

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    padding-left: 300px;
    border-bottom: 1px solid #363938;
    background: #212423;
`;

export default () => {
  return (
   <StyledWrapper>
    Topbar
   </StyledWrapper>
  );
}
