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
  protocols,
  onFilterChange,
}: AdminFilterControlProps<Node>) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const protocolFilters = settingsColumns.find(
    (column) => column.name === 'protocolName',
  )?.filterSettings?.values;

  const selectedProtocols = protocols?.filter((b) =>
    protocolFilters?.some((p) => p === b.protocolId),
  );

  const filteredVersions: AdminFilterDropdownItem[] = Array.from(
    new Set(
      sortVersionStringArray(
        listAll
          ?.filter((node) =>
            selectedProtocols?.some((p) => p.protocolId === node.protocolId),
          )
          ?.map((n) => n.semanticVersion),
      ),
    ),
  ).map((version) => ({
    id: version,
    name: version,
  }));

  useEffect(() => {
    const versions = Array.from(
      new Set(
        sortVersionStringArray(listAll?.map((node) => node.semanticVersion)),
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
      protocols={protocols}
      columnName={columnName}
      items={filteredVersions?.length ? filteredVersions : list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
