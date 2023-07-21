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
import {
  Node,
  NodeServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainsAtoms } from '@modules/node';
import { ItemPrice, Subscription } from 'chargebee-typescript/lib/resources';
import {
  Host,
  HostServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/host';

export enum SubscriptionAction {
  ADD_NODE = 'ADD_NODE',
  REMOVE_NODE = 'REMOVE_NODE',
  ADD_HOST = 'ADD_HOST',
  REMOVE_HOST = 'REMOVE_HOST',
}

interface IUpdateSubscriptionHook {
  subscriptionLoadingState: LoadingState;
  updateSubscriptionItems: (action: {
    type: SubscriptionAction;
    payload:
      | { node?: Node | NodeServiceCreateRequest | null }
      | { host?: Host | HostServiceCreateRequest };
  }) => void;
  generateUpdateSubscriptionParams: (
    autoRenew: boolean,
    periodUnit: string,
    itemPrices: ItemPrice[],
  ) => Promise<_subscription.update_for_items_params>;
}

export const useUpdateSubscription = (): IUpdateSubscriptionHook => {
  const setSubscription = useSetRecoilState(billingSelectors.subscription);

  const { provideSubscription } = useSubscription();
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { getItemPrices } = useItems();

  const blockchains = useRecoilValue(blockchainsAtoms.blockchains);

  const updateSubscriptionItems = async (action: {
    type: SubscriptionAction;
    payload: { node?: Node | NodeServiceCreateRequest | null; host?: any };
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
      case SubscriptionAction.ADD_NODE:
        let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
          {
            item_price_id: itemPriceID,
            quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
          };

        subscriptionItems?.push(newSubscriptionItem!);
        break;

      case SubscriptionAction.REMOVE_NODE:
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
      case SubscriptionAction.ADD_HOST:
        break;
      case SubscriptionAction.REMOVE_HOST:
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

      console.log('UpdateSubscription', { type, subscription, params, data });

      setSubscription(data);
    } catch (error: any) {
      throw error;
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const generateUpdateSubscriptionParams = async (
    autoRenew: boolean,
    periodUnit: string,
    itemPrices: ItemPrice[],
  ) => {
    const params: _subscription.update_for_items_params = {};

    const subscription = await provideSubscription();

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

  return {
    subscriptionLoadingState,

    updateSubscriptionItems,

    generateUpdateSubscriptionParams,
  };
};
