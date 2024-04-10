import { ComponentType } from 'react';
import { TableProps } from '../Table';
import { withFilter } from './withFilter';
import { withPagination } from './withPagination';
import { withSort } from './withSort';

export const withQuery =
  (
    options: {
      sort?: boolean;
      filter?: boolean;
      pagination?: boolean;
    } = { sort: false, filter: false, pagination: false },
  ) =>
  (Component: ComponentType<TableProps>) => {
    let WrappedComponent: any = Component;

    if (options.sort) WrappedComponent = withSort(WrappedComponent);
    if (options.filter) WrappedComponent = withFilter(WrappedComponent);
    if (options.pagination) WrappedComponent = withPagination(WrappedComponent);

    return (props: any) => <WrappedComponent {...props} />;
  };
