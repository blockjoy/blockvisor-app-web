import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { organizationAtoms } from '@modules/organization';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';

// TODO: check where payment intent has to be included
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

  const getSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    console.log('GET SUBSCRIPTION');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.error_code) {
        setSubscription(null);
        return;
      }

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
  }: {
    itemPriceId: string;
    autoRenew: string;
  }) => {
    setSubscriptionLoadingState('initializing');

    try {
      const customerId = customer?.id;

      const autoRenewValue = autoRenew ? 'on' : 'off';

      const subscriptionItems: any = [
        {
          item_price_id: itemPriceId,
          auto_collection: autoRenewValue,
        },
      ];

      const subscriptionParams = {
        id: defaultOrganization?.id,
        subscription_items: subscriptionItems,
      };

      const response = await fetch(BILLING_API_ROUTES.subsriptions.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId, subscription: subscriptionParams }),
      });

      const subscription: Subscription = await response.json();

      setSubscription(subscription);
    } catch (error) {
      console.error('Failed to CREATE subscription', error);
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

      console.log(
        '%csubscriptionProperties',
        'color: #f00',
        subscriptionProperties,
      );

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

    const subscriptionParams: _subscription.update_for_items_params = {};

    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    console.log('TYPE', type);
    console.log('PAYLOAD', payload);

    console.log('SUBSCRIPTION ITEMS', subscription?.subscription_items);

    // check if already exists ???
    const subscriptionItem: SubscriptionItem | undefined =
      subscription?.subscription_items?.find(
        (subItem: SubscriptionItem) => subItem.item_price_id === payload.item,
      );

    switch (type) {
      case 'create':
        let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
          {
            item_price_id: payload.item,
            quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
          };

        subscriptionItems?.push(newSubscriptionItem!);
        break;

      case 'delete':
        if (subscriptionItem?.quantity! > 1) {
          let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
            {
              item_price_id: payload.item,
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

          subscriptionParams.replace_items_list = true;
        }
        break;
      default:
        break;
    }

    subscriptionParams.subscription_items = subscriptionItems;

    const subscriptionProperties: {
      id: string;
      params: _subscription.update_for_items_params;
    } = {
      id: subscription?.id!,
      params: subscriptionParams,
    };

    console.log(
      '%csubscriptionProperties',
      'color: #f00',
      subscriptionProperties,
    );

    const response = await fetch(BILLING_API_ROUTES.subsriptions.item.update, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionProperties),
    });

    const updatedSubscriptionData: Subscription = await response.json();

    console.log('Subscription [RESPONSE]', updatedSubscriptionData);

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
