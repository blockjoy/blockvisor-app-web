import { useRecoilValue } from "recoil";
import { appState } from "@modules/layout/store";

import styled from "@emotion/styled";

import SidebarHeader from "./SidebarHeader";
// import SidebarLeft from "./SidebarLeft";
import SidebarMain from "./SidebarMain";

type Props = {
  isSidebarOpen: boolean
}

const StyledSidebar = styled.div<Props>`
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border-right: 1px solid ${p => p.theme.colorBorder};
  background: #212423;
  transform: translateX(${p => p.isSidebarOpen ? 0 : "-100%"});
  transition-property: transform;
  transition-duration: 0.4s;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    transform: translateX(0);
    z-index: 1;
  }
`;

const StyledSidebarWrapper = styled.div`
    flex:1 1 auto;
    display: flex;
`;

export default () => {
  const { isSidebarOpen } = useRecoilValue(appState);
  return (
   <StyledSidebar isSidebarOpen={isSidebarOpen}>
    <SidebarHeader />
    <StyledSidebarWrapper>
        {/* <SidebarLeft /> */}
        <SidebarMain />
    </StyledSidebarWrapper>
   </StyledSidebar>
  );
}
