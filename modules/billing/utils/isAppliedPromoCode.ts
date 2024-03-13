import {
  Coupon,
  Subscription,
  SubscriptionCoupon,
} from 'chargebee-typescript/lib/resources';
import { ItemConstraint } from 'chargebee-typescript/lib/resources/coupon';

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

export const isApplicablePromoCode = (
  sku: string,
  coupon: Coupon | null,
): boolean => {
  if (!sku || !coupon) return false;

  const addonConstraint = coupon?.item_constraints?.find(
    (itemConstraint: ItemConstraint) => itemConstraint.item_type === 'addon',
  );
  if (!addonConstraint || addonConstraint.constraint === 'all') return true;

  const isApplicable = addonConstraint.item_price_ids.some(
    (itemPriceId: string) => itemPriceId.startsWith(sku),
  );

  return isApplicable || false;
};
