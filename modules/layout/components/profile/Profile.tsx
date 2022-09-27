import { useRecoilValue, useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

import ProfileSwitch from './ProfileSwitch';

import {
  Drawer,
  DrawerAction,
  DrawerContent,
  DrawerHeader,
  DrawerSubheader,
} from '..';

import { themeDark, themeLight } from '../../../../themes';
import { themeState } from '../../../../pages/ThemeProvider';
import { Button } from '@shared/components';
import { styles } from './Profile.styles';
import { deleteUser } from '@shared/utils/browserStorage';
import { authAtoms } from '@modules/auth';
import { ProfileUpdate } from './ProfileUpdateForm/ProfileUpdateForm';

export default () => {
  const layout = useRecoilValue(layoutState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [, setUser] = useRecoilState(authAtoms.user);

  const handleDarkModeToggled = () => {
    setTheme(theme.id === 'dark' ? { ...themeLight } : { ...themeDark });
  };

  const handleLogout = () => {
    setUser(null);
    deleteUser();
  };

  return (
    <Drawer isOpen={layout === 'profile'}>
      <DrawerHeader>Profile Settings</DrawerHeader>
      <DrawerContent>
        <DrawerSubheader>ACCESSIBILITY</DrawerSubheader>
        <ProfileSwitch
          isChecked={theme.id === 'dark'}
          onChecked={handleDarkModeToggled}
        />
      </DrawerContent>
      <DrawerAction>
        <DrawerSubheader>PROFILE</DrawerSubheader>
        <ProfileUpdate />
      </DrawerAction>
      <DrawerAction>
        <Button
          onClick={handleLogout}
          size="small"
          type="submit"
          customCss={[styles.action]}
        >
          Logout
        </Button>
      </DrawerAction>
    </Drawer>
  );
};
