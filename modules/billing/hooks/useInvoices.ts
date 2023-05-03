import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms } from '@modules/billing';

export const useInvoices = (): IInvoiceHook => {
  const customer = useRecoilValue(billingAtoms.customer);
  const [invoice, setInvoice] = useRecoilState(billingAtoms.invoice);
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoiceLoadingState, setInvoiceLoadingState] = useRecoilState(
    billingAtoms.invoiceLoadingState,
  );
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

  const getInvoice = async (invoiceId: RouterId) => {
    setInvoiceLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/invoices/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: invoiceId }),
      });

      const data = await response.json();

      setInvoice(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setInvoiceLoadingState('finished');
    }
  };

  const getInvoices = async () => {
    setInvoicesLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/invoices/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: customer?.id }),
      });

      const data = await response.json();

      setInvoices(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setInvoicesLoadingState('finished');
    }
  };

  const unloadInvoice = () => {
    setInvoice(null);
  };

  return {
    invoice,
    invoiceLoadingState,
    invoices,
    invoicesLoadingState,

    getInvoice,
    getInvoices,

    unloadInvoice,
  };
};
