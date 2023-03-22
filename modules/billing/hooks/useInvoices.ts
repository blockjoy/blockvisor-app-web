import { useRecoilState } from 'recoil';
import { INVOICES } from '../mocks/invoices';
import { billingAtoms } from '@modules/billing';

export const useInvoices = (): IInvoiceHook => {
  const [invoice, setInvoice] = useRecoilState(billingAtoms.invoice);
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoiceLoadingState, setInvoiceLoadingState] = useRecoilState(
    billingAtoms.invoiceLoadingState,
  );
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

  const getInvoice = async (id: RouterId) => {
    setInvoiceLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    const invoice: IInvoice | undefined = INVOICES.find(
      (invoice) => invoice.id === id,
    );

    setInvoice(invoice!);

    setInvoiceLoadingState('finished');
  };

  const getInvoices = async () => {
    setInvoicesLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    const invoices: IInvoice[] = INVOICES;

    setInvoices(invoices);

    setInvoicesLoadingState('finished');
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
