import { useRecoilValue } from 'recoil';
import { _payment_intent } from 'chargebee-typescript';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import {
  billingSelectors,
  BILLING_API_ROUTES,
  fetchBilling,
} from '@modules/billing';

interface IPaymentHook {
  createIntent: (
    amount?: number,
    referenceId?: string,
  ) => Promise<PaymentIntent | undefined>;
}

export const usePayment = (): IPaymentHook => {
  const customer = useRecoilValue(billingSelectors.customer);

  const createIntent = async (amount = 0, referenceId?: string) => {
    const params: _payment_intent.create_params = {
      amount,
      currency_code: 'USD',
      payment_method_type: 'card',
      customer_id: customer?.id,
    };

    if (referenceId) params['reference_id'] = referenceId;

    try {
      const response: PaymentIntent = await fetchBilling(
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
