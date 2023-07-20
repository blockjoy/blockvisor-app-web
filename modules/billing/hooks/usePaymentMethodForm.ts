import { Customer, PaymentIntent } from 'chargebee-typescript/lib/resources';
import { useSetRecoilState } from 'recoil';
import { billingAtoms } from '../store/billingAtoms';
import { useCustomer } from './useCustomer';
import { usePayment } from './usePayment';
import { usePaymentMethods } from './usePaymentMethods';

interface PaymentMethodFormHook {
  onSubmit: (
    cardRef: any,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (paymentSourceId: string, customerId: string) => void,
  ) => void;
}

export const usePaymentMethodForm = (): PaymentMethodFormHook => {
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const setLoadingState = useSetRecoilState(
    billingAtoms.addPaymentMethodLoadingState,
  );

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { provideCustomer } = useCustomer();

  const onSubmit = async (
    cardRef: any,
    additionalData: { billingAddress: BillingAddressAdditionalData },
    onSuccess: (paymentSourceId: string, customerId: string) => void,
  ) => {
    setLoadingState('initializing');
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

        console.log('%cCreateIntent', 'color: #bff589', {
          customerData,
          intent,
          data,
        });
      } catch (error: any) {
        const returnedError = JSON.parse(JSON.stringify(error));
        setError(returnedError);
      }
    } catch (error: any) {
      const returnedError = JSON.parse(JSON.stringify(error));
      setError(returnedError);
    } finally {
      setLoadingState('finished');
    }
  };

  return { onSubmit };
};
