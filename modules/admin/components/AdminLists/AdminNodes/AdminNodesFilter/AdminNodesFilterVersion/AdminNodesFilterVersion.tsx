import { useEffect, useState } from 'react';
import { sortVersionStringArray } from '@modules/admin/utils';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const AdminNodesFilterVersion = ({
  columnName,
  values,
  listAll,
  blockchains,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const protocolFilters = settingsColumns.find(
    (column) => column.name === 'protocolName',
  )?.filterSettings?.values;

  const selectedBlockchains = blockchains?.filter((b) =>
    protocolFilters?.some((bf) => bf === b.id),
  );

  const filteredVersions: AdminFilterDropdownItem[] = Array.from(
    new Set(
      sortVersionStringArray(
        selectedBlockchains
          ?.flatMap(({ nodeTypes }) => nodeTypes)
          .flatMap(({ versions }) => versions)
          .map((version) => version.version),
      ),
    ),
  )
    .filter((version) =>
      (listAll as Node[])?.some(
        (item) =>
          item.semanticVersion === version &&
          selectedBlockchains?.some(
            (blockain) => blockain.id === item.protocolId,
          ),
      ),
    )
    .map((version) => ({
      id: version,
      name: version,
    }));

  useEffect(() => {
    const versions = Array.from(
      new Set(
        sortVersionStringArray(
          listAll?.filter((node) => node.version).map((node) => node.version),
        ),
      ),
    );
    setList(
      versions?.map((version) => ({
        id: version,
        name: version,
      })),
    );
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={filteredVersions?.length ? filteredVersions : list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
