import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { _subscription } from 'chargebee-typescript';
import { organizationAtoms } from '@modules/organization';
import { Subscription } from 'chargebee-typescript/lib/resources';

interface ExtendedCreateWithItemsParams
  extends _subscription.create_with_items_params {
  cf_organization_id: string;
}

export const useSubscription = (): ISubscriptionHook => {
  const customer = useRecoilValue(billingSelectors.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const [subscription, setSubscription] = useRecoilState(
    billingSelectors.subscription,
  );

  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const getSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subscriptions.get, {
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
        params: ExtendedCreateWithItemsParams;
      } = {
        id: customer?.id!,
        params: {
          id: defaultOrganization?.id!,
          auto_collection: autoRenewValue,
          payment_source_id: paymentMethodId,
          subscription_items: subscriptionItems,
          cf_organization_id: defaultOrganization?.id!,
        },
      };

      const response = await fetch(BILLING_API_ROUTES.subscriptions.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: Subscription = await response.json();

      setSubscription(data);

      return data;
    } catch (error) {
      console.error('Failed to create the subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscription = async (
    params: _subscription.update_for_items_params,
  ) => {
    setSubscriptionLoadingState('initializing');

    try {
      const subscriptionProperties: {
        id: string;
        params: _subscription.update_for_items_params;
      } = {
        id: subscription?.id!,
        params,
      };

      const response = await fetch(BILLING_API_ROUTES.subscriptions.update, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionProperties),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to CREATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
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

      const response = await fetch(BILLING_API_ROUTES.subscriptions.cancel, {
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

  const restoreSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.subscriptions.restore, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: id }),
      });

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error('Failed to RESTORE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const response = await fetch(
        BILLING_API_ROUTES.subscriptions.reactivate,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscriptionId: id }),
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
        BILLING_API_ROUTES.subscriptions.billingProfile.update,
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

  const provideSubscription = async (): Promise<Subscription | null> => {
    if (!subscription) {
      try {
        const newSubscription = await createSubscription({
          itemPriceId: 'standard-USD-Monthly',
          autoRenew: 'on',
          paymentMethodId: customer?.primary_payment_source_id!,
        });

        return newSubscription || null;
      } catch (error) {
        console.log(
          'Error while creating a customer in handlePaymentCreation',
          error,
        );
        return null;
      }
    }

    return subscription;
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

    provideSubscription,
  };
};
