import styled from "@emotion/styled";
import React from "react";

const StyledWrapper = styled.div`
    position: relative;
    z-index: 3;
    padding: 56px 0 16px;
    transition: margin 0.4s;

    @media only screen and (min-width: ${p => p.theme.screenSm}) {
      margin-left: 300px;
      z-index: 3;
    }
`;

type LayoutType = {
    children: React.ReactNode
}

const Page: React.FC<LayoutType>  = ({ children }) => {
  return (
    <StyledWrapper>
        {children}
    </StyledWrapper>
  );
}

export default Page;
