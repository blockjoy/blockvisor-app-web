import { useRecoilState } from "recoil";
import { appState } from "@modules/layout/store"

import styled from "@emotion/styled";

const StyledAvatar = styled.button`
    display: grid;
    place-items: center;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    padding: 0;
    font-size: 12px;
    border: 0;
    border-radius: 50%;
    background: #8f44fd;
    color: #f9f9f9;
    cursor: pointer;
`;

export default () => {
  const [app, setApp] = useRecoilState(appState);

  const handleClick = () => {
    setApp({
      ...app,
      isProfileOpen: !app.isProfileOpen
    });
  }

  return (
   <StyledAvatar onClick={handleClick}>
      JH
   </StyledAvatar>
  );
}
