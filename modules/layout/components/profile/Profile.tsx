import { useRecoilValue, useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store';

import ProfileSwitch from './ProfileSwitch';

import { Drawer, DrawerContent, DrawerHeader, DrawerSubheader } from '..';

import { themeDark, themeLight } from '../../../../themes';
import { themeState } from '../../../../pages/ThemeProvider';

export default () => {
  const { isProfileOpen } = useRecoilValue(layoutState);
  const [theme, setTheme] = useRecoilState(themeState);

  const handleDarkModeToggled = () => {
    setTheme(theme.id === 'dark' ? { ...themeLight } : { ...themeDark });
  };

  return (
    <Drawer isOpen={isProfileOpen}>
      <DrawerHeader>Profile Settings</DrawerHeader>
      <DrawerContent>
        <DrawerSubheader>ACCESSIBILITY</DrawerSubheader>
        <ProfileSwitch
          isChecked={theme.id === 'dark'}
          onChecked={handleDarkModeToggled}
        />
      </DrawerContent>
    </Drawer>
  );
};
