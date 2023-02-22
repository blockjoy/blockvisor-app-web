import { InitialQueryParams } from '@modules/organization/ui/OrganizationsUIHelpers';

export function getHandlerTableChange(setQueryParams: any) {
  return (
    type: string,
    {
      pagination: { currentPage, itemsPerPage },
      sorting: { order, field },
    }: InitialQueryParams,
  ) => {
    setQueryParams((prev: InitialQueryParams) =>
      type === 'sort'
        ? {
            ...prev,
            sorting: {
              ...prev.sorting,
              field,
              order,
            },
            pagination: {
              ...prev.pagination,
              currentPage: 1,
            },
          }
        : type === 'pagination'
        ? {
            ...prev,
            pagination: {
              ...prev.pagination,
              currentPage,
              itemsPerPage,
            },
          }
        : prev,
    );
  };
}
