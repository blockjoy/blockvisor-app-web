import styled from "@emotion/styled";
import React from "react";

import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import Page from "./page/Page";

const StyledSidebar = styled.aside`
  
`;

const StyledTopbar = styled.nav`
  
`;

const StyledContent = styled.main`
  padding: 72px 16px 16px;
  margin-left: 300px;
  background: purple;
`;

type LayoutType = {
    children: React.ReactNode
}

export const AppLayout: React.FC<LayoutType>  = ({ children }) => {
  return (
   <>
      <Sidebar />
      <Topbar />
      <Page>
          {children}
      </Page>
   </>
  );
}
