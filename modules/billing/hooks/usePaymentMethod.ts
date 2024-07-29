import { useRecoilState, useRecoilValue } from 'recoil';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { authAtoms } from '@modules/auth';
import {
  billingAtoms,
  PAYMENT_ERRORS,
  usePaymentMethods,
} from '@modules/billing';
import { organizationClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { ApplicationError } from '@modules/auth/utils/Errors';

interface PaymentMethodHook {
  paymentMethodLoadingState: LoadingState;
  initPaymentMethod: (
    onSuccess: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => Promise<void>;
}

export const usePaymentMethod = (): PaymentMethodHook => {
  const stripe = useStripe();
  const elements = useElements();

  const user = useRecoilValue(authAtoms.user);
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const [paymentMethodLoadingState, setPaymentMethodLoadingState] =
    useRecoilState(billingAtoms.paymentMethodLoadingState);

  const { getPaymentMethods } = usePaymentMethods();

  const initPaymentMethod = async (
    onSuccess: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setPaymentMethodLoadingState('initializing');

    try {
      if (!stripe || !elements) return;

      const clientSecret = await organizationClient.initCard(
        defaultOrganization?.id!,
        user?.id!,
      );

      if (!clientSecret) return;

      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(
              CardNumberElement,
            ) as StripeCardNumberElement,
          },
        },
        {
          handleActions: false,
        },
      );

      if (error)
        throw new ApplicationError(
          'InitCardError',
          error.message ?? 'Intent error',
        );

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const paymentMethods = await getPaymentMethods();
      console.log('setupIntent', setupIntent);
      console.log('paymentMethods', paymentMethods);

      if (!paymentMethods.length)
        throw new ApplicationError('InitCardError', 'Webhook failed');

      onSuccess();
    } catch (error) {
      onError?.(PAYMENT_ERRORS.FAILED);
    } finally {
      setPaymentMethodLoadingState('finished');
    }
  };

  return { paymentMethodLoadingState, initPaymentMethod };
};
