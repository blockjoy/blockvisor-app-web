import { ComponentType } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { BaseQueryParams } from '@shared/common/common';

export const withSort = <T extends BaseQueryParams>(
  Component: ComponentType<TableProps<T>>,
) => {
  return ({ setQueryParams, queryParams, ...props }: TableProps<T>) => {
    const handleSort = (key: any) => {
      const updateSorting = () => {
        const sortingMatch = queryParams?.sort?.find(
          (singleSort) => singleSort.field === key,
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

      const updatedQueryParams = {
        ...queryParams,
        sort: updateSorting(),
      };

      setQueryParams?.(updatedQueryParams as T);
    };

    return (
      <Component
        {...(props as TableProps<T>)}
        handleSort={handleSort}
        queryParams={queryParams}
      />
    );
  };
};
