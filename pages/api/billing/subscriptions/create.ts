import { _subscription } from 'chargebee-typescript';
import { Card, Subscription } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  id,
  params,
}: {
  id: string;
  params: _subscription.create_with_items_params;
}) => chargebee.subscription.create_with_items(id, params);

const mappingCallback = (result: {
  subscription: Subscription;
  card: Card;
}): Subscription | null => {
  const subscription = result.subscription as Subscription;

  let resultSubscription = subscription;

  if (!subscription.payment_source_id) {
    const card = result.card as Card;

    resultSubscription = {
      ...subscription,
      payment_source_id: card.payment_source_id ?? null,
    } as Subscription;
  }

  return resultSubscription;
};

const handler = createHandler<
  { id: string; params: _subscription.create_with_items_params },
  { subscription: Subscription; card: Card },
  Subscription | null
>(requestCallback, mappingCallback);

export default handler;
