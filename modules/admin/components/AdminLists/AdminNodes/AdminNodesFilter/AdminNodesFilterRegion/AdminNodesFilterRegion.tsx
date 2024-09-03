import { useEffect, useState } from 'react';
import { sort } from '@shared/components';
import { AdminListFilterControl } from '@modules/admin';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';

export const AdminNodesFilterRegion = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  useEffect(() => {
    const regions = Array.from(
      new Set(
        sort(
          listAll
            ?.filter((node) => node.placement?.scheduler?.region)
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
