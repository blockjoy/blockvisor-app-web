import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  useItems,
  useSubscription,
  matchSKU,
  fetchBilling,
} from '@modules/billing';
import { _subscription } from 'chargebee-typescript';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainsAtoms } from '@modules/node';
import { Subscription } from 'chargebee-typescript/lib/resources';

export const useUpdateSubscription = (): IUpdateSubscriptionHook => {
  const setSubscription = useSetRecoilState(billingSelectors.subscription);

  const { provideSubscription } = useSubscription();
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { getItemPrices } = useItems();

  const blockchains = useRecoilValue(blockchainsAtoms.blockchains);

  const updateSubscriptionItems = async (action: {
    type: string;
    payload: { node?: Node };
  }) => {
    setSubscriptionLoadingState('initializing');
    const subscription = await provideSubscription();

    const { type, payload } = action;
    const { node } = payload;

    const params: _subscription.update_for_items_params = {};
    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    const blockchain = blockchains.find(
      (blockchain: Blockchain) => blockchain.id === node?.blockchainId,
    );

    const SKU = matchSKU(blockchain!, node!);

    const billingPeriod = subscription?.billing_period_unit;

    const itemPriceParams = {
      id: SKU,
      periodUnit: billingPeriod,
    };

    const itemPrice: any = await getItemPrices(itemPriceParams);
    const itemPriceID: string = itemPrice?.length ? itemPrice[0].id : null;

    const subscriptionItem: SubscriptionItem | undefined =
      subscription?.subscription_items?.find(
        (subItem: SubscriptionItem) => subItem.item_price_id === itemPriceID,
      );

    switch (type) {
      case 'create':
        let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
          {
            item_price_id: itemPriceID,
            quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
          };

        subscriptionItems?.push(newSubscriptionItem!);
        break;

      case 'delete':
        if (subscriptionItem?.quantity! > 1) {
          let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
            {
              item_price_id: itemPriceID,
              quantity: subscriptionItem?.quantity! - 1,
            };

          subscriptionItems?.push(newSubscriptionItem!);
        } else {
          subscriptionItems.push(
            ...subscription?.subscription_items?.filter(
              (
                subItem: _subscription.subscription_items_update_for_items_params,
              ) => subItem.item_price_id !== subscriptionItem?.item_price_id!,
            )!,
          );

          params.replace_items_list = true;
        }
        break;
      default:
        break;
    }

    params.subscription_items = subscriptionItems;

    const subscriptionProperties: {
      id: string;
      params: _subscription.update_for_items_params;
    } = {
      id: subscription?.id!,
      params: params,
    };

    try {
      const data: Subscription = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.update,
        subscriptionProperties,
      );

      setSubscription(data);
    } catch (error: any) {
      throw error;
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  return {
    subscriptionLoadingState,

    updateSubscriptionItems,
  };
};
