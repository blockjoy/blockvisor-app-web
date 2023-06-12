import { useRecoilState, useRecoilValue } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms, useItems } from '@modules/billing';
import { organizationAtoms } from '@modules/organization';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainsAtoms } from '@modules/node';

export const useSubscription = (): ISubscriptionHook => {
  const customer = useRecoilValue(billingAtoms.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const [subscription, setSubscription] = useRecoilState(
    billingAtoms.subscription,
  );
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { getItemPrices } = useItems();

  const blockchains = useRecoilValue(blockchainsAtoms.blockchains);

  const getSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const createSubscription = async ({
    itemPriceId,
    autoRenew,
    paymentMethodId,
  }: {
    itemPriceId: string;
    autoRenew: string;
    paymentMethodId: string;
  }) => {
    setSubscriptionLoadingState('initializing');

    try {
      const autoRenewValue: string = autoRenew ? 'on' : 'off';

      const subscriptionItems: _subscription.subscription_items_create_with_items_params[] =
        [
          {
            item_price_id: itemPriceId,
            quantity: 1,
          },
        ];

      const params: {
        id: string;
        params: _subscription.create_with_items_params;
      } = {
        id: customer?.id!,
        params: {
          id: defaultOrganization?.id!,
          auto_collection: autoRenewValue,
          payment_source_id: paymentMethodId,
          subscription_items: subscriptionItems,
        },
      };

      const response = await fetch(BILLING_API_ROUTES.subsriptions.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to create the subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscription = async () => {
    setSubscriptionLoadingState('initializing');

    try {
      const subscriptionProperties: {
        id: string;
        params: _subscription.update_params;
      } = {
        id: subscription?.id!,
        params: {},
      };

      const response = await fetch(BILLING_API_ROUTES.subsriptions.update, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionProperties),
      });

      const updatedSubscriptionData: Subscription = await response.json();

      setSubscription(updatedSubscriptionData);
    } catch (error) {
      console.error('Failed to CREATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscriptionItems = async (action: {
    type: string;
    payload: any;
  }) => {
    setSubscriptionLoadingState('initializing');

    const { type, payload } = action;

    const { node }: { node: Node } = payload;

    const params: _subscription.update_for_items_params = {};

    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    const nodeType = node.nodeType === 10 ? 'pruned' : '';
    const region = 'apac';

    const blockchain = blockchains.find(
      (blockchain: Blockchain) => blockchain.id === node.blockchainId,
    );

    const SKU = `${blockchain?.name?.toLowerCase()}-${nodeType}-${region}`;

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

    const response = await fetch(BILLING_API_ROUTES.subsriptions.item.update, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionProperties),
    });

    const updatedSubscriptionData: Subscription = await response.json();

    setSubscription(updatedSubscriptionData);
    setSubscriptionLoadingState('finished');
  };

  const cancelSubscription = async ({ endOfTerm }: { endOfTerm: boolean }) => {
    setSubscriptionLoadingState('initializing');

    try {
      const subscriptionProperties: {
        id: string;
        params: _subscription.cancel_for_items_params;
      } = {
        id: subscription?.id!,
        params: {
          end_of_term: endOfTerm,
        },
      };

      const response = await fetch(BILLING_API_ROUTES.subsriptions.cancel, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionProperties),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to CANCEL subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const restoreSubscription = async () => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.restore, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: subscription?.id }),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to RESTORE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async () => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.reactivate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: subscription?.id }),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to REACTIVATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateBillingProfile = async (paymentMethodId: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const params = {
        id: subscription?.id,
        params: {
          payment_source_id: paymentMethodId,
          auto_collection: 'on',
        },
      };

      const response = await fetch(
        BILLING_API_ROUTES.subsriptions.billingProfile.update,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        },
      );

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to REACTIVATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  return {
    subscription,
    subscriptionLoadingState,

    getSubscription,
    createSubscription,
    updateSubscription,
    updateSubscriptionItems,
    cancelSubscription,
    restoreSubscription,
    reactivateSubscription,

    updateBillingProfile,
  };
};
