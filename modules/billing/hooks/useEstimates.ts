import { useRecoilState } from 'recoil';
import { Estimate } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  fetchBilling,
} from '@modules/billing';

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
      const data = await fetchBilling(BILLING_API_ROUTES.estimates.get, {
        subscriptionId,
      });

      setEstimate(data);
    } catch (error) {
      console.error('Failed to fetch Estimates', error);
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
