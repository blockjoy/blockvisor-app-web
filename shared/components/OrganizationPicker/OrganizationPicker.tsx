import { FC, useRef, useState } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconPlus from '@public/assets/icons/plus-12.svg';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown, DropdownItem } from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { layoutState, sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { isMobile } from 'react-device-detect';

type Props = {
  hideName?: boolean;
};

export const OrganizationPicker: FC<Props> = ({ hideName }) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleChange = async (orgId?: string, orgName?: string) => {
    if (orgId && orgName && orgId !== defaultOrganization?.id) {
      await switchOrganization(orgId, orgName);
      setIsOpen(false);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const handleCreateClicked = () => {
    setIsOpen(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    router.push({
      pathname: ROUTES.ORGANIZATIONS,
      query: { add: true },
    });
  };

  return (
    <div
      css={[styles.wrapper, hideName && styles.wrapperNameHidden]}
      ref={dropdownRef}
    >
      <button css={styles.select} onClick={handleClick}>
        {!hideName && (
          <span className="title" css={styles.title}>
            Organization
          </span>
        )}
        <span css={styles.bubble}>
          {defaultOrganization?.name?.substring(0, 1)?.toUpperCase()}
        </span>
        {!hideName && (
          <p css={styles.selectText}>{defaultOrganization?.name}</p>
        )}
      </button>
      <Dropdown isOpen={isOpen} additionalStyles={styles.dropdown}>
        <PerfectScrollbar css={styles.dropdownInner(10)}>
          <ul>
            {allOrganizations?.map((org) => (
              <li key={org.id}>
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleChange(org.id, org.name)}
                >
                  {org.name}
                </DropdownItem>
              </li>
            ))}
          </ul>
          <button css={[styles.createButton]} onClick={handleCreateClicked}>
            <IconPlus /> Add organization
          </button>
        </PerfectScrollbar>
      </Dropdown>
      <span css={[styles.icon, isOpen && styles.iconActive]}>
        <IconArrow />
      </span>
    </div>
  );
};
