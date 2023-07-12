import { _payment_intent, _payment_source } from 'chargebee-typescript';
import { Customer, PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _payment_source.create_using_payment_intent_params;
}) => chargebee.payment_source.create_using_payment_intent(params);

const mappingCallback = (result: {
  payment_source: PaymentSource;
  customer: Customer;
}): { paymentSource: PaymentSource; customer: Customer } => {
  const paymentSource = result.payment_source as PaymentSource;
  const customer = result.customer as Customer;

  return { paymentSource, customer };
};

const handler = createHandler<
  { params: _payment_source.create_using_payment_intent_params },
  { payment_source: PaymentSource; customer: Customer },
  { paymentSource: PaymentSource; customer: Customer }
>(requestCallback, mappingCallback);

export default handler;
