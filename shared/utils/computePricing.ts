interface IComputePricing {
  subtotal: number;
  total: number;
  discount: number;
  discountPercentage: number;
}

export const computePricing = (
  itemPrice: any | null,
  promoCode: any | null,
): IComputePricing => {
  const subtotal = itemPrice?.price ?? 0;
  let total = subtotal ?? 0;
  let discount = 0;
  let discountPercentage = 0;

  if (promoCode) {
    switch (promoCode?.coupon?.discount_type) {
      case 'percentage':
        discountPercentage = promoCode?.coupon?.discount_percentage ?? 0;
        discount = (subtotal * discountPercentage) / 100;
        total = subtotal - discount;
        break;
      default:
        break;
    }
  }

  return {
    subtotal,
    total: total < 0 ? 0 : total,
    discount,
    discountPercentage,
  };
};
