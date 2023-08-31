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

  // TODO: testing if this fixes error on VERCEL
  console.log('Does it enter?');

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.estimates.get, {
      subscriptionId: subscription?.id!,
    });

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

  if (error) console.error('Failed to fetch Estimates', error);

  const estimateLoadingState: LoadingState = isLoading
    ? 'initializing'
    : 'finished';

  const getEstimate = async () => mutate();

  return {
    estimate: data,
    estimateLoadingState,

    getEstimate,
  };
};
