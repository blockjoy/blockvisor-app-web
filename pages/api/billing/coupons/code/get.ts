import { _customer } from 'chargebee-typescript';
import { CouponCode } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.coupon_code.retrieve(id);

const mappingCallback = (result: {
  coupon_code: CouponCode;
}): CouponCode | null => {
  const coupon_code = result.coupon_code as CouponCode;

  return coupon_code;
};

const handler = createHandler<
  { id: string },
  { coupon_code: CouponCode },
  CouponCode | null
>(requestCallback, mappingCallback);

export default handler;
