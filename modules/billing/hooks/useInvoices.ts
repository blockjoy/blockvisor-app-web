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
    await new Promise((r) => setTimeout(r, 600));

    const invoice: IInvoice | undefined = INVOICES.find(
      (invoice) => invoice.id === id,
    );

    setInvoice(invoice!);

    setInvoiceLoadingState('finished');
  };

  const getInvoices = async () => {
    setInvoicesLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 600));

    const invoices: IInvoice[] = INVOICES;

    setInvoices(invoices);

    setInvoicesLoadingState('finished');
  };

  return {
    invoice,
    invoiceLoadingState,
    invoices,
    invoicesLoadingState,

    getInvoice,
    getInvoices,
  };
};
