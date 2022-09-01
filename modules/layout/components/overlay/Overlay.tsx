import { useRecoilState } from "recoil";
import { appState } from "@modules/layout/store";

import styled from "@emotion/styled";
import { css } from "@emotion/css";

type Props = { isSidebarOpen: boolean, isProfileOpen: boolean };

const StyledOverlay = styled.div<Props>`
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
  opacity: ${p => p.isSidebarOpen || p.isProfileOpen ? 1 : 0};
  visibility: ${p => p.isSidebarOpen || p.isProfileOpen ? "visible" : "hidden"};
  transition-property: opacity, visibility;
  transition-duration: 0.4s;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    opacity: ${p => p.isProfileOpen ? 1 : 0};
    visibility: ${p => p.isProfileOpen ? "visible" : "hidden"};
  }
`;

const Overlay = () => {
  const [app, setApp ] = useRecoilState(appState);
  const { isSidebarOpen, isProfileOpen } = app;
  const handleClick = () => setApp({ ...app, isSidebarOpen: false, isProfileOpen: false });
  return (
   <StyledOverlay onClick={handleClick} isSidebarOpen={isSidebarOpen} isProfileOpen={isProfileOpen} />
  );
}

export default Overlay;