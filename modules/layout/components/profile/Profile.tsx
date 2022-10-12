import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

import { Drawer, DrawerAction, DrawerHeader } from '..';

import { themeDark, themeLight } from '../../../../themes';
import { themeState } from '../../../theme/ThemeProvider';
import { Button } from '@shared/components';
import { styles } from './Profile.styles';
import { deleteUser } from '@shared/utils/browserStorage';
import { authAtoms, useAuth } from '@modules/auth';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [layout, setLayout] = useRecoilState(layoutState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [, setUser] = useRecoilState(authAtoms.user);

  const handleDarkModeToggled = () => {
    setTheme(theme.id === 'dark' ? { ...themeLight } : { ...themeDark });
  };

  const handleLogout = () => {
    setLayout(undefined);
    signOut();
    router.reload();
  };

  return (
    <Drawer isOpen={layout === 'profile'}>
      <DrawerHeader>Profile Settings</DrawerHeader>
      {/* <DrawerContent>
        <DrawerSubheader>ACCESSIBILITY</DrawerSubheader>
        <ProfileSwitch
          isChecked={theme.id === 'dark'}
          onChecked={handleDarkModeToggled}
        />
      </DrawerContent> */}
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
