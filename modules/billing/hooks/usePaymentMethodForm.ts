import { RefObject } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import ChargebeeComponents from '@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup';
import {
  billingAtoms,
  useCustomer,
  usePayment,
  usePaymentMethods,
} from '@modules/billing';

interface PaymentMethodFormHook {
  paymentMethodLoadingState: LoadingState;
  onSubmit: (
    cardRef: RefObject<ChargebeeComponents>,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentSourceId: string) => void,
  ) => Promise<void>;
}

export const usePaymentMethodForm = (): PaymentMethodFormHook => {
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const [paymentMethodLoadingState, setPaymentMethodLoadingState] =
    useRecoilState(billingAtoms.paymentMethodLoadingState);

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { provideCustomer } = useCustomer();

  const onSubmit = async (
    cardRef: RefObject<ChargebeeComponents>,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentMethodId: string) => void,
  ) => {
    setPaymentMethodLoadingState('initializing');
    setError(null);

    const handleSuccess = (customerId: string, paymentMethodId: string) => {
      onSuccess(customerId, paymentMethodId);
      setPaymentMethodLoadingState('finished');
    };

    try {
      try {
        const intent = await createIntent();
        await cardRef.current?.authorizeWith3ds(intent, additionalData, {
          success: async (payment_intent: PaymentIntent) => {
            const customerData = await provideCustomer();

            await createPaymentMethod(
              customerData?.id!,
              payment_intent.id,
              handleSuccess,
            );
          },
        });
      } catch (error: any) {
        const returnedError = handlePaymentMethodError(error);
        throw returnedError;
      }
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

  return { paymentMethodLoadingState, onSubmit };
};
