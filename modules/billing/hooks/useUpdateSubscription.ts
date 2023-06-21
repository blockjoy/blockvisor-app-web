import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  useItems,
} from '@modules/billing';
import { _subscription } from 'chargebee-typescript';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainsAtoms } from '@modules/node';
import { Subscription } from 'chargebee-typescript/lib/resources';

export const useUpdateSubscription = (): IUpdateSubscriptionHook => {
  const [hostedNodes, setHostedNodes] = useRecoilState(
    billingSelectors.subscriptions['hosted-nodes'],
  );
  const [selfManagedHosts, setSelfManagedHosts] = useRecoilState(
    billingSelectors.subscriptions['self-managed-hosts'],
  );
  const [fullyManagedHosts, setFullyManagedHosts] = useRecoilState(
    billingSelectors.subscriptions['fully-managed-hosts'],
  );

  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { getItemPrices } = useItems();

  const blockchains = useRecoilValue(blockchainsAtoms.blockchains);

  const updateSubscriptionItems = async (action: {
    type: string;
    payload: { node?: Node };
  }) => {
    setSubscriptionLoadingState('initializing');

    const { type, payload } = action;
    const { node } = payload;

    const params: _subscription.update_for_items_params = {};
    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    const nodeType = node?.nodeType === 10 ? 'pruned' : '';
    const region = 'apac';

    const blockchain = blockchains.find(
      (blockchain: Blockchain) => blockchain.id === node?.blockchainId,
    );

    const SKU = `${blockchain?.name?.toLowerCase()}-${nodeType}-${region}`;

    const billingPeriod = hostedNodes?.billing_period_unit;

    const itemPriceParams = {
      id: SKU,
      periodUnit: billingPeriod,
    };

    const itemPrice: any = await getItemPrices(itemPriceParams);
    const itemPriceID: string = itemPrice?.length ? itemPrice[0].id : null;

    const subscriptionItem: SubscriptionItem | undefined =
      hostedNodes?.subscription_items?.find(
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
            ...hostedNodes?.subscription_items?.filter(
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
      id: hostedNodes?.id!,
      params: params,
    };

    const response = await fetch(BILLING_API_ROUTES.subsriptions.item.update, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionProperties),
    });

    const updatedSubscriptionData: Subscription = await response.json();

    setHostedNodes(updatedSubscriptionData);
    setSubscriptionLoadingState('finished');
  };

  return {
    subscriptionLoadingState,

    updateSubscriptionItems,
  };
};
