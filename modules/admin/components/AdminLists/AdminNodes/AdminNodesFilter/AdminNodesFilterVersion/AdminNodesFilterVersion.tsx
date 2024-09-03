import { useEffect, useState } from 'react';
import { sortVersionStringArray } from '@modules/admin/utils';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';
import { sort } from '@shared/components';

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

  const blockchainFilters = settingsColumns.find(
    (column) => column.name === 'blockchainName',
  )?.filterSettings?.values;

  const selectedBlockchains = blockchains?.filter((b) =>
    blockchainFilters?.some((bf) => bf === b.id),
  );

  const filteredVersions: AdminFilterDropdownItem[] = Array.from(
    new Set(
      sort(
        selectedBlockchains
          ?.flatMap(({ nodeTypes }) => nodeTypes)
          .flatMap(({ versions }) => versions),
      ),
    ),
  )
    .filter(({ version }) => list.some((item) => item.id === version))
    .map(({ version }) => ({
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
