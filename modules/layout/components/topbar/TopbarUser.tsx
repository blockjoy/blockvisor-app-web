import { styles } from './TopbarUser.styles';
import { ButtonWithDropdown, DropdownItem } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { divider } from 'styles/utils.spacing.styles';
import IconCog from '@public/assets/icons/cog-12.svg';
import IconDoor from '@public/assets/icons/door-12.svg';
import { useRouter } from 'next/router';
import { authAtoms, useSignOut } from '@modules/auth';
import { useRecoilValue } from 'recoil';

export const TopbarUser = () => {
  const user = useRecoilValue(authAtoms.user);

  const router = useRouter();
  const signOut = useSignOut();

  const handleLogout = async () => {
    signOut();
    router.reload();
  };

  return (
    <ButtonWithDropdown
      button={
        <button css={[styles.button]}>
          {user?.firstName?.substring(0, 1)}
          {user?.lastName?.substring(0, 1)}
        </button>
      }
    >
      <ul css={[reset.list]}>
        <li>
          <DropdownItem href="/profile/settings">
            <IconCog />
            Settings
          </DropdownItem>
        </li>
        <li css={[divider]}>
          <DropdownItem onButtonClick={handleLogout}>
            <IconDoor />
            Logout
          </DropdownItem>
        </li>
      </ul>
    </ButtonWithDropdown>
  );
};
