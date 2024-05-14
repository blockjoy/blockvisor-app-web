import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterOrg = ({
  columnName,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<Org[]>();

  const getList = async () => {
    const response = await organizationClient.listOrganizations(
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
      columnName={columnName}
      items={
        list?.map((item) => ({
          id: item.id,
          name: item.name,
        }))!
      }
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
