import { RefObject, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import ChargebeeComponents from '@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup';
import {
  billingAtoms,
  useCustomer,
  usePayment,
  usePaymentMethods,
} from '@modules/billing';

interface PaymentMethodFormHook {
  loading: boolean;
  onSubmit: (
    cardRef: RefObject<ChargebeeComponents>,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentSourceId: string) => void,
  ) => Promise<void>;
}

export const usePaymentMethodForm = (): PaymentMethodFormHook => {
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const [loading, setLoading] = useState(false);

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { provideCustomer } = useCustomer();

  const onSubmit = async (
    cardRef: RefObject<ChargebeeComponents>,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentMethodId: string) => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const customerData = await provideCustomer();
      const intent = await createIntent();

      try {
        await cardRef.current?.authorizeWith3ds(intent, additionalData, {
          success: async (payment_intent: PaymentIntent) => {
            await createPaymentMethod(
              customerData?.id!,
              payment_intent.id,
              onSuccess,
            );

            setLoading(false);
          },
        });
      } catch (error: any) {
        const returnedError = JSON.parse(JSON.stringify(error));
        setError(returnedError);
        setLoading(false);
        throw returnedError;
      }
    } catch (error: any) {
      const returnedError = JSON.parse(JSON.stringify(error));
      setError(returnedError);
      setLoading(false);
    }
  };

  return { loading, onSubmit };
};
