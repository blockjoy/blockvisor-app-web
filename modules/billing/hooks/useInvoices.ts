import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { _invoice } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingSelectors,
  InitialQueryParams as InvoicesInitialQueryParams,
  getInitialQueryParams as getInvoicesInitialQueryParams,
  fetchBilling,
} from '@modules/billing';

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  invoicesNextOffset: string | undefined;
  preloadInvoices: number;
  getInvoices: (queryParams?: InvoicesInitialQueryParams) => void;
}

// TODO: include updates of QUERYPARAMS
export const useInvoices = (
  queryParams?: InvoicesInitialQueryParams,
): IInvoicesHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  if (!queryParams) {
    const savedQueryParams = getInvoicesInitialQueryParams();
    queryParams = savedQueryParams;
  }

  const params: _invoice.invoice_list_params = {
    subscription_id: { is: subscription?.id },
    limit: queryParams?.pagination?.itemsPerPage ?? 10,
    status: { in: ['paid', 'payment_due'] },
    [`sort_by[${queryParams?.sorting.order}]`]: queryParams?.sorting.field,
  };

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.invoices.list, { params });

  const { data, error, isLoading, mutate } = useSWR(
    () =>
      subscription?.status === 'active'
        ? `${BILLING_API_ROUTES.invoices.list}_${subscription?.id}`
        : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  if (error) console.error('Failed to fetch Invoices', error);

  const invoicesLoadingState: LoadingState = isLoading
    ? 'initializing'
    : 'finished';

  const getInvoices = async (queryParams?: InvoicesInitialQueryParams) => {
    if (!subscription || subscription.status !== 'active') return [];
    mutate();
  };

  return {
    invoices: data?.invoices,
    invoicesLoadingState,

    invoicesNextOffset: '',
    preloadInvoices: 0,

    getInvoices,
  };
};
