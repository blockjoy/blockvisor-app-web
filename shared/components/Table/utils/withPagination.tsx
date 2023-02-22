import { Pagination } from '../../Pagination/Pagination';

export const withPagination = (Component: any) => {
  const WithPagination = ({ ...props }: any) => {
    const { properties, onTableChange, total } = props;

    const totalPages = Math.ceil(total / properties.pagination.itemsPerPage);

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

    return (
      <>
        <Component {...props} handleSort={handleSort} />
        <Pagination
          onPageClicked={handlePagination}
          totalPages={totalPages}
          currentPage={properties.pagination.currentPage}
        />
      </>
    );
  };

  WithPagination.displayName = `WithPagination(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithPagination;
};
