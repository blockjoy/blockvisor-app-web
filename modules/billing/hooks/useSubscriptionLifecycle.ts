import { useRecoilState } from 'recoil';
import { OrgServiceBillingDetailsResponse } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms } from '@modules/billing';

interface ISubscriptionLifecycleHook {
  subscription: OrgServiceBillingDetailsResponse | null;
  subscriptionLoadingState: LoadingState;
  cancelSubscription: (params: { endOfTerm: boolean }) => Promise<void>;
  restoreSubscription: (id: string) => Promise<void>;
  reactivateSubscription: (id: string) => Promise<void>;
}

export const useSubscriptionLifecycle = (): ISubscriptionLifecycleHook => {
  const [subscription, setSubscription] = useRecoilState(
    billingAtoms.subscription,
  );

  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const cancelSubscription = async ({ endOfTerm }: { endOfTerm: boolean }) => {
    setSubscriptionLoadingState('loading');

    try {
      const data = null;

      setSubscription(data);
    } catch (error) {
      console.error('Failed to cancel Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const restoreSubscription = async (id: string) => {
    setSubscriptionLoadingState('loading');

    try {
      const data = null;

      setSubscription(data);
    } catch (error) {
      console.error('Failed to Restore subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const reactivateSubscription = async (id: string) => {
    setSubscriptionLoadingState('loading');

    try {
      const data = null;

      setSubscription(data);
    } catch (error) {
      console.error('Failed to Reactivate subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  return {
    subscription,
    subscriptionLoadingState,

    cancelSubscription,
    restoreSubscription,
    reactivateSubscription,
  };
};
