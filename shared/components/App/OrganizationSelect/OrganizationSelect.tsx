import { useState, useMemo, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { withSearchDropdown, Dropdown } from '@shared/components';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { organizationSelectors } from '@modules/organization';

export const OrganizationSelect = () => {
  const selectedOrg = useRef<Org>();

  const allOrganizations = useRecoilValue(
    organizationSelectors.allOrganizationsSorted,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = (isOpen?: boolean) => setIsOpen(isOpen!);

  const handleChange = async (nextOrg: Org | null) => {
    if (!nextOrg) return;

    await switchOrganization(nextOrg.orgId, nextOrg.name);

    selectedOrg.current = allOrganizations.find(
      (org) => org.orgId === nextOrg?.orgId,
    )!;

    setIsOpen(false);
  };

  const OrgSelectDropdown = useMemo(
    () => withSearchDropdown<Org>(Dropdown),
    [allOrganizations],
  );

  useEffect(() => {
    if (defaultOrganization?.orgId && allOrganizations?.length) {
      selectedOrg.current = allOrganizations.find(
        (org) => org.orgId === defaultOrganization?.orgId,
      )!;
    }
  }, [defaultOrganization?.orgId, allOrganizations]);

  return (
    <OrgSelectDropdown
      items={allOrganizations}
      selectedItem={
        allOrganizations.find(
          (org) => org.orgId === defaultOrganization?.orgId,
        )!
      }
      handleSelected={handleChange}
      isOpen={isOpen}
      handleOpen={handleClick}
      isLoading={false}
      size="small"
    />
  );
};
