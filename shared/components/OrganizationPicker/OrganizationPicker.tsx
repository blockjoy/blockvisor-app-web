import { ChangeEvent, useEffect, useRef, useState } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconPlus from '@public/assets/icons/plus-12.svg';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown, DropdownItem } from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useSetDefaultOrganization } from '@modules/organization/hooks/useSetDefaultOrganization';
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
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleChange = async (orgId?: string, orgName?: string) => {
    if (orgId && orgName) {
      await switchOrganization(orgId, orgName);
      setIsOpen(false);
    }
  };

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    await switchOrganization(
      e.target.value,
      allOrganizations[e.target.selectedIndex].name!,
    );
    // setDefaultOrganization(
    //   e.target.value,
    //   allOrganizations[e.target.selectedIndex].name!,
    // );
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const handleCreateClicked = () => {
    setLayout('organization');
  };

  return (
    <div css={[styles.wrapper]} ref={dropdownRef}>
      <select
        css={[styles.select, styles.nativeSelect]}
        value={defaultOrganization?.id}
        onChange={handleSelect}
      >
        {allOrganizations?.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>

      <button css={[styles.select, styles.customSelect]} onClick={handleClick}>
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
