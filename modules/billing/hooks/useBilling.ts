import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  authAtoms,
  useIdentityRepository,
  useUserBilling,
  useUserSubscription,
} from '@modules/auth';
import {
  billingAtoms,
  billingSelectors,
  useCustomer,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import { organizationAtoms } from '@modules/organization';

type UseBillingHook = {
  fetchBillingInfo: () => Promise<void>;
  fetchOrganizationSubscription: () => Promise<void>;
};

export const useBilling = (): UseBillingHook => {
  const repository = useIdentityRepository();
  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
  const { getCustomer } = useCustomer();
  const { getUserBilling } = useUserBilling();
  const { getUserSubscription } = useUserSubscription();
  const { fetchSubscription, setSubscriptionLoadingState } = useSubscription();
  const { fetchPaymentMethods } = usePaymentMethods();

  const customer = useRecoilValue(billingSelectors.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );

  const fetchBillingInfo = async () => {
    const userId = repository?.getIdentity()?.id;
    const billingId = await getUserBilling(userId!);
    if (billingId) await getCustomer(billingId!);
  };

  const fetchOrganizationSubscription = async () => {
    setSubscriptionLoadingState('initializing');

    if (!isEnabledBillingPreview) {
      setSubscriptionLoadingState('finished');
      return;
    }

    try {
      const userSubscription = await getUserSubscription(
        defaultOrganization?.id!,
      );

      await fetchSubscription(userSubscription?.externalId);
    } catch (error: any) {
      console.log('Error while fetching user subscription', error);
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  useEffect(() => {
    if (isEnabledBillingPreview) fetchBillingInfo();
  }, [isEnabledBillingPreview]);

  useEffect(() => {
    if (isEnabledBillingPreview && customer) fetchPaymentMethods();
  }, [isEnabledBillingPreview, customer]);

  useEffect(() => {
    if (isEnabledBillingPreview && defaultOrganization?.id)
      fetchOrganizationSubscription();
  }, [isEnabledBillingPreview, defaultOrganization?.id]);

  return {
    fetchBillingInfo,
    fetchOrganizationSubscription,
  };
};
