import { useMemo } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { Sorting, SortingItem } from '@shared/components';
import { InitialQueryParams, useNodeUIContext } from '@modules/node';

const items: SortingItem<NodeSortField>[] = [
  {
    id: 'name-asc',
    name: 'Name: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'name-desc',
    name: 'Name: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-desc',
    name: 'Newest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-asc',
    name: 'Oldest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-asc',
    name: 'Status: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-desc',
    name: 'Status: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];

export const NodeSorting = () => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const handleSelect = (item: SortingItem<NodeSortField> | null) => {
    if (!item?.field) return;

    const newQueryParams: InitialQueryParams = {
      ...nodeUIProps.queryParams,

      sort: [{ field: item?.field, order: item?.order! }],
    };

    nodeUIProps.setQueryParams(newQueryParams);
  };

  const selectedItem =
    items.find(
      (item) =>
        item.field === nodeUIProps.queryParams?.sort?.[0].field &&
        item.order === nodeUIProps.queryParams?.sort?.[0].order,
    ) ?? items[0];

  return (
    <Sorting<NodeSortField>
      items={items}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
    />
  );
};
