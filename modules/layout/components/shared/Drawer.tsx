import { PropsWithChildren } from "react";

import styled from "@emotion/styled";

type Props = {
    children?: React.ReactNode,
    isOpen: boolean
}

const StyledDrawer = styled.div<Props>`
  position: fixed;
  z-index: 8;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border-left: 1px solid ${p => p.theme.colorBorder};
  background: ${p => p.theme.colorBackground};
  transform: translateX(${p => p.isOpen ? 0 : "100%"});
  transition-property: transform;
  transition-duration: 0.4s;
`;

const Drawer: React.FC<Props> = ({ children, isOpen }) => {
    return <StyledDrawer isOpen={isOpen}>{children}</StyledDrawer>
}

export default Drawer;