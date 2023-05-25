import { useRecoilState } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  useSubscription,
} from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';

export const useInvoices = (): IInvoiceHook => {
  const { subscription } = useSubscription();

  const [invoice, setInvoice] = useRecoilState(billingAtoms.invoice);
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoiceLoadingState, setInvoiceLoadingState] = useRecoilState(
    billingAtoms.invoiceLoadingState,
  );
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
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

  const getInvoices = async () => {
    if (!subscription) {
      setInvoices([]);
      return;
    }

    setInvoicesLoadingState('initializing');

    try {
      const params = {
        subscription_id: { is: subscription?.id },
        limit: 10,
        status: { in: ['paid', 'payment_due'] },
        'sort_by[desc]': 'date',
      };

      const response = await fetch(BILLING_API_ROUTES.invoices.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: Invoice[] = await response.json();

      setInvoices(data);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
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
