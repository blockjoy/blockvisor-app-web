import styled from "@emotion/styled";
import React from "react";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  font-size: 20px;
  margin: 0 0 32px;
  color: ${p => p.theme.colorText};
`;

export const PageHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
    <StyledHeader>
        {children}
    </StyledHeader>
);
