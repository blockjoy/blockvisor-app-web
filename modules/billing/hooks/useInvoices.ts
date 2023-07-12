import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  InitialQueryParams as InvoicesInitialQueryParams,
  getInitialQueryParams as getInvoicesInitialQueryParams,
} from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { _invoice } from 'chargebee-typescript';

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  invoicesNextOffset: string | undefined;
  preloadInvoices: number;
  getInvoices: (queryParams: InvoicesInitialQueryParams) => void;
}

export const useInvoices = (): IInvoicesHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );
  const [invoicesNextOffset, setInvoicesNextOffset] = useRecoilState(
    billingAtoms.invoicesNextOffset,
  );
  const [preloadInvoices, setPreloadInvoices] = useRecoilState(
    billingAtoms.preloadInvoices,
  );

  const getInvoices = async (queryParams?: InvoicesInitialQueryParams) => {
    if (!subscription) {
      setInvoices([]);
      return;
    }

    if (!queryParams) {
      const savedQueryParams = getInvoicesInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.currentPage === 1 ? 'initializing' : 'loading';

    setInvoicesLoadingState(loadingState);

    try {
      const params: _invoice.invoice_list_params = {
        subscription_id: { is: subscription?.id },
        limit: queryParams?.pagination?.itemsPerPage ?? 10,
        status: { in: ['paid', 'payment_due'] },
        [`sort_by[${queryParams?.sorting.order}]`]: queryParams?.sorting.field,
      };

      if (invoicesNextOffset) {
        params.offset = invoicesNextOffset;
      }

      const response = await fetch(BILLING_API_ROUTES.invoices.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params }),
      });

      const data: { invoices: Invoice[]; nextOffset: string | undefined } =
        await response.json();

      const { invoices: invoicesList, nextOffset } = data;

      setPreloadInvoices(invoicesList.length);

      if (queryParams.pagination.currentPage === 1) {
        setInvoices(invoicesList);
      } else {
        const newInvoices = [...invoices, ...invoicesList];
        setInvoices(newInvoices);
      }

      setInvoicesNextOffset(nextOffset);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setPreloadInvoices(0);
      setInvoicesLoadingState('finished');
    }
  };

  return {
    invoices,
    invoicesLoadingState,

    invoicesNextOffset,
    preloadInvoices,

    getInvoices,
  };
};
