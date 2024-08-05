import { useRecoilState } from 'recoil';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms } from '@modules/billing';
import { _UPCOMING_INVOICE } from '../mocks/upcomingInvoice';

interface IEstimatesHook {
  estimates: Invoice | null;
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
      const data: Invoice = _UPCOMING_INVOICE;

      console.log('%cGetEstimates', 'color: #bff589', data);
      setEstimates(data);
    } catch (error) {
      console.error('Failed to fetch Estimates', error);
      setEstimates(null);
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
