import { Filtering } from '@shared/components';
import { ComponentType } from 'react';

export const withFilter = (Component: ComponentType) => {
  return ({ setQueryParams, queryParams, filters, ...props }: any) => {
    const handleFilter = (key: string, value: any) => {
      const updatedQueryParams = {
        ...queryParams,
        filter: {
          ...queryParams.filter,
          [key]: {
            ...queryParams.filter[key],
            value,
          },
        },
      };
      setQueryParams('filter', updatedQueryParams);
    };

    return (
      <>
        <Filtering
          filters={filters}
          values={queryParams.filter}
          onFilterChange={handleFilter}
        />
        <Component {...props} queryParams={queryParams} />
      </>
    );
  };
};
