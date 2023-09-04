import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice, Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  useItems,
  useSubscription,
  matchSKU,
  fetchBilling,
} from '@modules/billing';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainsAtoms } from '@modules/node';

export enum UpdateSubscriptionAction {
  ADD_NODE = 'ADD_NODE',
  REMOVE_NODE = 'REMOVE_NODE',
  ADD_HOST = 'ADD_HOST',
  REMOVE_HOST = 'REMOVE_HOST',
}

interface IUpdateSubscriptionHook {
  subscriptionLoadingState: LoadingState;
  updateSubscriptionItems: (action: {
    type: UpdateSubscriptionAction;
    payload: UpdateSubscriptionPayload;
  }) => void;
}

export const useUpdateSubscriptionItems = (): IUpdateSubscriptionHook => {
  const setSubscription = useSetRecoilState(billingSelectors.subscription);

  const { provideSubscription } = useSubscription();
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { getItemPrices } = useItems();

  const blockchains = useRecoilValue(blockchainsAtoms.blockchains);

  const updateSubscriptionItems = async (action: {
    type: UpdateSubscriptionAction;
    payload: UpdateSubscriptionPayload;
  }) => {
    setSubscriptionLoadingState('initializing');
    const subscription = await provideSubscription();

    const { type, payload } = action;
    const { node, host } = payload;

    const params: _subscription.update_for_items_params = {};
    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    let SKU: string = '';
    if (node) {
      const blockchain = blockchains.find(
        (blockchain: Blockchain) => blockchain.id === node?.blockchainId,
      );
      SKU = matchSKU('node', { blockchain, node: node! });
    } else if (host) {
      SKU = matchSKU('host', { host: host! });
    }

    const billingPeriod = subscription?.billing_period_unit;

    const itemPriceParams = {
      id: SKU,
      periodUnit: billingPeriod,
    };

    const itemPrices: ItemPrice[] = await getItemPrices(itemPriceParams);
    const itemPriceID: string = itemPrices?.length ? itemPrices[0].id : '';

    const subscriptionItem: SubscriptionItem | undefined =
      subscription?.subscription_items?.find(
        (subItem: SubscriptionItem) => subItem.item_price_id === itemPriceID,
      );

    switch (type) {
      case UpdateSubscriptionAction.ADD_NODE:
        let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
          {
            item_price_id: itemPriceID,
            quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
          };

        subscriptionItems?.push(newSubscriptionItem!);
        break;

      case UpdateSubscriptionAction.REMOVE_NODE:
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
      case UpdateSubscriptionAction.ADD_HOST:
        break;
      case UpdateSubscriptionAction.REMOVE_HOST:
        break;
      default:
        break;
    }

    params.subscription_items = subscriptionItems;

    try {
      const data: Subscription = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.update,
        {
          id: subscription?.id!,
          params,
        },
      );

      console.log('%cUpdateSubscription', 'color: #bff589', {
        type,
        subscription,
        params,
        data,
      });

      setSubscription(data);
    } catch (error: any) {
      console.log('UpdateSubscription Error', error);
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
