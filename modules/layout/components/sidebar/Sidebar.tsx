import styled from "@emotion/styled";
import SidebarHeader from "./SidebarHeader";
import SidebarLeft from "./SidebarLeft";
import SidebarMain from "./SidebarMain";

const StyledSidebar = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border-right: 1px solid #363938;
  background: #212423;
`;

const StyledSidebarWrapper = styled.div`
    flex:1 1 auto;
    display: flex;
`;

export default () => {
  return (
   <StyledSidebar>
    <SidebarHeader />
    <StyledSidebarWrapper>
        <SidebarLeft />
        <SidebarMain />
    </StyledSidebarWrapper>
   </StyledSidebar>
  );
}
