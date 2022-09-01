import styled from "@emotion/styled";
import React from "react";

const StyledHeader = styled.header`
  font-size: 20px;
  margin: 0 0 32px;
`;

export const PageHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
    <StyledHeader>
        {children}
    </StyledHeader>
);
