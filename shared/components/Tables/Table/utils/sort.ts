import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Sort } from '@shared/common/common';

export const sort = <T = any>(items: T[], sort?: Sort<keyof T>): T[] => {
  return [...items].sort((a, b) => {
    let aField = String(a[sort?.field!] || a);
    let bField = String(b[sort?.field!] || b);

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
