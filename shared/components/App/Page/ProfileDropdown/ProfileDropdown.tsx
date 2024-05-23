import { useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { authAtoms, authSelectors, useSignOut } from '@modules/auth';
import { ROUTES } from '@shared/constants/routes';
import { Badge, Dropdown } from '@shared/components';
import { ProfileBubble } from './ProfileBubble';
import { styles } from './ProfileDropdown.styles';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { spacing } from 'styles/utils.spacing.styles';
import IconDoor from '@public/assets/icons/common/Door.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

type ProfileDropdownItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: VoidFunction;
};

export const ProfileDropdown = () => {
  const items: ProfileDropdownItem[] = useMemo(
    () => [
      {
        id: 'settings',
        name: 'Settings',
        icon: <IconCog />,
        onClick: () => router.push(ROUTES.SETTINGS),
      },
      {
        id: 'sign-out',
        name: 'Sign Out',
        icon: <IconDoor />,
        onClick: () => signOut(),
      },
    ],
    [],
  );

  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const signOut = useSignOut();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const renderItem = (item: ProfileDropdownItem) => (
    <>
      <span css={styles.icon}>{item.icon}</span>
      <span>{item.name}</span>
    </>
  );

  const handleOpen = (open: boolean = true) => setIsOpen(open);
  const handleSelect = (item: ProfileDropdownItem | null) => item?.onClick();

  return (
    <div ref={dropdownRef} css={styles.base}>
      <Dropdown
        items={items}
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleSelected={handleSelect}
        selectedItem={null}
        noBottomMargin={true}
        renderItem={renderItem}
        renderHeader={
          <div css={styles.userInfo}>
            <span css={styles.label}>Signed in as</span>
            <span css={styles.labelSub}>
              {escapeHtml(`${user?.firstName} ${user?.lastName}`)}
            </span>
            {isSuperUser && (
              <Badge customCss={[spacing.top.micro]} style="outline">
                Super User
              </Badge>
            )}
          </div>
        }
        renderButtonText={<ProfileBubble />}
        hideDropdownIcon={true}
        dropdownMenuStyles={[styles.dropdown]}
        dropdownButtonStyles={styles.button}
      />
    </div>
  );
};
