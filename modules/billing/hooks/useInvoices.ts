import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { _INVOICES } from '../mocks/invoices';

interface IInvoicesHook {
  invoices: any[];
  invoicesLoadingState: LoadingState;
  getInvoices: () => Promise<void>;
}

export const useInvoices = (): IInvoicesHook => {
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

  const getInvoices = async () => {
    setInvoicesLoadingState('initializing');

    try {
      const data: any = _INVOICES;

      console.log('%cGetInvoices', 'color: #bff589', data);
      setInvoices(data);
    } catch (error) {
      console.error('Failed to fetch Invoices', error);
      setInvoices([]);
    } finally {
      setInvoicesLoadingState('finished');
    }
  };

  return {
    invoices,
    invoicesLoadingState,

    getInvoices,
  };
};
