import { useRecoilState, useRecoilValue } from 'recoil';
import { _payment_source } from 'chargebee-typescript';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
  useSubscription,
} from '@modules/billing';

interface IPaymentMethodsHook {
  paymentMethod: PaymentSource | null;
  paymentMethods: PaymentSource[];
  paymentMethodsLoadingState: LoadingState;
  paymentMethodLoadingState: LoadingState;
  getPaymentMethod: (id: string) => Promise<void>;
  getPaymentMethods: VoidFunction;
  createPaymentMethod: (
    customerId: string,
    paymentIntentId: string,
    onSuccess: (customerId: string, paymentSourceId: string) => void,
  ) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
  fetchPaymentMethods: VoidFunction;
}

export const usePaymentMethods = (): IPaymentMethodsHook => {
  const [paymentMethods, setPaymentMethods] = useRecoilState(
    billingAtoms.paymentMethods,
  );
  const [paymentMethodsLoadingState, setPaymentMethodsLoadingState] =
    useRecoilState(billingAtoms.paymentMethodsLoadingState);

  const [paymentMethod, setPaymentMethod] = useRecoilState(
    billingAtoms.paymentMethod,
  );
  const [paymentMethodLoadingState, setPaymentMethodLoadingState] =
    useRecoilState(billingAtoms.paymentMethodLoadingState);

  const [customer, setCustomer] = useRecoilState(billingSelectors.customer);

  const subscription = useRecoilValue(billingSelectors.subscription);
  const { getSubscription } = useSubscription();

  const getPaymentMethod = async (id: string) => {
    setPaymentMethodLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.payments.sources.get, {
        id,
      });

      setPaymentMethod(data);
    } catch (error) {
      console.error('Failed to fetch Payment method', error);
    } finally {
      setPaymentMethodLoadingState('finished');
    }
  };

  const getPaymentMethods = async () => {
    setPaymentMethodsLoadingState('initializing');

    const params: _payment_source.payment_source_list_params = {
      customer_id: { is: customer?.id },
      type: { is: 'card' },
    };

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.payments.sources.list,
        { params },
      );

      setPaymentMethods(data);
    } catch (error) {
      console.error('Failed to fetch Payment methods', error);
    } finally {
      setPaymentMethodsLoadingState('finished');
    }
  };

  const createPaymentMethod = async (
    customerId: string,
    paymentIntentId: string,
    onSuccess: (customerId: string, paymentSourceId: string) => void,
  ) => {
    setPaymentMethodLoadingState('initializing');

    try {
      const params: _payment_source.create_using_payment_intent_params = {
        customer_id: customer?.id ? customer.id : customerId,
        payment_intent: {
          id: paymentIntentId,
        },
      };

      const data = await fetchBilling(
        BILLING_API_ROUTES.payments.sources.create,
        { params },
      );

      console.log('%cCreatePaymentMethod', 'color: #bff589', { params, data });

      const { paymentSource, customer: customerData } = data;

      const newPaymentMethods = [paymentSource, ...paymentMethods];

      setPaymentMethods(newPaymentMethods);

      setCustomer(customerData);

      onSuccess(customerData?.id, paymentSource?.id);
    } catch (error) {
      console.error('Failed to create Payment method', error);
    } finally {
      setPaymentMethodLoadingState('finished');
    }
  };

  const deletePaymentMethod = async (id: string) => {
    setPaymentMethodLoadingState('initializing');
    setPaymentMethodsLoadingState('loading');

    try {
      const data = await fetchBilling(
        BILLING_API_ROUTES.payments.sources.delete,
        { id },
      );

      const { paymentSource, customer: customerData } = data;

      const newPaymentMethods = paymentMethods?.filter(
        (paymentMethod: PaymentSource) =>
          paymentMethod.id !== paymentSource?.id,
      );

      setPaymentMethods(newPaymentMethods);

      setCustomer(customerData);

      if (subscription?.payment_source_id === id)
        getSubscription(subscription?.id);
    } catch (error) {
      console.error('Failed to delete Payment method', error);
    } finally {
      setPaymentMethodLoadingState('finished');
      setPaymentMethodsLoadingState('finished');
    }
  };

  const fetchPaymentMethods = async () => {
    if (paymentMethods && paymentMethods.length) {
      setPaymentMethodsLoadingState('finished');
      return;
    }

    await getPaymentMethods();
  };

  return {
    paymentMethod,
    paymentMethodLoadingState,
    paymentMethods,
    paymentMethodsLoadingState,

    getPaymentMethods,
    getPaymentMethod,
    createPaymentMethod,
    deletePaymentMethod,

    fetchPaymentMethods,
  };
};
