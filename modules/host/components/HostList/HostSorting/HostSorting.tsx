import { useMemo } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import {
  getHandlerTableChange,
  Sorting,
  SortingItem,
} from '@shared/components';
import { InitialQueryParams, useHostUIContext } from '@modules/host';

export const HostSorting = () => {
  const items: SortingItem[] = useMemo(
    () => [
      {
        id: 'a-z',
        name: 'Host name (A-Z)',
        field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
        order: SortOrder.SORT_ORDER_ASCENDING,
      },
      {
        id: 'z-a',
        name: 'Host name (Z-A)',
        field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
        order: SortOrder.SORT_ORDER_DESCENDING,
      },
      {
        id: 'newest',
        name: 'Newest first',
        field: HostSortField.HOST_SORT_FIELD_CREATED_AT,
        order: SortOrder.SORT_ORDER_DESCENDING,
      },
      {
        id: 'oldest',
        name: 'Oldest first',
        field: HostSortField.HOST_SORT_FIELD_CREATED_AT,
        order: SortOrder.SORT_ORDER_ASCENDING,
      },
    ],
    [],
  );

  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      queryParams: hostUIContext.queryParams,
      setQueryParams: hostUIContext.setQueryParams,
    };
  }, [hostUIContext]);

  const handleSelect = (item: SortingItem | null) => {
    const newQueryParams: InitialQueryParams = {
      ...hostUIProps.queryParams,

      sort: [{ field: item?.field, order: item?.order! }],
    };

    getHandlerTableChange(hostUIProps.setQueryParams)('sort', newQueryParams);
  };

  const selectedItem =
    items.find(
      (item) =>
        item.field === hostUIProps.queryParams?.sort?.[0].field &&
        item.order === hostUIProps.queryParams?.sort?.[0].order,
    ) ?? items[0];

  return (
    <Sorting
      items={items}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
    />
  );
};
