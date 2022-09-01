import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const StyledWrapper = styled.header`
    padding: 16px;
`;

const DrawerHeader: React.FC<PropsWithChildren> =  ({ children }) => {
  return (
   <StyledWrapper>
      {children}
   </StyledWrapper>
  );
}

export default DrawerHeader;