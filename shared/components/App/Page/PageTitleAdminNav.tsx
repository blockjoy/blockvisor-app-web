import { DropdownMenu, NextLink, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { styles } from './PageTitleAdminNav.styles';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconUser from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/common/Grid.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

const links = [
  { name: 'dashboard', icon: <IconDashboard /> },
  { name: 'nodes', icon: <IconNode /> },
  { name: 'hosts', icon: <IconHost /> },
  { name: 'orgs', icon: <IconOrganization /> },
  { name: 'users', icon: <IconUser /> },
  { name: 'settings', icon: <IconCog /> },
];

export const PageTitleAdminNav = () => {
  const router = useRouter();

  const { name } = router.query;

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleClickOutside = () => setIsOpen(false);

  const handleItemClick = (link: string) => {
    setIsOpen(false);

    setTimeout(() => {
      router.push(`/admin?name=${link}`);
    }, 250);
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const selectedLink = links.find((link) => link.name === name);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <button css={styles.button} type="button" onClick={handleClick}>
        {selectedLink ? (
          <>
            <SvgIcon additionalStyles={[styles.nameIcon]} isDefaultColor>
              {selectedLink?.icon}
            </SvgIcon>
            {selectedLink.name}
            <span css={[styles.icon, isOpen && styles.iconActive]}>
              <SvgIcon isDefaultColor size="11px">
                <IconArrow />
              </SvgIcon>
            </span>
          </>
        ) : (
          ''
        )}
      </button>
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.menu}>
        <ul css={styles.links}>
          {links
            .filter((link) => link.name !== name)
            .map((link) => (
              <a
                key={link.name}
                css={styles.link}
                onClick={() => handleItemClick(link.name)}
              >
                <SvgIcon size="12px" isDefaultColor>
                  {link.icon}
                </SvgIcon>
                {link.name}
              </a>
            ))}
        </ul>
      </DropdownMenu>
    </div>
  );
};
