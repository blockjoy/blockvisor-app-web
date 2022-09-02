import { useRecoilState } from "recoil";
import { layoutState } from "@modules/layout/store";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = { isOpen: boolean, isSidebarOpen: boolean, isOthersOpen: boolean };

const visibleStyles = css`
  opacity: 1;
  visibility: visible;
`;

const hiddenStyles = css`
  opacity: 0;
  visibility: hidden;
`;

const StyledOverlay = styled.div<Props>`
  position: fixed;
  z-index: 7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.4s;

  ${p => p.isOpen && visibleStyles};

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    ${p => p.isSidebarOpen && !p.isOthersOpen && hiddenStyles};
  }
`;

const Overlay = () => {
  const [ layout, setLayout ] = useRecoilState(layoutState);
  const { isSidebarOpen, isProfileOpen, isNodeAddOpen, isHostsAddOpen } = layout;
  
  const handleClick = () => setLayout({ 
    ...layout, 
    isSidebarOpen: false, 
    isProfileOpen: false,
    isNodeAddOpen: false,
    isHostsAddOpen: false
  });

  const isOthersOpen = isNodeAddOpen || isProfileOpen || isHostsAddOpen;

  return (
    <StyledOverlay 
      onClick={handleClick} 
      isSidebarOpen={isSidebarOpen} 
      isOpen={isSidebarOpen || isOthersOpen} 
      isOthersOpen={isOthersOpen} 
    />
  );
}

export default Overlay;