import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { sort } from '@shared/components';
import { capitalized } from './capitalized';

export const createDropdownValuesFromEnum = (
  enumList: any,
  prefix: string,
): AdminFilterDropdownItem[] => {
  const items = sort(
    Object.entries(enumList)
      .filter((f) => +f[0] > 0)
      .map(([id, name]) => ({
        id: id?.toString(),
        name: capitalized(
          String(name).toString().replace(prefix, '').toLocaleLowerCase(),
        ),
      })),
    {
      field: 'name',
      order: SortOrder.SORT_ORDER_ASCENDING,
    },
  );
  return items;
};
