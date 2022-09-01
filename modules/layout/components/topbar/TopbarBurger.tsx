import { useRecoilState } from "recoil";
import { appState } from "@modules/layout/store"

import styled from "@emotion/styled";

import IconBlockvisor from "@public/assets/icons/menu-32.svg";

const StyledButton = styled.button`
    display: grid;
    place-items: center;
    background: transparent;
    border: 0;
    cursor: pointer;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    display: none;
  }
`;

export default () => {
  const [app, setApp] = useRecoilState(appState);

  const handleClick = () => {
    setApp({
      ...app,
      isSidebarOpen: !app.isSidebarOpen
    });
  }

  return (
    <StyledButton onClick={handleClick}>
        <IconBlockvisor />
    </StyledButton>
  );
}
