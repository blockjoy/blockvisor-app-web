import { Customer, PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.payment_source.delete(id);

const mappingCallback = (result: {
  payment_source: PaymentSource;
  customer: Customer;
}): { paymentSource: PaymentSource; customer: Customer } => {
  const paymentSource = result.payment_source as PaymentSource;
  const customer = result.customer as Customer;

  return { paymentSource, customer };
};

const handler = createHandler<
  { id: string },
  { payment_source: PaymentSource; customer: Customer },
  { paymentSource: PaymentSource; customer: Customer }
>(requestCallback, mappingCallback);

export default handler;
