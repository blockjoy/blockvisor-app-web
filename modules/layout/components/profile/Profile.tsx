import { useRecoilValue, useRecoilState } from "recoil";
import { appState } from "@modules/layout/store";

import styled from "@emotion/styled";

import ProfileHeader from "./ProfileHeader";
import ProfileSubheader from "./ProfileSubheader";
import ProfileSwitch from "./ProfileSwitch";

import { themeDark, themeLight } from "../../../../themes";

import { themeState } from "../../../../pages/ThemeProvider";

type Props = {
  isOpen: boolean
}

const StyledProfile = styled.div<Props>`
  position: fixed;
  z-index: 6;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border-right: 1px solid ${p => p.theme.colorBorder};
  background: ${p => p.theme.colorBackground};
  transform: translateX(${p => p.isOpen ? 0 : "100%"});
  transition-property: transform;
  transition-duration: 0.4s;
`;

const StyledProfileContent = styled.div`
  padding: 16px;
`;

export default () => {
  const { isProfileOpen } = useRecoilValue(appState);
  const [theme, setTheme] = useRecoilState(themeState);

    const handleDarkModeToggled = () => {
        // toggle dark mode
        setTheme(theme.id === "dark" ? {...themeLight} : {...themeDark});
    }

  return (
   <StyledProfile isOpen={isProfileOpen}>
        <ProfileHeader />
        <StyledProfileContent>
            <ProfileSubheader>
                ACCESSIBILITY
            </ProfileSubheader>
            <ProfileSwitch isChecked={theme.id === "dark"} onChecked={handleDarkModeToggled} />
        </StyledProfileContent>
   </StyledProfile>
  );
}