import { useRecoilState, useRecoilValue } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { Customer, PaymentSource } from 'chargebee-typescript/lib/resources';
import { _payment_source } from 'chargebee-typescript';

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

  const [customer, setCustomer] = useRecoilState(billingAtoms.customer);

  const getPaymentMethods = async () => {
    setPaymentMethodsLoadingState('initializing');

    const params: _payment_source.payment_source_list_params = {
      customer_id: { is: customer?.id },
      type: { is: 'card' },
    };

    try {
      const response = await fetch(BILLING_API_ROUTES.payments.sources.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch payment methods. Status: ${response.status}, Status Text: ${response.statusText}`,
        );
        setPaymentMethods([]);
      } else {
        const data: PaymentSource[] = await response.json();
        setPaymentMethods(data);
      }
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setPaymentMethodsLoadingState('finished');
    }
  };

  const getPaymentMethod = async (id: string) => {
    setPaymentMethodLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.payments.sources.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data: PaymentSource = await response.json();

      setPaymentMethod(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setPaymentMethodLoadingState('finished');
    }
  };

  const createPaymentMethod = async (
    customerId: string,
    paymentIntentId: string,
    onSuccess: (paymentSourceId: string) => void,
  ) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const params: _payment_source.create_using_payment_intent_params = {
        customer_id: customer?.id ? customer.id : customerId,
        payment_intent: {
          id: paymentIntentId,
        },
      };

      const response = await fetch(BILLING_API_ROUTES.payments.sources.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: PaymentSource = await response.json();

      const newPaymentMethods = [...paymentMethods, data];

      setPaymentMethods(newPaymentMethods);

      onSuccess(data?.id);
    } catch (error) {
      console.error('Failed to create payment method', error);
    } finally {
      setPaymentMethodsLoadingState('finished');
    }
  };

  const deletePaymentMethod = async (id: string) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const params: { id: string } = { id };

      const response = await fetch(BILLING_API_ROUTES.payments.sources.delete, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: { customer: Customer; paymentSource: PaymentSource } =
        await response.json();

      const { customer, paymentSource } = data;

      const newPaymentMethods = paymentMethods?.filter(
        (paymentMethod: PaymentSource) =>
          paymentMethod.id !== paymentSource?.id,
      );

      setPaymentMethods(newPaymentMethods);

      setCustomer(customer);
    } catch (error) {
      console.error('Failed to delete payment method', error);
    } finally {
      setPaymentMethodsLoadingState('finished');
    }
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
  };
};
