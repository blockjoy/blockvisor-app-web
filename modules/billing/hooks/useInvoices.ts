import { useRecoilValue } from 'recoil';
import { preload } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { _invoice } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingSelectors,
  getInitialQueryParams,
  fetchBilling,
  InvoicesQueryParams,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  invoicesNextOffset: string | undefined;
  loadInvoices: VoidFunction;
  getInvoices: (queryParams?: InvoicesQueryParams) => Promise<void>;
}

export const useInvoices = (): IInvoicesHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );

  const queryParams = getInitialQueryParams();

  const params: _invoice.invoice_list_params = {
    subscription_id: { is: subscription?.id },
    limit: queryParams?.pagination?.itemsPerPage ?? 10,
    status: { in: ['paid', 'payment_due'] },
    [`sort_by[${queryParams?.sorting.order}]`]: queryParams?.sorting.field,
  };

  // TODO: move offset to next API; pass as query param
  const fetcher = (url: string) => {
    const updatedParams = {
      ...params,
    };

    const match = url.match(/offset=([^&]*)/);
    const offsetString = match && match[1] ? match[1] : undefined;
    if (offsetString) updatedParams.offset = offsetString;

    return fetchBilling(BILLING_API_ROUTES.invoices.list, {
      params: updatedParams,
    });
  };

  const getKey = (
    pageIndex: number,
    previousPageData: {
      invoices: Invoice[];
      nextOffset: string | undefined;
    },
  ) => {
    if (!canUpdateSubscription) return null;

    if (previousPageData && !previousPageData.invoices) return null;

    if (previousPageData && previousPageData.nextOffset)
      return `${BILLING_API_ROUTES.invoices.list}_${subscription?.id}?offset=${previousPageData.nextOffset}`;

    return `${BILLING_API_ROUTES.invoices.list}_${subscription?.id}`;
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
  );

  if (error) console.error('Failed to fetch Invoices', error);

  const invoicesLoadingState: LoadingState = isLoading
    ? queryParams.pagination.currentPage > 1
      ? 'loading'
      : 'initializing'
    : 'finished';

  const loadInvoices = async () => {
    preload(getKey, fetcher);
  };

  const getInvoices = async (queryParams?: InvoicesQueryParams) => {
    setSize(queryParams?.pagination?.currentPage ?? size + 1);
  };

  const invoicesNextOffset = data?.[data?.length - 1]?.nextOffset;

  const invoices: Invoice[] =
    data
      ?.map((data) => data?.invoices)
      ?.reduce((acc, invoices) => acc.concat(invoices), []) ?? [];

  return {
    invoices,
    invoicesLoadingState,
    invoicesNextOffset,

    loadInvoices,
    getInvoices,
  };
};
