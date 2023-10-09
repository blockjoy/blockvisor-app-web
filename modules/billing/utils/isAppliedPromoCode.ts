import {
  Subscription,
  SubscriptionCoupon,
} from 'chargebee-typescript/lib/resources';

export const isAppliedPromoCode = (
  subscription: Subscription | null,
  promoCode: string,
): boolean => {
  if (!subscription || !subscription.coupons) return false;

  return subscription.coupons.some(
    (coupon: SubscriptionCoupon) =>
      coupon.coupon_id?.toLocaleLowerCase() === promoCode.toLocaleLowerCase(),
  );
};
