import { _subscription } from 'chargebee-typescript';
import { ItemPrice, Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';

export const generateUpdateSubscriptionParams = async (
  subscription: Subscription,
  subscriptionParams: {
    autoRenew: boolean;
    periodUnit: string;
    itemPrices: ItemPrice[];
  },
): Promise<_subscription.update_for_items_params> => {
  const { autoRenew, periodUnit, itemPrices } = subscriptionParams;

  const params: _subscription.update_for_items_params = {};

  params.auto_collection = autoRenew ? 'on' : 'off';

  if (periodUnit === 'year' && subscription?.billing_period_unit !== 'year') {
    const activeItemPrice = itemPrices.find(
      (itemPrice: ItemPrice) =>
        itemPrice.period_unit === subscription?.billing_period_unit,
    );
    const newItemPrice = itemPrices.find(
      (itemPrice: ItemPrice) =>
        itemPrice.period_unit !== subscription?.billing_period_unit,
    );

    const updatedSubscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      subscription?.subscription_items?.filter(
        (subscriptionItem: SubscriptionItem) =>
          subscriptionItem.item_price_id !== activeItemPrice?.id,
      ) ?? [];

    const yearlySubscriptionItem: _subscription.subscription_items_update_for_items_params =
      {
        item_price_id: newItemPrice?.id!,
        quantity: 1,
      };

    updatedSubscriptionItems.push(yearlySubscriptionItem);

    params.subscription_items = updatedSubscriptionItems;
    params.replace_items_list = true;
  }

  return params;
};
