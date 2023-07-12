import { _payment_source } from 'chargebee-typescript';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.payment_source.retrieve(id);

const mappingCallback = (result: {
  payment_source: PaymentSource;
}): PaymentSource | null => {
  const paymentSource = result.payment_source as PaymentSource;

  return paymentSource;
};

const handler = createHandler<
  { id: string },
  { payment_source: PaymentSource },
  PaymentSource | null
>(requestCallback, mappingCallback);

export default handler;
