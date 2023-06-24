import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtoms, usePermissions, useSignOut } from '@modules/auth';
import { ROUTES } from '@shared/constants/routes';
import { DropdownMenu, DropdownItem, Badge } from '@shared/components';
import { ProfileBubble } from './ProfileBubble';
import { styles } from './ProfileDropdown.styles';
import IconDoor from '@public/assets/icons/common/Door.svg';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { spacing } from 'styles/utils.spacing.styles';

export const ProfileDropdown = () => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);

  const [isOpen, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const signOut = useSignOut();

  const handleClick = () => setOpen(!isOpen);
  const handleClickOutside = () => setOpen(false);
  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const handleRedirect = (path: string) => {
    router.push(
      {
        pathname: path,
        query: {
          tab: 1,
        },
      },
      undefined,
      { shallow: true },
    );
    handleClickOutside();
  };

  const handleSignOut = async () => {
    signOut();
    handleClickOutside();
  };

  const { isSuperUser } = usePermissions();

  return (
    <div ref={dropdownRef} css={styles.base}>
      <button css={styles.button} onClick={handleClick}>
        <ProfileBubble />
      </button>
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <DropdownItem
          size="large"
          additionalStyles={[styles.userInfoContainer]}
        >
          <div css={styles.userInfo}>
            <span css={styles.label}>Signed in as</span>
            <span>{escapeHtml(`${user?.firstName} ${user?.lastName}`)}</span>
            {isSuperUser && (
              <Badge customCss={[spacing.top.micro]} style="outline">
                Super User
              </Badge>
            )}
          </div>
        </DropdownItem>
        <DropdownItem
          type="button"
          size="medium"
          onButtonClick={() => handleRedirect(ROUTES.PROFILE)}
        >
          <span css={styles.icon}>
            <IconPerson />
          </span>
          Profile
        </DropdownItem>
        <DropdownItem
          type="button"
          size="medium"
          onButtonClick={() => handleRedirect(ROUTES.SETTINGS)}
        >
          <span css={styles.icon}>
            <IconCog />
          </span>
          Settings
        </DropdownItem>
        <DropdownItem
          type="button"
          size="medium"
          onButtonClick={() => handleRedirect(ROUTES.BILLING)}
        >
          <span css={styles.icon}>
            <IconBilling />
          </span>
          Billing
        </DropdownItem>
        <DropdownItem type="button" size="medium" onButtonClick={handleSignOut}>
          <span css={styles.icon}>
            <IconDoor />
          </span>
          <span>Sign Out</span>
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
};
