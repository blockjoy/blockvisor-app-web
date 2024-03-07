import { useState, useMemo } from 'react';
import { withSearchDropdown, Dropdown } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';

import { Org } from '@modules/grpc/library/blockjoy/v1/org';

export const OrganizationSelect = () => {
  const allOrganizations = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = (isOpen?: boolean) => setIsOpen(isOpen!);

  const handleChange = async (org: Org | null) => {
    if (!org) return;

    const { id, name } = org;

    if (id && name && id !== defaultOrganization?.id) {
      await switchOrganization(id, name);
      setIsOpen(false);
    }
  };

  const OrgSelectDropdown = useMemo(
    () => withSearchDropdown<Org>(Dropdown),
    [allOrganizations],
  );

  return (
    <OrgSelectDropdown
      items={allOrganizations}
      selectedItem={
        allOrganizations.find((org) => org.id === defaultOrganization?.id)!
      }
      handleSelected={handleChange}
      isOpen={isOpen}
      handleOpen={handleClick}
      isLoading={false}
      size="small"
    />
  );
};
