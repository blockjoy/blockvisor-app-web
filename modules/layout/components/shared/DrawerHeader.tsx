import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const StyledWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid ${p => p.theme.colorBorder};
    color: ${p => p.theme.colorText};
`;

const DrawerHeader: React.FC<PropsWithChildren> =  ({ children }) => {
  return (
   <StyledWrapper>
      {children}
   </StyledWrapper>
  );
}

export default DrawerHeader;