import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { _UPCOMING_LINES } from '../mocks/upcomingLines';

interface IEstimatesHook {
  estimates: any | null;
  estimatesLoadingState: LoadingState;
  getEstimates: () => Promise<void>;
}

export const useEstimates = (): IEstimatesHook => {
  const [estimates, setEstimates] = useRecoilState(billingAtoms.estimates);
  const [estimatesLoadingState, setEstimatesLoadingState] = useRecoilState(
    billingAtoms.estimatesLoadingState,
  );

  const getEstimates = async () => {
    setEstimatesLoadingState('initializing');

    try {
      const data: any = _UPCOMING_LINES;

      console.log('%cGetEstimates', 'color: #bff589', data);
      setEstimates(data);
    } catch (error) {
      console.error('Failed to fetch Estimates', error);
      setEstimates([]);
    } finally {
      setEstimatesLoadingState('finished');
    }
  };
  return {
    estimates,
    estimatesLoadingState,

    getEstimates,
  };
};
