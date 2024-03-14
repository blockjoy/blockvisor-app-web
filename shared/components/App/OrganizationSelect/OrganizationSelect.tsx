import { useState, useMemo, useEffect, useRef } from 'react';
import { withSearchDropdown, Dropdown } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';

import { Org } from '@modules/grpc/library/blockjoy/v1/org';

export const OrganizationSelect = () => {
  const selectedOrg = useRef<Org>();

  const allOrganizations = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = (isOpen?: boolean) => setIsOpen(isOpen!);

  const handleChange = async (nextOrg: Org | null) => {
    if (!nextOrg) return;

    await switchOrganization(nextOrg.id, nextOrg.name);

    selectedOrg.current = allOrganizations.find(
      (org) => org.id === nextOrg?.id,
    )!;

    setIsOpen(false);
  };

  const OrgSelectDropdown = useMemo(
    () => withSearchDropdown<Org>(Dropdown),
    [allOrganizations],
  );

  useEffect(() => {
    if (defaultOrganization?.id && allOrganizations?.length) {
      selectedOrg.current = allOrganizations.find(
        (org) => org.id === defaultOrganization?.id,
      )!;
    }
  }, [defaultOrganization?.id, allOrganizations]);

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
