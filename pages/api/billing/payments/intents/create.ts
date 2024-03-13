import { _payment_intent } from 'chargebee-typescript';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _payment_intent.create_params;
}) => chargebee.payment_intent.create(params);

const mappingCallback = (result: {
  payment_intent: PaymentIntent;
}): PaymentIntent => {
  const paymentIntent = result.payment_intent as PaymentIntent;

  return paymentIntent;
};

const handler = createHandler<
  { params: _payment_intent.create_params },
  { payment_intent: PaymentIntent },
  PaymentIntent
>(requestCallback, mappingCallback);

export default handler;
