import { useRecoilState, useRecoilValue } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { Estimate } from 'chargebee-typescript/lib/resources';

export const useEstimates = (): IEstimatesHook => {
  const [estimate, setEstimate] = useRecoilState(billingAtoms.estimate);
  const [estimateLoadingState, setEstimateLoadingState] = useRecoilState(
    billingAtoms.estimateLoadingState,
  );
  const subscription = useRecoilValue(billingAtoms.subscription);

  const getEstimate = async () => {
    setEstimateLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.estimates.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: subscription?.id }),
      });

      const data: Estimate = await response.json();

      setEstimate(data);
    } catch (error) {
      console.error('Failed to fetch estimates', error);
    } finally {
      setEstimateLoadingState('finished');
    }
  };

  return {
    estimate,
    estimateLoadingState,

    getEstimate,
  };
};
