import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import {
  PaymentMethodCreateParams,
  StripeCardNumberElement,
} from '@stripe/stripe-js';
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { authAtoms } from '@modules/auth';
import { billingAtoms, usePaymentMethods } from '@modules/billing';
import { organizationClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';

interface PaymentMethodHook {
  paymentMethodLoadingState: LoadingState;
  initPaymentMethod: (
    billingDetails: PaymentMethodCreateParams.BillingDetails,
    onSuccess: VoidFunction,
  ) => Promise<void>;
}

export const usePaymentMethod = (): PaymentMethodHook => {
  const stripe = useStripe();
  const elements = useElements();

  const user = useRecoilValue(authAtoms.user);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const [paymentMethodLoadingState, setPaymentMethodLoadingState] =
    useRecoilState(billingAtoms.paymentMethodLoadingState);

  const { getPaymentMethods } = usePaymentMethods();

  const initPaymentMethod = async (
    billingDetails: PaymentMethodCreateParams.BillingDetails,
    onSuccess: VoidFunction,
  ) => {
    setPaymentMethodLoadingState('initializing');
    setError(null);

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
            billing_details: billingDetails,
          },
        },
        {
          handleActions: false,
        },
      );

      if (error) {
        const returnedError = handlePaymentMethodError(error);
        throw returnedError;
      }

      setTimeout(async () => {
        const paymentMethods = await getPaymentMethods();
        console.log('setupIntent', setupIntent);
        console.log('paymentMethods', paymentMethods);

        // const isPMInTheList = paymentMethods.find(
        //   (pm) => pm?.id === setupIntent.payment_method,
        // );

        onSuccess();
        setPaymentMethodLoadingState('finished');

        toast.success('Payment method added');
      }, 5000);
    } catch (error: any) {
      const returnedError = handlePaymentMethodError(error);
      throw returnedError;
    }
  };

  const handlePaymentMethodError = (error: any) => {
    const returnedError = structuredClone(error);
    setError(returnedError);
    setPaymentMethodLoadingState('finished');

    return returnedError;
  };

  return { paymentMethodLoadingState, initPaymentMethod };
};
