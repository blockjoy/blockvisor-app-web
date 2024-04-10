import { useEffect } from 'react';
import { getHandlerTableChange, Pagination } from '@shared/components';

export const withPagination = (Component: any) => {
  return ({ setQueryParams, queryParams, total, ...props }: any) => {
    const totalPages = Math.ceil(total / queryParams.pagination.itemsPerPage);

    const handlePagination = (index: number) => {
      const updatedQueryParams = {
        ...queryParams,
        pagination: {
          ...queryParams.pagination,
          currentPage: index,
        },
      };
      getHandlerTableChange(setQueryParams)('pagination', updatedQueryParams);
    };

    useEffect(() => {
      const { currentPage, itemsPerPage } = queryParams.pagination;
      const pageCount = Math.ceil(total / itemsPerPage);
      if (currentPage > pageCount) {
        const updatedQueryParams = {
          ...queryParams,
          pagination: { ...queryParams.pagination, currentPage: 1 },
        };
        getHandlerTableChange(setQueryParams)('pagination', updatedQueryParams);
      }
    }, [total, queryParams.pagination, setQueryParams]);

    return (
      <>
        <Component {...props} queryParams={queryParams} />
        {totalPages > 1 && (
          <Pagination
            onPageClicked={handlePagination}
            totalPages={totalPages}
            currentPage={queryParams.pagination.currentPage}
          />
        )}
      </>
    );
  };
};
