import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { useRecoilValue } from 'recoil';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { convertNodeTypeToName } from '@modules/node';
import { capitalize } from 'utils/capitalize';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const AdminNodesFilterNodeType = ({
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

  const filteredNodeTypes: AdminFilterDropdownItem[] = Array.from(
    new Set(
      selectedBlockchains
        ?.flatMap(({ nodeTypes }) => nodeTypes)
        .map((nodeType) => +nodeType.nodeType),
    ),
  )
    .filter((nodeType) =>
      (listAll as Node[])?.some(
        (item) =>
          item.nodeType === nodeType &&
          selectedBlockchains?.some(
            (blockain) => blockain.id === item.blockchainId,
          ),
      ),
    )
    .map((nodeType) => ({
      id: nodeType?.toString(),
      name: capitalize(convertNodeTypeToName(nodeType)),
    }));

  useEffect(() => {
    const nodeTypes = Array.from(
      new Set(listAll?.map((node) => +node.nodeType)),
    );

    const nodeTypesMapped = nodeTypes.map((nodeType) => ({
      id: nodeType?.toString(),
      name: capitalize(convertNodeTypeToName(nodeType)),
    }));

    setList(nodeTypesMapped);
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={sort(filteredNodeTypes?.length ? filteredNodeTypes : list, {
        field: 'name',
      })}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
