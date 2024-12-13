import { useCallback } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useNodeSort } from './useNodeSort';
import { useNodeListLayout } from './useNodeListLayout';
import IconSortAsc from '@public/assets/icons/common/SortAsc.svg';
import IconSortDesc from '@public/assets/icons/common/SortDesc.svg';
import IconEyeClosed from '@public/assets/icons/common/EyeClosed.svg';
import IconMoveStart from '@public/assets/icons/common/MoveStart.svg';
import IconMoveLeft from '@public/assets/icons/common/MoveLeft.svg';
import IconMoveRight from '@public/assets/icons/common/MoveRight.svg';
import IconMoveEnd from '@public/assets/icons/common/MoveEnd.svg';

export const useNodeListContext = () => {
  const { updateColumnVisibility, updatePosition } = useNodeListLayout();
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

  const handleMove = useCallback(
    (key?: string, direction?: TableHeaderMoveAction) => {
      updatePosition(key, direction);
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
      id: 'move_to_start',
      icon: <IconMoveStart />,
      title: 'Move to start',
      onClick: (header?: TableHeader) => handleMove(header?.key, 'start'),
    },
    {
      id: 'move_to_left',
      icon: <IconMoveLeft />,
      title: 'Move to left',
      onClick: (header?: TableHeader) => handleMove(header?.key, 'left'),
    },
    {
      id: 'move_to_right',
      icon: <IconMoveRight />,
      title: 'Move to right',
      onClick: (header?: TableHeader) => handleMove(header?.key, 'right'),
    },
    {
      id: 'move_to_end',
      icon: <IconMoveEnd />,
      title: 'Move to end',
      onClick: (header?: TableHeader) => handleMove(header?.key, 'end'),
    },
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
