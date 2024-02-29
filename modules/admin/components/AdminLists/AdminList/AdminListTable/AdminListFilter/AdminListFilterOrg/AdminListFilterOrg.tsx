import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterOrg = ({ values, onChange }: Props) => {
  const [list, setList] = useState<Org[]>();

  const getList = async () => {
    const response = await organizationClient.getOrganizations(
      undefined,
      undefined,
      undefined,
      true,
      false,
    );
    setList(response.orgs);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  return (
    <AdminListFilterControl
      items={
        list?.map((item) => ({
          id: item.id,
          name: item.name,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
