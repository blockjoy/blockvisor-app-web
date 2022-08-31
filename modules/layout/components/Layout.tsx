import styled from "@emotion/styled";
import React from "react";

const StyledSidebar = styled.aside`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: red;
`;

const StyledTopbar = styled.nav`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background: green;
`;

const StyledContent = styled.main`
  padding-top: 56px;
  margin-left: 300px;
  background: purple;
`;

type LayoutType = {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutType>  = ({ children }) => {
  return (
   <>
    <StyledSidebar>

    </StyledSidebar>
    <StyledTopbar>

    </StyledTopbar>
    <StyledContent>
        {children}
        
    </StyledContent>
   </>
  );
}
