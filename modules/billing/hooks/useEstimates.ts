import { useRecoilState } from 'recoil';
import { Estimate } from 'chargebee-typescript/lib/resources';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';

interface IEstimatesHook {
  estimate: Estimate | null;
  estimateLoadingState: LoadingState;
  getEstimate: VoidFunction;
}

export const useEstimates = (subscriptionId: string): IEstimatesHook => {
  const [estimate, setEstimate] = useRecoilState(billingAtoms.estimate);
  const [estimateLoadingState, setEstimateLoadingState] = useRecoilState(
    billingAtoms.estimateLoadingState,
  );

  const getEstimate = async () => {
    setEstimateLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.estimates.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
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
