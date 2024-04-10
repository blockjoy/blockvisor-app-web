import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

export const sort = (items: any, sort?: any) => {
  return [...items].sort((a: any, b: any) => {
    let aField = a[sort?.field!] || a;
    let bField = b[sort?.field!] || b;

    const sortOrder = sort?.order || SortOrder.SORT_ORDER_ASCENDING;

    if (typeof aField === 'string' && typeof bField === 'string') {
      aField = aField.toLowerCase();
      bField = bField.toLowerCase();

      return sortOrder === SortOrder.SORT_ORDER_ASCENDING
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    }

    return sortOrder === SortOrder.SORT_ORDER_ASCENDING
      ? aField > bField
        ? 1
        : -1
      : bField > aField
      ? 1
      : -1;
  });
};
