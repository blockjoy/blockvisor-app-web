import { ComponentType } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { getHandlerTableChange } from '@shared/components';

export const withSort = (Component: ComponentType) => {
  return ({ setQueryParams, queryParams, ...props }: any) => {
    const handleSort = (key: any) => {
      const updateSorting = () => {
        const sortingMatch = queryParams?.sort?.find(
          (singleSort: any) => singleSort.field === key,
        );

        const sortOrder =
          sortingMatch?.order === SortOrder.SORT_ORDER_DESCENDING ||
          key !== queryParams?.sort?.[0].field
            ? SortOrder.SORT_ORDER_ASCENDING
            : SortOrder.SORT_ORDER_DESCENDING;

        return [
          {
            field: key,
            order: sortOrder,
          },
        ];
      };

      const updatedProperties = {
        ...queryParams,
        sort: updateSorting(),
      };

      getHandlerTableChange(setQueryParams)('sort', updatedProperties);
    };

    return (
      <Component {...props} handleSort={handleSort} queryParams={queryParams} />
    );
  };
};
