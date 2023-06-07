import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import { useSetRecoilState } from 'recoil';
import { billingAtoms } from '../store/billingAtoms';
import { usePayment } from './usePayment';
import { usePaymentMethods } from './usePaymentMethods';

export const usePaymentMethodForm = (): any => {
  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);

  const setLoadingState = useSetRecoilState(
    billingAtoms.paymentMethodLoadingState,
  );

  const onSubmit = async (
    cardRef: any,
    additionalData: {
      firstName: string;
      lastName: string;
      addressLine1: string;
      city: string;
      zip: string;
      countryCode: string;
    },
    onSuccess: VoidFunction,
  ) => {
    setLoadingState('initializing');
    setError(null);

    try {
      const intent: PaymentIntent = await createIntent();

      cardRef.current
        .authorizeWith3ds(intent, additionalData)
        .then((data: PaymentIntent) => {
          console.log('authorizeWith3ds Data', data);

          createPaymentMethod(data.id, onSuccess);
        })
        .catch((error: any) => {
          setError(JSON.stringify(error));
          console.log('authorizeWith3ds Error', error);
        })
        .finally(() => {
          setLoadingState('finished');
        });

      return;
    } catch (error: any) {
      setError('true');
    }
  };

  return { onSubmit };
};
