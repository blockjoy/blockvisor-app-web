import { useCallback } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useNodeSort } from './useNodeSort';
import { useNodeListLayout } from './useNodeListLayout';
import IconSortAsc from '@public/assets/icons/common/SortAsc.svg';
import IconSortDesc from '@public/assets/icons/common/SortDesc.svg';
import IconEyeClosed from '@public/assets/icons/common/EyeClosed.svg';

export const useNodeListContext = () => {
  const { updateColumnVisibility } = useNodeListLayout();
  const { updateSorting } = useNodeSort();

  const handleSort = useCallback(
    (header?: TableHeader, order?: SortOrder) => {
      if (!header?.dataField) return;
      updateSorting(header.dataField, order);
    },
    [updateSorting],
  );

  const handleHideColumn = useCallback(
    (header?: TableHeader) => {
      if (!header?.key) return;
      updateColumnVisibility(header.key);
    },
    [updateColumnVisibility],
  );

  const sortItems: TableContextItem[] = [
    {
      id: 'sort_asc',
      icon: <IconSortAsc />,
      title: 'Sort Asc',
      onClick: (header?: TableHeader) =>
        handleSort(header, SortOrder.SORT_ORDER_ASCENDING),
    },
    {
      id: 'sort_desc',
      icon: <IconSortDesc />,
      title: 'Sort Desc',
      onClick: (header?: TableHeader) =>
        handleSort(header, SortOrder.SORT_ORDER_DESCENDING),
    },
  ];

  const layoutItems: TableContextItem[] = [
    {
      id: 'hide',
      icon: <IconEyeClosed />,
      title: 'Hide column',
      onClick: (header?: TableHeader) => handleHideColumn(header),
    },
  ];

  const items: TableContextGroup[] = [
    {
      title: 'Sort',
      items: sortItems,
    },
    {
      title: 'Layout',
      items: layoutItems,
    },
  ];

  return {
    items,
  };
};
