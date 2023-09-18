import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';

export const generateUpdateSubscriptionParams = async (
  subscription: Subscription,
  subscriptionParams: {
    autoRenew: boolean;
    periodUnit: string;
  },
): Promise<_subscription.update_for_items_params> => {
  const { autoRenew, periodUnit } = subscriptionParams;

  const params: _subscription.update_for_items_params = {};

  params.auto_collection = autoRenew ? 'on' : 'off';

  if (periodUnit === 'year' && subscription?.billing_period_unit !== 'year') {
    const updatedSubscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      subscription?.subscription_items?.map((item: SubscriptionItem) => ({
        item_price_id: item.item_price_id.replace(/-M$/, '-Y'),
        quantity: item.quantity,
      })) || [];

    params.subscription_items = updatedSubscriptionItems;
    params.replace_items_list = true;
  }

  return params;
};
