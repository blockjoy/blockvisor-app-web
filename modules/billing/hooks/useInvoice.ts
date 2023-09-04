import { useRecoilState } from 'recoil';
import { Invoice } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  fetchBilling,
} from '@modules/billing';

interface IInvoiceHook {
  invoice: Invoice | null;
  invoiceLoadingState: LoadingState;
  getInvoice: (id: string) => Promise<void>;
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
      const data = await fetchBilling(BILLING_API_ROUTES.invoices.get, {
        id,
      });

      setInvoice(data);
    } catch (error) {
      console.error(`Failed to fetch Invoice with id: ${id}`, error);
    } finally {
      setInvoiceLoadingState('finished');
    }
  };

  const getInvoicePDF = async (id: string) => {
    try {
      const data = await fetchBilling(BILLING_API_ROUTES.invoices.pdf.get, {
        id,
      });

      return data;
    } catch (error) {
      console.error(`Failed to fetch Invoice pdf with id: ${id}`, error);
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
