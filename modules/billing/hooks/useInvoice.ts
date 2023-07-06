import { useRecoilState } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';

interface IInvoiceHook {
  invoice: Invoice | null;
  invoiceLoadingState: LoadingState;
  getInvoice: (id: string) => void;
  getInvoicePDF: (id: string) => Promise<Invoice | null>;
  unloadInvoice: VoidFunction;
}

export const useInvoice = (): IInvoiceHook => {
  const [invoice, setInvoice] = useRecoilState(billingAtoms.invoice);
  const [invoiceLoadingState, setInvoiceLoadingState] = useRecoilState(
    billingAtoms.invoiceLoadingState,
  );

  const getInvoice = async (id: string) => {
    setInvoiceLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.invoices.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data: Invoice = await response.json();

      setInvoice(data);
    } catch (error) {
      console.error(`Failed to fetch invoice with id: ${id}`, error);
    } finally {
      setInvoiceLoadingState('finished');
    }
  };

  const getInvoicePDF = async (id: string) => {
    try {
      const response = await fetch(BILLING_API_ROUTES.invoices.pdf.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data: Invoice = await response.json();

      return data;
    } catch (error) {
      console.error(`Failed to fetch invoice pdf with id: ${id}`, error);
      return null;
    }
  };

  const unloadInvoice = () => {
    setInvoice(null);
  };

  return {
    invoice,
    invoiceLoadingState,

    getInvoice,
    getInvoicePDF,

    unloadInvoice,
  };
};
