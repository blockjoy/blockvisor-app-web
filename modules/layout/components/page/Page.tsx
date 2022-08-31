import styled from "@emotion/styled";
import React from "react";

const StyledWrapper = styled.div`
    padding: 72px 16px 16px;
    margin-left: 300px;
    background: purple;
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
