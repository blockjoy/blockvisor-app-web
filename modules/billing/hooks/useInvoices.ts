import { useRecoilState } from 'recoil';
import { INVOICES } from '../mocks/invoices';
import { billingAtoms } from '@modules/billing';

export const useInvoices = (): IInvoiceHook => {
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

  const getInvoices = () => {
    setInvoicesLoadingState('initializing');

    const invoices: IInvoice[] = INVOICES;

    setInvoices(invoices);

    setInvoicesLoadingState('finished');
  };

  return {
    invoices,
    invoicesLoadingState,

    getInvoices,
  };
};
