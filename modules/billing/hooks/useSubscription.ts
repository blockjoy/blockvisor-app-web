import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  DEFAULT_ITEM_PRICE_ID,
  ExtendedCreateWithItemsParams,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';
import { organizationAtoms } from '@modules/organization';
import { authAtoms, useUserSubscription } from '@modules/auth';

interface ISubscriptionHook {
  subscription: Subscription | null;
  subscriptionLoadingState: LoadingState;
  setSubscriptionLoadingState: SetterOrUpdater<LoadingState>;
  getSubscription: (id: string) => Promise<void>;
  createSubscription: (params: {
    itemPriceId: string;
    paymentMethodId: string;
  }) => Promise<void>;
  updateSubscription: (
    params: _subscription.update_for_items_params,
  ) => Promise<void>;
  updateBillingProfile: (
    id: string,
    params: { paymentMethodId: string },
  ) => Promise<void>;
  provideSubscription: () => Promise<Subscription | null>;
  fetchSubscription: (id?: string) => Promise<void>;
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
  const subscriptionPaymentMethodLoadingState = useSetRecoilState(
    billingAtoms.subscriptionPaymentMethodLoadingState,
  );

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
    paymentMethodId,
  }: {
    itemPriceId: string;
    paymentMethodId: string;
  }) => {
    setSubscriptionLoadingState('initializing');

    const subscriptionItems: _subscription.subscription_items_create_with_items_params[] =
      [
        {
          item_price_id: itemPriceId,
          quantity: 1,
        },
      ];

    const params: ExtendedCreateWithItemsParams = {
      payment_source_id: paymentMethodId,
      subscription_items: subscriptionItems,
      cf_organization_id: defaultOrganization?.id,
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
    setSubscriptionLoadingState('loading');

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

  const updateBillingProfile = async (
    id: string,
    updateParams: { paymentMethodId: string },
  ) => {
    subscriptionPaymentMethodLoadingState('loading');

    const { paymentMethodId } = updateParams;

    const params: _subscription.override_billing_profile_params = {
      payment_source_id: paymentMethodId,
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
      subscriptionPaymentMethodLoadingState('finished');
    }
  };

  const provideSubscription = async (): Promise<Subscription | null> => {
    if (!subscription) {
      try {
        const newSubscription = await createSubscription({
          itemPriceId: DEFAULT_ITEM_PRICE_ID,
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
    subscription,

    subscriptionLoadingState,
    setSubscriptionLoadingState,

    getSubscription,
    createSubscription,
    updateSubscription,

    fetchSubscription,

    updateBillingProfile,

    provideSubscription,
  };
};
