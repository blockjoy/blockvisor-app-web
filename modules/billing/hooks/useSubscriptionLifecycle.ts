import { useRecoilState } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';

interface ISubscriptionLifecycleHook {
  subscriptionLoadingState: LoadingState;
  cancelSubscription: (params: { endOfTerm: boolean }) => Promise<void>;
  restoreSubscription: (id: string) => Promise<void>;
  reactivateSubscription: (id: string) => Promise<void>;
}

export const useSubscriptionLifecycle = (): ISubscriptionLifecycleHook => {
  const [subscription, setSubscription] = useRecoilState(
    billingSelectors.subscription,
  );

  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

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

  return {
    subscriptionLoadingState,

    cancelSubscription,
    restoreSubscription,
    reactivateSubscription,
  };
};
