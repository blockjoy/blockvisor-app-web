import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription, Card } from 'chargebee-typescript/lib/resources';
import { _subscription } from 'chargebee-typescript';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  id,
  params,
}: {
  id: string;
  params: _subscription.update_for_items_params;
}) => chargebee.subscription.update_for_items(id, params);

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
      payment_source_id: card.payment_source_id!,
    } as Subscription;
  }

  return resultSubscription;
};

const handler = createHandler<
  { id: string; params: _subscription.update_for_items_params },
  { subscription: Subscription; card: Card },
  Subscription | null
>(requestCallback, mappingCallback);

export default handler;
