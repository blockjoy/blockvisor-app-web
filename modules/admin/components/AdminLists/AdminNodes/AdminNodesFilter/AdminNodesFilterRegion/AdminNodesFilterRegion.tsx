import { useEffect, useState } from 'react';
import { sort } from '@shared/components';
import { AdminListFilterControl, adminSelectors } from '@modules/admin';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';

export const AdminNodesFilterRegion = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const blockchainFilters = settingsColumns.find(
    (column) => column.name === 'blockchainName',
  )?.filterSettings?.values;

  useEffect(() => {
    const regions = Array.from(
      new Set(
        sort(
          listAll
            ?.filter(
              (node) =>
                node.placement?.scheduler?.region &&
                (!blockchainFilters?.length ||
                  blockchainFilters?.includes(node.blockchainId)),
            )
            .map((node) => node.placement?.scheduler?.region),
        ),
      ),
    );
    setList(
      regions?.map((region) => ({
        id: region,
        name: region,
      })),
    );
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
