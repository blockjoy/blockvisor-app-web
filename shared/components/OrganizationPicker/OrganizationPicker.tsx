import { ChangeEvent, useRef, useState } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconPlus from '@public/assets/icons/plus-12.svg';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown, DropdownItem } from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';

export const OrganizationPicker = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const setLayout = useSetRecoilState(layoutState);

  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleChange = async (orgId?: string, orgName?: string) => {
    if (orgId !== defaultOrganization?.id)
      await switchOrganization(orgId!, orgName!);
    setIsOpen(false);
  };

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOrg = allOrganizations[e.target.selectedIndex];
    if (selectedOrg.id !== defaultOrganization?.id)
      await switchOrganization(e.target.value, selectedOrg.name!);
    setIsOpen(false);
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const handleCreateClicked = () => {
    setLayout('organization');
  };

  return (
    <div css={[styles.wrapper]} ref={dropdownRef}>
      <button css={styles.select} onClick={handleClick}>
        <span className="title" css={styles.title}>
          Organization
        </span>
        {defaultOrganization?.name}
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
