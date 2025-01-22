import { useEffect, useState } from 'react';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { unique } from '@shared/index';
import { sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';

export const AdminNodesFilterOrg = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps<Node>) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const protocolFilters = settingsColumns.find(
    (column) => column.name === 'protocolName',
  )?.filterSettings?.values;

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = listAll
      ?.filter(
        (node) =>
          !protocolFilters?.length ||
          protocolFilters?.includes(node.protocolId),
      )
      ?.map(({ orgId, orgName }) => ({
        id: orgId,
        name: orgName,
      }))
      ?.filter((org) => org.name !== 'Personal');
    setList(sort(unique(all!, 'id'), { field: 'name' }));
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
