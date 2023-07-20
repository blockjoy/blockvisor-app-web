import { useRecoilValue } from 'recoil';
import {
  billingSelectors,
  BILLING_API_ROUTES,
  fetchBilling,
} from '@modules/billing';
import { _payment_intent } from 'chargebee-typescript';

interface IPaymentHook {
  createIntent: () => Promise<any>;
}

export const usePayment = (): IPaymentHook => {
  const customer = useRecoilValue(billingSelectors.customer);

  const createIntent = async () => {
    const params: _payment_intent.create_params = {
      amount: 0,
      currency_code: 'USD',
      payment_method_type: 'card',
      customer_id: customer?.id,
    };

    try {
      const response = await fetchBilling(
        BILLING_API_ROUTES.payments.intents.create,
        { params },
      );
      return response;
    } catch (error) {
      console.error('Error while creating Payment intent', error);
    }
  };

  return {
    createIntent,
  };
};
