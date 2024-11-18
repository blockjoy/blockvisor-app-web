import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Dropdown, SvgIcon } from '@shared/components';
import { styles } from './PageTitleAdminNav.styles';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconUser from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/common/Grid.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconBlockchain from '@public/assets/icons/app/Blockchain.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type LinkItem = {
  id?: string;
  name?: string;
  icon?: React.ReactNode;
};

export const PageTitleAdminNav = () => {
  const links: LinkItem[] = useMemo(
    () => [
      { id: 'dashboard', name: 'Dashboard', icon: <IconDashboard /> },
      { id: 'nodes', name: 'Nodes', icon: <IconNode /> },
      { id: 'hosts', name: 'Hosts', icon: <IconHost /> },
      { id: 'blockchains', name: 'Blockchains', icon: <IconBlockchain /> },
      { id: 'orgs', name: 'Orgs', icon: <IconOrganization /> },
      { id: 'users', name: 'Users', icon: <IconUser /> },
      { id: 'costs', name: 'Costs', icon: <IconBilling /> },
      { id: 'settings', name: 'Settings', icon: <IconCog /> },
    ],
    [],
  );
  const router = useRouter();
  const { name } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (item: LinkItem | null) =>
    router.push(`/admin?name=${item?.id}`);

  const renderItem = (item: LinkItem) => (
    <>
      <SvgIcon size="12px" isDefaultColor>
        {item.icon}
      </SvgIcon>
      {item.name}
    </>
  );

  const selectedLink = links.find((link) => link.id === name) ?? null;

  const dropdownItemStyles = (item: LinkItem) => [styles.link];

  return (
    <div css={styles.wrapper}>
      <Dropdown
        items={links}
        handleOpen={handleOpen}
        handleSelected={handleSelect}
        isOpen={isOpen}
        selectedItem={selectedLink}
        noBottomMargin={true}
        excludeSelectedItem
        renderItem={renderItem}
        renderButtonText={
          <>
            <SvgIcon additionalStyles={[styles.nameIcon]} isDefaultColor>
              {selectedLink?.icon}
            </SvgIcon>
            <span css={styles.name}>{selectedLink?.name}</span>
            <span css={[styles.icon, isOpen && styles.iconActive]}>
              <SvgIcon isDefaultColor size="11px">
                <IconArrow />
              </SvgIcon>
            </span>
          </>
        }
        dropdownButtonStyles={[styles.button]}
        dropdownMenuStyles={[styles.menu]}
        dropdownItemStyles={dropdownItemStyles}
        hideDropdownIcon={true}
        dropdownScrollbarStyles={[styles.scrollbar]}
      />
    </div>
  );
};
