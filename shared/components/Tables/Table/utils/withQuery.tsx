import { ComponentType } from 'react';
import { BaseQueryParams } from '@shared/common/common';
import { withPagination } from './withPagination';
import { withSort } from './withSort';

export const withQuery =
  <T extends BaseQueryParams>(
    options: {
      sort?: boolean;
      filter?: boolean;
      pagination?: boolean;
    } = { sort: false, filter: false, pagination: false },
  ) =>
  (Component: ComponentType<TableProps<T>>) => {
    let WrappedComponent: any = Component;

    if (options.sort) WrappedComponent = withSort<T>(WrappedComponent);
    if (options.pagination)
      WrappedComponent = withPagination<T>(WrappedComponent);

    return (props: TableProps<T>) => <WrappedComponent {...props} />;
  };
