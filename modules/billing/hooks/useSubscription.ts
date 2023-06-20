import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  useItems,
} from '@modules/billing';
import { _subscription } from 'chargebee-typescript';
import { blockchainsAtoms } from '@modules/node';
import { organizationAtoms } from '@modules/organization';
import { Subscription } from 'chargebee-typescript/lib/resources';

interface ExtendedCreateWithItemsParams
  extends _subscription.create_with_items_params {
  cf_plan: string;
  cf_organization_id: string;
}

export const useSubscription = (): ISubscriptionHook => {
  const customer = useRecoilValue(billingSelectors.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const setHostedNodes = useSetRecoilState(
    billingSelectors.subscriptions['hosted-nodes'],
  );
  const setSelfManagedHosts = useSetRecoilState(
    billingSelectors.subscriptions['self-managed-hosts'],
  );
  const setFullyManagedHosts = useSetRecoilState(
    billingSelectors.subscriptions['fully-managed-hosts'],
  );

  const setters = {
    'hosted-nodes': setHostedNodes,
    'self-managed-hosts': setSelfManagedHosts,
    'fully-managed-hosts': setFullyManagedHosts,
  };

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

      if (data.cf_plan) setters[data.cf_plan](data);
    } catch (error) {
      console.error('Failed to fetch subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const createSubscription = async ({
    itemId,
    itemPriceId,
    autoRenew,
    paymentMethodId,
  }: {
    itemId: string;
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
        params: ExtendedCreateWithItemsParams;
      } = {
        id: customer?.id!,
        params: {
          auto_collection: autoRenewValue,
          payment_source_id: paymentMethodId,
          subscription_items: subscriptionItems,
          cf_plan: itemId,
          cf_organization_id: defaultOrganization?.id!,
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

      setters[data.cf_plan!](data);
    } catch (error) {
      console.error('Failed to create the subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const subscriptionProperties: {
        id: string;
        params: _subscription.update_params;
      } = {
        id,
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

      if (updatedSubscriptionData.cf_plan)
        setters[updatedSubscriptionData.cf_plan](updatedSubscriptionData);
    } catch (error) {
      console.error('Failed to CREATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const cancelSubscription = async (
    id: string,
    { endOfTerm }: { endOfTerm: boolean },
  ) => {
    setSubscriptionLoadingState('initializing');

    try {
      const subscriptionProperties: {
        id: string;
        params: _subscription.cancel_for_items_params;
      } = {
        id,
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

      if (data.cf_plan) setters[data.cf_plan](data);
    } catch (error) {
      console.error('Failed to CANCEL subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const restoreSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.restore, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: id }),
      });

      const data: Subscription = await response.json();

      setters[data.cf_plan!](data);
    } catch (error) {
      console.error('Failed to RESTORE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subsriptions.reactivate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: id }),
      });

      const data: Subscription = await response.json();

      if (data.cf_plan) setters[data.cf_plan](data);
    } catch (error) {
      console.error('Failed to REACTIVATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateBillingProfile = async (
    id: string,
    updateParams: { paymentMethodId: string },
  ) => {
    setSubscriptionLoadingState('initializing');

    const { paymentMethodId } = updateParams;

    try {
      const params: {
        id: string;
        params: _subscription.override_billing_profile_params;
      } = {
        id,
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

      if (data.cf_plan) setters[data.cf_plan](data);
    } catch (error) {
      console.error('Failed to REACTIVATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  return {
    subscriptionLoadingState,

    getSubscription,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    restoreSubscription,
    reactivateSubscription,

    updateBillingProfile,
  };
};
