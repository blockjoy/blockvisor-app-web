import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';
import { _subscription } from 'chargebee-typescript';
import { organizationAtoms } from '@modules/organization';
import { Subscription } from 'chargebee-typescript/lib/resources';

interface ExtendedCreateWithItemsParams
  extends _subscription.create_with_items_params {
  cf_organization_id: string;
}

interface ISubscriptionHook {
  subscriptionLoadingState: LoadingState;
  setSubscriptionLoadingState: SetterOrUpdater<LoadingState>;
  getSubscription: (subscriptionId: string) => void;
  createSubscription: (params: {
    itemPriceId: string;
    autoRenew: boolean;
    paymentMethodId: string;
  }) => void;
  updateSubscription: (params: _subscription.update_for_items_params) => void;
  cancelSubscription: (params: { endOfTerm: boolean }) => void;
  restoreSubscription: (id: string) => void;
  reactivateSubscription: (id: string) => void;
  updateBillingProfile: (
    id: string,
    params: { paymentMethodId: string },
  ) => void;
  provideSubscription: () => Promise<Subscription | null>;
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
      const data = await fetchBilling(BILLING_API_ROUTES.subscriptions.get, {
        id,
      });

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
    autoRenew: boolean;
    paymentMethodId: string;
  }) => {
    setSubscriptionLoadingState('initializing');

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

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.create,
        params,
      );

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

    const subscriptionProperties: {
      id: string;
      params: _subscription.update_for_items_params;
    } = {
      id: subscription?.id!,
      params,
    };

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.update,
        subscriptionProperties,
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to CREATE subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const cancelSubscription = async ({ endOfTerm }: { endOfTerm: boolean }) => {
    setSubscriptionLoadingState('initializing');

    const subscriptionProperties: {
      id: string;
      params: _subscription.cancel_for_items_params;
    } = {
      id: subscription?.id!,
      params: {
        end_of_term: endOfTerm,
      },
    };

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.cancel,
        subscriptionProperties,
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to cancel subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const restoreSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.restore,
        { subscriptionId: id },
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to restore subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.reactivate,
        { subscriptionId: id },
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to reactivate subscription', error);
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

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.billingProfile.update,
        params,
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to update the billing profile', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const provideSubscription = async (): Promise<Subscription | null> => {
    if (!subscription) {
      try {
        const newSubscription = await createSubscription({
          itemPriceId: 'standard-USD-Monthly',
          autoRenew: true,
          paymentMethodId: customer?.primary_payment_source_id!,
        });

        return newSubscription || null;
      } catch (error) {
        console.log('Failed to provide Subscription', error);
        return null;
      }
    }

    return subscription;
  };

  return {
    subscriptionLoadingState,
    setSubscriptionLoadingState,

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
