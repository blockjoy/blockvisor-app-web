import { _customer } from 'chargebee-typescript';
import { Coupon } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.coupon.retrieve(id);

const mappingCallback = (result: { coupon: Coupon }): Coupon | null => {
  const coupon = result.coupon as Coupon;

  return coupon;
};

const handler = createHandler<
  { id: string },
  { coupon: Coupon },
  Coupon | null
>(requestCallback, mappingCallback);

export default handler;
