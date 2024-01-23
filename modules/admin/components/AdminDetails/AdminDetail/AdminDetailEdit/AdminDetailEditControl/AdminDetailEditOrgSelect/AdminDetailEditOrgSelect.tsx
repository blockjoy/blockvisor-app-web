import { useEffect, useMemo, useState } from 'react';
import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { withSearchDropdown, Dropdown, sort } from '@shared/components';

type Props = {
  editSettings: AdminDetailEditSettings;
  onChange: (field: string, value: string) => void;
};

export const AdminDetailEditOrgSelect = ({ editSettings, onChange }: Props) => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Org>();

  useEffect(() => {
    (async () => {
      const response = await organizationClient.getOrganizations(
        {
          current_page: 0,
          items_per_page: 1000,
        },
        undefined,
        undefined,
        true,
      );

      setOrgs(sort(response.orgs, { field: 'name', order: 'asc' }));
      setSelectedOrg(
        response.orgs.find((org) => org.id === editSettings.defaultValue),
      );
      setIsLoading(false);
    })();
  }, []);

  const handleChange = (org: Org | null) => {
    onChange(editSettings.field, org?.id!);
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
      noBottomMargin
      selectedItem={selectedOrg!}
      handleSelected={handleChange}
      defaultText={selectedOrg?.name}
      isOpen={isOpen}
      handleOpen={handleOpen}
      isLoading={isLoading}
      size="small"
    />
  );
};
