import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Customer, PaymentIntent } from 'chargebee-typescript/lib/resources';
import {
  billingAtoms,
  useCustomer,
  usePayment,
  usePaymentMethods,
} from '@modules/billing';

interface PaymentMethodFormHook {
  loading: boolean;
  onSubmit: (
    cardRef: any,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentSourceId: string) => void,
  ) => void;
}

export const usePaymentMethodForm = (): PaymentMethodFormHook => {
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const [loading, setLoading] = useState(false);

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { provideCustomer } = useCustomer();

  const onSubmit = async (
    cardRef: any,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (customerId: string, paymentMethodId: string) => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const customerData: Customer | null = await provideCustomer();
      const intent: PaymentIntent = await createIntent();

      try {
        const data: PaymentIntent = await cardRef.current.authorizeWith3ds(
          intent,
          additionalData,
        );
        await createPaymentMethod(customerData?.id!, data.id, onSuccess);
      } catch (error: any) {
        const returnedError = JSON.parse(JSON.stringify(error));
        setError(returnedError);
      }
    } catch (error: any) {
      const returnedError = JSON.parse(JSON.stringify(error));
      setError(returnedError);
    } finally {
      setLoading(false);
    }
  };

  return { loading, onSubmit };
};
