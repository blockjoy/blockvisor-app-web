import { ComponentType, useEffect } from 'react';
import { Pagination } from '@shared/components';
import { BaseQueryParams } from '@shared/common/common';

export const withPagination = <T extends BaseQueryParams>(
  Component: ComponentType<TableProps<T>>,
) => {
  return ({
    setQueryParams,
    queryParams,
    total = 1,
    ...props
  }: TableProps<T>) => {
    const totalPages = Math.ceil(total / queryParams?.pagination.itemsPerPage!);

    const handlePagination = (index: number) => {
      const updatedQueryParams = {
        ...queryParams,
        pagination: {
          ...queryParams?.pagination,
          currentPage: index,
        },
      };
      setQueryParams?.(updatedQueryParams as T);
    };

    useEffect(() => {
      const { currentPage, itemsPerPage } = queryParams?.pagination!;
      const pageCount = Math.ceil(total / itemsPerPage);
      if (currentPage > pageCount) {
        const updatedQueryParams = {
          ...queryParams,
          pagination: { ...queryParams?.pagination, currentPage: 1 },
        };
        setQueryParams?.(updatedQueryParams as T);
      }
    }, [total, queryParams?.pagination, setQueryParams]);

    return (
      <>
        <Component {...props} queryParams={queryParams} />
        {totalPages > 1 && (
          <Pagination
            onPageClicked={handlePagination}
            totalPages={totalPages}
            currentPage={queryParams?.pagination.currentPage ?? 1}
          />
        )}
      </>
    );
  };
};
