import { LineItemDiscount } from '@modules/grpc/library/blockjoy/v1/org';

export const calcDiscount = (discountAmounts: LineItemDiscount[]) =>
  discountAmounts?.reduce(
    (discountAcc: number, discountItem) =>
      discountAcc + (discountItem.amount?.value ?? 0),
    0,
  );
