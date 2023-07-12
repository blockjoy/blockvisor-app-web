import { useRecoilValue } from 'recoil';
import { billingSelectors, BILLING_API_ROUTES } from '@modules/billing';
import { _payment_intent } from 'chargebee-typescript';

export const usePayment = () => {
  const customer = useRecoilValue(billingSelectors.customer);

  const createIntent = async () => {
    const params: _payment_intent.create_params = {
      amount: 0,
      currency_code: 'USD',
      payment_method_type: 'card',
      customer_id: customer?.id,
    };

    return fetch(BILLING_API_ROUTES.payments.intents.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params }),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log('Error while creating a payment intent', err);
      });
  };

  return {
    createIntent,
  };
};
