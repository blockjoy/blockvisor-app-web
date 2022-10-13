import { styles } from './TopbarUser.styles';
import { ButtonWithDropdown, DropdownItem } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { divider } from 'styles/utils.spacing.styles';
import IconCog from '@public/assets/icons/cog-12.svg';
import IconDoor from '@public/assets/icons/door-12.svg';
import { useAuth } from '@modules/auth';
import { useRouter } from 'next/router';

export const TopbarUser = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    router.reload();
  };

  return (
    <ButtonWithDropdown button={<button css={[styles.button]}>JH</button>}>
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
