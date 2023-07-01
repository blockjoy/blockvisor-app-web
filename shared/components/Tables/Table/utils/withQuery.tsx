import { Filtering, Pagination } from '@shared/components';
import { useEffect } from 'react';
import { TableEmpty } from '../TableEmpty';

export const withQuery = (Component: any) => {
  const withQuery = ({ ...props }: any) => {
    const { properties, filters, onTableChange, total } = props;

    const totalPages = Math.ceil(total / properties.pagination.itemsPerPage);

    const isPagination = Object.keys(properties).includes('pagination');
    const isFiltering = Object.keys(properties).includes('filtering');

    const handlePagination = (index: number) => {
      const updatedProperties = {
        ...properties,
        pagination: {
          ...properties.pagination,
          currentPage: index,
        },
      };

      onTableChange('pagination', updatedProperties);
    };

    const handleSort = (key: string) => {
      const updatedProperties = {
        ...properties,
        sorting: {
          ...properties.sorting,
          order: properties.sorting.order === 'desc' ? 'asc' : 'desc',
          field: key,
        },
      };

      onTableChange('sort', updatedProperties);
    };

    const handleFilter = (key: string, value: string) => {
      const updatedProperties = {
        ...properties,
        filtering: {
          ...properties.filtering,
          [key]: {
            ...properties.filtering[key],
            value,
          },
        },
      };

      onTableChange('filter', updatedProperties);
    };

    // check if currentPage needs to change
    useEffect(() => {
      const { currentPage, itemsPerPage } = properties.pagination;
      const pageCount = Math.ceil(total / itemsPerPage!);

      if (currentPage! > pageCount) {
        onTableChange('pagination', {
          ...properties,
          pagination: {
            ...properties.pagination,
            currentPage: 1,
          },
        });
      }
    }, [total]);

    return (
      <>
        {isFiltering && (
          <Filtering
            filters={filters}
            values={properties.filtering}
            onFilterChange={handleFilter}
          />
        )}
        <>
          {total > 0 ? (
            <Component {...props} handleSort={handleSort} />
          ) : (
            <TableEmpty />
          )}
        </>
        {isPagination && totalPages > 1 && (
          <Pagination
            onPageClicked={handlePagination}
            totalPages={totalPages}
            currentPage={properties.pagination.currentPage}
          />
        )}
      </>
    );
  };

  withQuery.displayName = `withQuery(${
    Component.displayName || Component.name || 'Component'
  })`;

  return withQuery;
};
