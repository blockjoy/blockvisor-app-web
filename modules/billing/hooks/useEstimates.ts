import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { Estimate } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';

interface IEstimatesHook {
  estimate: Estimate | null;
  estimateLoadingState: LoadingState;
  getEstimate: VoidFunction;
}

export const useEstimates = (): IEstimatesHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.estimates.get, {
      subscriptionId: subscription?.id!,
    });

  console.log('useEstimates SWR?');
  const { data, error, isLoading, mutate } = useSWR(
    () =>
      subscription?.status === 'active'
        ? BILLING_API_ROUTES.estimates.get
        : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  console.log('useEstimates', {
    data,
    error,
    isLoading,
  });

  if (error) console.error('Failed to fetch Estimates', error);

  const estimateLoadingState: LoadingState = isLoading
    ? 'initializing'
    : 'finished';

  const getEstimate = () => {
    console.log('getEstimate()');
    mutate();
  };

  return {
    estimate: data,
    estimateLoadingState,

    getEstimate,
  };
};
