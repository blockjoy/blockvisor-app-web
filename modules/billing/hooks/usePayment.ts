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
    paymentMethodType?: 'card' | 'apple_pay' | 'google_pay',
  ) => Promise<PaymentIntent | undefined>;
}

export const usePayment = (): IPaymentHook => {
  const customer = useRecoilValue(billingSelectors.customer);

  const createIntent = async (
    amount: number = 0,
    referenceId?: string,
    paymentMethodType: string = 'card',
  ) => {
    const params: _payment_intent.create_params = {
      amount,
      currency_code: 'USD',
      payment_method_type: paymentMethodType,
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
