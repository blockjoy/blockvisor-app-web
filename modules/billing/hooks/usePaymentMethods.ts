import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  Subscription,
  billingAtoms,
} from '@modules/billing';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
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

  const customer = useRecoilValue(billingAtoms.customer);
  const subscription = useRecoilValue(billingAtoms.subscription);

  const getPaymentMethods = async (
    params: _payment_source.payment_source_list_params,
  ) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.payments.sources.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: PaymentSource[] = await response.json();

      setPaymentMethods(data);
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

  const createPaymentMethod = async (paymentIntentId: string) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const params: _payment_source.create_using_payment_intent_params = {
        customer_id: customer?.id!,
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

      const data: PaymentSource = await response.json();

      const newPaymentMethods = paymentMethods?.filter(
        (paymentMethod: PaymentSource) => paymentMethod.id !== data?.id,
      );

      setPaymentMethods(newPaymentMethods);
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
