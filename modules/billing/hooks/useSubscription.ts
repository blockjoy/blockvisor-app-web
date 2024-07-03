import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms, billingSelectors } from '@modules/billing';
import { organizationAtoms } from '@modules/organization';
import { organizationClient } from '@modules/grpc';
import { OrgServiceBillingDetailsResponse } from '@modules/grpc/library/blockjoy/v1/org';

interface ISubscriptionHook {
  subscription: OrgServiceBillingDetailsResponse | null;
  subscriptionLoadingState: LoadingState;
  setSubscriptionLoadingState: SetterOrUpdater<LoadingState>;
  subscriptionPaymentMethodLoadingState: LoadingState;
  getSubscription: () => Promise<void>;
  createSubscription: (params: { paymentMethodId: string }) => Promise<void>;
  updateSubscription: (params: any) => Promise<void>;
  updateBillingProfile: (
    id: string,
    params: { paymentMethodId: string },
  ) => Promise<void>;
}

export const useSubscription = (): ISubscriptionHook => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const [subscription, setSubscription] = useRecoilState(
    billingSelectors.subscription,
  );
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);
  const [
    subscriptionPaymentMethodLoadingState,
    setSubscriptionPaymentMethodLoadingState,
  ] = useRecoilState(billingAtoms.subscriptionPaymentMethodLoadingState);

  const getSubscription = async () => {
    setSubscriptionLoadingState('initializing');

    try {
      const data = await organizationClient.getSubscription(
        defaultOrganization?.id!,
      );

      console.log('%cGetSubscription', 'color: #bff589', data);
      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch Subscription', error);
      setSubscription(null);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const createSubscription = async ({
    paymentMethodId,
  }: {
    paymentMethodId?: string;
  }) => {
    setSubscriptionLoadingState('initializing');

    try {
    } catch (error) {
      console.error('Failed to create Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateSubscription = async () => {
    setSubscriptionLoadingState('loading');

    try {
    } catch (error) {
      console.error('Failed to update Subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  const updateBillingProfile = async () => {
    setSubscriptionPaymentMethodLoadingState('loading');

    try {
    } catch (error) {
      console.error('Failed to update Billing profile', error);
      throw error;
    } finally {
      setSubscriptionPaymentMethodLoadingState('finished');
    }
  };

  return {
    subscription,

    subscriptionLoadingState,
    setSubscriptionLoadingState,

    subscriptionPaymentMethodLoadingState,

    getSubscription,
    createSubscription,
    updateSubscription,

    updateBillingProfile,
  };
};
