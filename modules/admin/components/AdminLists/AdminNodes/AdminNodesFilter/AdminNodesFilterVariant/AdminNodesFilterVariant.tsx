import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { useRecoilValue } from 'recoil';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ProtocolVersionKey } from '@modules/grpc/library/blockjoy/common/v1/protocol';

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

  const filteredNetworks: AdminFilterDropdownItem[] = Array.from(
    new Set(sort(listAll?.map(({ versionKey }) => versionKey?.variantKey))),
  )
    .filter(
      (item) =>
        !selectedProtocols?.length ||
        selectedProtocols?.some((p) => p.protocolId === item.protocolId),
    )
    .map((variantKey) => ({
      id: variantKey,
      name: variantKey,
    }));

  useEffect(() => {
    const all: ProtocolVersionKey[] = Array.from(
      new Set(sort(listAll?.map((node) => node.versionKey?.variantKey))),
    );

    const networksMapped = all.map((versionKey) => ({
      id: versionKey.protocolKey,
      name: versionKey.variantKey,
    }));

    setList(networksMapped);
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={filteredNetworks?.length ? filteredNetworks : list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
