import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';
import { organizationAtoms } from '@modules/organization';
import { authAtoms, useUserSubscription } from '@modules/auth';

interface ISubscriptionHook {
  subscriptionLoadingState: LoadingState;
  setSubscriptionLoadingState: SetterOrUpdater<LoadingState>;
  getSubscription: (id: string) => void;
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
  fetchSubscription: (id?: string) => void;
}

export const useSubscription = (): ISubscriptionHook => {
  const customer = useRecoilValue(billingSelectors.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const user = useRecoilValue(authAtoms.user);

  const [subscription, setSubscription] = useRecoilState(
    billingSelectors.subscription,
  );

  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { createUserSubscription } = useUserSubscription();

  const getSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.subscriptions.get, {
        id,
      });

      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch Subscription', error);
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

    const params: _subscription.create_with_items_params = {
      auto_collection: autoRenewValue,
      payment_source_id: paymentMethodId,
      subscription_items: subscriptionItems,
    };

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.subscriptions.create, {
        id: customer?.id!,
        params,
      });

      console.log('%cCreateSubscription', 'color: #bff589', { params, data });

      setSubscription(data);

      try {
        await createUserSubscription(
          defaultOrganization?.id!,
          user?.id!,
          data.id,
        );
      } catch (error: any) {
        console.error('Failed to create User Subscription', error);
      }

      return data;
    } catch (error) {
      console.error('Failed to create Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscription = async (
    params: _subscription.update_for_items_params,
  ) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.subscriptions.update, {
        id: subscription?.id!,
        params,
      });

      setSubscription(data);
    } catch (error) {
      console.error('Failed to update Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const cancelSubscription = async ({ endOfTerm }: { endOfTerm: boolean }) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.subscriptions.cancel, {
        id: subscription?.id!,
        params: {
          end_of_term: endOfTerm,
        },
      });

      setSubscription(data);
    } catch (error) {
      console.error('Failed to cancel Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const restoreSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.restore,
        { id },
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to Restore subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async (id: string) => {
    setSubscriptionLoadingState('initializing');

    try {
      const params: _subscription.update_params = {
        invoice_immediately: true,
      };

      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.reactivate,
        { id, params },
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to Reactivate subscription', error);
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

    const params: _subscription.override_billing_profile_params = {
      payment_source_id: paymentMethodId,
      auto_collection: 'on',
    };

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.billingProfile.update,
        { id, params },
      );

      setSubscription(data);
    } catch (error) {
      console.error('Failed to update Billing profile', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const provideSubscription = async (): Promise<Subscription | null> => {
    if (!subscription) {
      try {
        const newSubscription = await createSubscription({
          itemPriceId: 'STANDARD-USD-M',
          autoRenew: true,
          paymentMethodId: customer?.primary_payment_source_id!,
        });

        return newSubscription || null;
      } catch (error) {
        console.error('Failed to provide Subscription', error);
        return null;
      }
    }

    return subscription;
  };

  const fetchSubscription = async (id?: string) => {
    if (!id) {
      setSubscriptionLoadingState('finished');
      return;
    }

    await getSubscription(id);
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

    fetchSubscription,

    updateBillingProfile,

    provideSubscription,
  };
};
