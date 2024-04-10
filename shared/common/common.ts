import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

export type Sort<OrderType = string> = {
  order: SortOrder;
  field: OrderType;
};
