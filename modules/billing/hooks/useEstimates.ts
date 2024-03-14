import { useRecoilValue } from 'recoil';
import useSWR, { preload } from 'swr';
import { Estimate } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

interface IEstimatesHook {
  estimate: Estimate | null;
  estimateLoadingState: LoadingState;
  loadEstimates: VoidFunction;
}

export const useEstimates = (): IEstimatesHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.estimates.get, {
      subscriptionId: subscription?.id!,
    });

  const getKey = () => {
    if (subscription?.status !== 'active') return null;

    if (!canUpdateSubscription) return null;

    return `${BILLING_API_ROUTES.estimates.get}_${subscription?.id}`;
  };

  const { data, error, isLoading } = useSWR(getKey, fetcher);

  if (error) console.error('Failed to fetch Estimates', error);

  const estimateLoadingState: LoadingState = isLoading
    ? 'initializing'
    : 'finished';

  const loadEstimates = async () => {
    preload(getKey, fetcher);
  };

  return {
    estimate: data,
    estimateLoadingState,

    loadEstimates,
  };
};
