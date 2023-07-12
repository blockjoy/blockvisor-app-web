import { Subscription, Card } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.subscription.retrieve(id);

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
  { id: string },
  { subscription: Subscription; card: Card },
  Subscription | null
>(requestCallback, mappingCallback);

export default handler;
