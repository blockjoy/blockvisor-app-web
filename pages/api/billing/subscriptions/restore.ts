import { Subscription } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.subscription.remove_scheduled_cancellation(id);

const mappingCallback = (result: {
  subscription: Subscription;
}): Subscription => {
  return result.subscription;
};

const handler = createHandler<
  { id: string },
  { subscription: Subscription },
  Subscription
>(requestCallback, mappingCallback);

export default handler;
