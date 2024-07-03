export const calcDiscount = (discountAmounts: any) =>
  discountAmounts?.reduce(
    (discountAcc: number, discountItem: any) =>
      discountAcc + discountItem?.amount,
    0,
  );
