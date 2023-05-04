import { useRecoilValue } from 'recoil';
import { billingAtoms } from '../store/billingAtoms';

export const usePayment = () => {
  const customer = useRecoilValue(billingAtoms.customer);

  const createIntent = async () => {
    const params = {
      amount: 0,
      currency_code: 'USD',
      payment_method_type: 'card',
      customer_id: customer?.id,
    };

    return fetch('/api/billing/payments/intents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log('error', err);
      });
  };

  return {
    createIntent,
  };
};
