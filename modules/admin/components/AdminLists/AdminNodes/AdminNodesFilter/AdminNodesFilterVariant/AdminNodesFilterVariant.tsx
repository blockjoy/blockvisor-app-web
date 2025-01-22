import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { useRecoilValue } from 'recoil';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { unique } from '@shared/index';

export const AdminNodesFilterVariant = ({
  columnName,
  values,
  listAll,
  protocols,
  onFilterChange,
}: AdminFilterControlProps<Node>) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const protocolFilters = settingsColumns.find(
    (column) => column.name === 'protocolName',
  )?.filterSettings?.values;

  const selectedProtocols = protocols?.filter((p) =>
    protocolFilters?.some((protocolFilter) => protocolFilter === p.protocolId),
  );

  const filteredNetworks =
    listAll?.filter(
      (item) =>
        !selectedProtocols?.length ||
        selectedProtocols.some((p) => p.protocolId === item.protocolId),
    ) ?? [];

  const sortedNetworks = sort(
    unique(
      filteredNetworks.map(({ versionKey }) => ({
        id: versionKey?.variantKey,
        name: versionKey?.variantKey,
      })),
      'name',
    ),
    { field: 'name' },
  );

  useEffect(() => {
    const newList = sort(
      listAll?.map(({ versionKey }) => ({
        id: versionKey?.protocolKey,
        name: versionKey?.variantKey,
      })) ?? [],
      { field: 'name' },
    );

    setList(newList);
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={sortedNetworks?.length ? sortedNetworks : list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
