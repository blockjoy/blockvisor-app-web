import { useMemo } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import {
  getHandlerTableChange,
  Sorting,
  SortingItem,
} from '@shared/components';
import { InitialQueryParams, useNodeUIContext } from '@modules/node';

export const NodeSorting = () => {
  const items: SortingItem[] = useMemo(
    () => [
      {
        id: 'a-z',
        name: 'Node name (A-Z)',
        field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
        order: SortOrder.SORT_ORDER_ASCENDING,
      },
      {
        id: 'z-a',
        name: 'Node name (Z-A)',
        field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
        order: SortOrder.SORT_ORDER_DESCENDING,
      },
      {
        id: 'newest',
        name: 'Newest first',
        field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
        order: SortOrder.SORT_ORDER_DESCENDING,
      },
      {
        id: 'oldest',
        name: 'Oldest first',
        field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
        order: SortOrder.SORT_ORDER_ASCENDING,
      },
    ],
    [],
  );

  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const handleSelect = (item: SortingItem | null) => {
    const newQueryParams: InitialQueryParams = {
      ...nodeUIProps.queryParams,

      sort: [{ field: item?.field, order: item?.order! }],
    };

    getHandlerTableChange(nodeUIProps.setQueryParams)('sort', newQueryParams);
  };

  const selectedItem =
    items.find(
      (item) =>
        item.field === nodeUIProps.queryParams?.sort?.[0].field &&
        item.order === nodeUIProps.queryParams?.sort?.[0].order,
    ) ?? items[0];

  return (
    <Sorting
      items={items}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
    />
  );
};
