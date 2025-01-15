import { useEffect, useMemo, useState } from 'react';
import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { withSearchDropdown, Dropdown, sort } from '@shared/components';
import { styles } from './AdminDetailEditOrgSelect.styles';

export const AdminDetailEditOrgSelect = ({
  editSettings,
  onChange,
}: AdminDetailEditControlProps) => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Org>();

  useEffect(() => {
    (async () => {
      const response = await organizationClient.listOrganizations(
        {
          currentPage: 0,
          itemsPerPage: 1000,
        },
        undefined,
        undefined,
        true,
        false,
      );

      setOrgs(sort(response.orgs, { field: 'name' }));
      setSelectedOrg(
        response.orgs.find((org) => org.orgId === editSettings.defaultValue),
      );
      console.log('orgs', response.orgs);
      setIsLoading(false);
    })();
  }, []);

  const handleChange = (org: Org | null) => {
    onChange(editSettings.field, org?.orgId!);
    setSelectedOrg(org!);
  };

  const handleOpen = (open: boolean = true) => {
    setIsOpen(open);
  };

  const OrgSelectDropdown = useMemo(
    () => withSearchDropdown<Org>(Dropdown),
    [orgs],
  );

  return (
    <OrgSelectDropdown
      items={orgs}
      idKey="orgId"
      noBottomMargin
      renderItem={(item: Org) => (
        <>
          <span css={styles.name}>{item.name}</span>{' '}
          <em css={styles.id}>{item.orgId}</em>
        </>
      )}
      renderButtonText={
        <p css={styles.buttonText}>
          {selectedOrg?.name} (<span>{selectedOrg?.orgId})</span>
        </p>
      }
      selectedItem={selectedOrg!}
      handleSelected={handleChange}
      defaultText={selectedOrg?.name}
      isOpen={isOpen}
      excludeSelectedItem
      handleOpen={handleOpen}
      isLoading={isLoading}
      size="small"
    />
  );
};
