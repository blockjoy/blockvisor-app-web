import { useIdentityRepository } from '@modules/auth';
import { Customer, PaymentIntent } from 'chargebee-typescript/lib/resources';
import { useSetRecoilState } from 'recoil';
import { billingAtoms } from '../store/billingAtoms';
import { useCustomer } from './useCustomer';
import { usePayment } from './usePayment';
import { usePaymentMethods } from './usePaymentMethods';

export const usePaymentMethodForm = (): any => {
  const setError = useSetRecoilState(billingAtoms.paymentMethodError);
  const setLoadingState = useSetRecoilState(
    billingAtoms.addPaymentMethodLoadingState,
  );

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { customer, createCustomer } = useCustomer();

  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const handleCustomerCheck = async () => {
    if (!customer) {
      try {
        const newCustomer = await createCustomer({
          id: user?.id,
          first_name: user?.firstName,
          last_name: user?.lastName,
          email: user?.email,
        });
        return newCustomer;
      } catch (error) {
        console.log(
          'Error while creating a customer in handlePaymentCreation',
          error,
        );
        return;
      }
    }

    return customer;
  };

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
      const customerData: Customer = await handleCustomerCheck();
      const intent: PaymentIntent = await createIntent();

      try {
        const data: PaymentIntent = await cardRef.current.authorizeWith3ds(
          intent,
          additionalData,
        );
        await createPaymentMethod(customerData.id, data.id, onSuccess);
      } catch (error: any) {
        setError(JSON.stringify(error));
      } finally {
        setLoadingState('finished');
      }
    } catch (error: any) {
      setError(JSON.stringify(error));
    }
  };

  return { onSubmit };
};
