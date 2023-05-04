import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms } from '@modules/billing';

export const usePaymentMethods = (): IPaymentMethodsHook => {
  const [paymentMethods, setPaymentMethods] = useRecoilState(
    billingAtoms.paymentMethods,
  );
  const [paymentMethodsLoadingState, setPaymentMethodsLoadingState] =
    useRecoilState(billingAtoms.paymentMethodsLoadingState);

  const customer = useRecoilValue(billingAtoms.customer);

  const getPaymentMethods = async (customerId: string) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/payments/sources/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: customerId }),
      });

      const data = await response.json();

      console.log('customerId123', customerId);
      console.log('data123', data);

      setPaymentMethods(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setPaymentMethodsLoadingState('finished');
    }
  };

  const createCard = async (paymentIntentId: string) => {
    const params = {
      customer_id: customer?.id,
      payment_intent: {
        id: paymentIntentId,
      },
    };

    try {
      const response = await fetch('/api/billing/payments/sources/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      console.log('CreateCard Data', data);
    } catch (error) {
      console.error('Failed to create payment method', error);
    }
  };

  return {
    paymentMethods,
    paymentMethodsLoadingState,

    getPaymentMethods,
    createCard,
  };
};
