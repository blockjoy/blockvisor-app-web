import { Filtering } from '@shared/components/Filtering/Filtering';
import { Pagination } from '../../Pagination/Pagination';
import { TableEmpty } from '../TableEmpty';

export const withPagination = (Component: any) => {
  const WithPagination = ({ ...props }: any) => {
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

  WithPagination.displayName = `WithPagination(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithPagination;
};
