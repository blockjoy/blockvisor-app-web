import { organizationAtoms } from '@modules/organization';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';

export const useSubscriptions = () => {
  const customer = useRecoilValue(billingSelectors.customer);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const setSubscriptionsLoadingState = useSetRecoilState(
    billingAtoms.subscriptionsLoadingState,
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

  const getSubscriptions = async () => {
    setSubscriptionsLoadingState('initializing');

    try {
      const params: _subscription.subscription_list_params = {
        customer_id: { is: customer?.id },
      };
      const filterParams = {
        cf_organization_id: defaultOrganization?.id,
      };

      const response = await fetch(BILLING_API_ROUTES.subsriptions.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params, filterParams }),
      });

      const data = await response.json();

      data.forEach((subscription: Subscription) => {
        switch (subscription.cf_plan) {
          case 'fully-managed-hosts':
            setFullyManagedHosts(subscription);
            break;
          case 'hosted-nodes':
            setHostedNodes(subscription);
            break;
          case 'self-managed-hosts':
            setSelfManagedHosts(subscription);
            break;
          default:
            throw new Error(
              `Unsupported subscription type: ${subscription.cf_plan}`,
            );
        }
      });
    } catch (error) {
      console.error('Failed to fetch subscription', error);
    } finally {
      setSubscriptionsLoadingState('finished');
    }
  };

  return {
    getSubscriptions,
  };
};
