import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { useRecoilValue } from 'recoil';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const AdminNodesFilterNetwork = ({
  columnName,
  values,
  listAll,
  blockchains,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const blockchainFilters = settingsColumns.find(
    (column) => column.name === 'blockchainName',
  )?.filterSettings?.values;

  const selectedBlockchains = blockchains?.filter((b) =>
    blockchainFilters?.some((blockchainFilter) => blockchainFilter === b.id),
  );

  const filteredNetworks: AdminFilterDropdownItem[] = Array.from(
    new Set(
      sort(
        selectedBlockchains
          ?.flatMap(({ nodeTypes }) => nodeTypes)
          .flatMap(({ versions }) => versions)
          .flatMap(({ networks }) => networks)
          .map(({ name }) => name),
      ),
    ),
  )
    .filter((network) =>
      (listAll as Node[])?.some(
        (item) =>
          item.network === network &&
          selectedBlockchains?.some(
            (blockain) => blockain.id === item.blockchainId,
          ),
      ),
    )
    .map((network) => ({
      id: network,
      name: network,
    }));

  useEffect(() => {
    const networks = Array.from(
      new Set(sort(listAll?.map((node) => node.network))),
    );

    const networksMapped = networks.map((network) => ({
      id: network,
      name: network,
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
