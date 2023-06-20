import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';

export const useInvoices = (subscriptionId: string): IInvoicesHook => {
  const subscription = useRecoilValue(
    billingSelectors.subscriptions[subscriptionId],
  );
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

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

  return {
    invoices,
    invoicesLoadingState,

    getInvoices,
  };
};
