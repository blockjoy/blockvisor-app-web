import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';

interface IPaymentMethodHook {
  paymentMethod: PaymentSource | null;
  paymentMethodLoadingState: LoadingState;
  getPaymentMethod: VoidFunction;
}

export const usePaymentMethod = (): IPaymentMethodHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.payments.sources.get, {
      id: subscription?.payment_source_id,
    });

  const { data, error, isLoading, mutate } = useSWR(
    () =>
      subscription?.payment_source_id
        ? BILLING_API_ROUTES.payments.sources.get
        : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  if (error) console.error('Failed to fetch Payment Methods', error);

  const paymentMethodLoadingState: LoadingState = isLoading
    ? 'initializing'
    : 'finished';

  const getPaymentMethod = () => mutate();

  return {
    paymentMethod: data,
    paymentMethodLoadingState,

    getPaymentMethod,
  };
};
