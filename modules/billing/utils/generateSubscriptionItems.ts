import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import { UpdateSubscriptionAction } from '@modules/billing';

export const generateSubscriptionItems = (
  type: UpdateSubscriptionAction,
  payload: {
    subscription: Subscription | null;
    itemPriceID: string;
  },
) => {
  const { subscription, itemPriceID } = payload;

  const subscriptionItem = subscription?.subscription_items?.find(
    (subItem: SubscriptionItem) => subItem.item_price_id === itemPriceID,
  );

  const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
    [];
  let newSubscriptionItem: _subscription.subscription_items_update_for_items_params;

  switch (type) {
    case UpdateSubscriptionAction.ADD_NODE:
    case UpdateSubscriptionAction.ADD_HOST:
      newSubscriptionItem = {
        item_price_id: itemPriceID,
        quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
      };

      subscriptionItems?.push(newSubscriptionItem!);

      break;
    case UpdateSubscriptionAction.REMOVE_NODE:
    case UpdateSubscriptionAction.REMOVE_HOST:
      if (subscriptionItem?.quantity! > 1) {
        newSubscriptionItem = {
          item_price_id: itemPriceID,
          quantity: subscriptionItem?.quantity! - 1,
        };

        subscriptionItems?.push(newSubscriptionItem!);
      } else {
        subscriptionItems.push(
          ...subscription?.subscription_items?.filter(
            (subItem) =>
              subItem.item_price_id !== subscriptionItem?.item_price_id!,
          )!,
        );
      }

      break;
    default:
      break;
  }

  return subscriptionItems;
};
