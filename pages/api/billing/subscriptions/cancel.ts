import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  id,
  params,
}: {
  id: string;
  params: _subscription.cancel_for_items_params;
}) => chargebee.subscription.cancel_for_items(id, params);

const mappingCallback = (result: {
  subscription: Subscription;
}): Subscription => {
  return result.subscription;
};

const handler = createHandler<
  { id: string; params: _subscription.cancel_for_items_params },
  { subscription: Subscription },
  Subscription
>(requestCallback, mappingCallback);

export default handler;
