import { useRecoilState } from 'recoil';
import { CREDIT_CARD } from '../mocks/creditCard';
import { billingAtoms } from '@modules/billing';

export const usePaymentMethods = (): IPaymentMethodsHook => {
  const [paymentMethods, setPaymentMethods] = useRecoilState(
    billingAtoms.paymentMethods,
  );
  const [paymentMethodsLoadingState, setPaymentMethodsLoadingState] =
    useRecoilState(billingAtoms.paymentMethodsLoadingState);

  const getPaymentMethods = async (customerId: string) => {
    setPaymentMethodsLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/payments/list', {
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

  return {
    paymentMethods,
    paymentMethodsLoadingState,

    getPaymentMethods,
  };
};
