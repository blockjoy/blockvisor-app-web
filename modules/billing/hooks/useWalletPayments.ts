import { useRecoilState } from 'recoil';
import {
  billingAtoms,
  cbInstance,
  useCustomer,
  usePayment,
  usePaymentMethods,
} from '@modules/billing';

export const useWalletPayments = () => {
  const [applePayLoadingState, setApplePayLoadingState] = useRecoilState(
    billingAtoms.applePayLoadingState,
  );
  const [googlePayLoadingState, setGooglePayLoadingState] = useRecoilState(
    billingAtoms.googlePayLoadingState,
  );

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();
  const { provideCustomer } = useCustomer();

  const initApplePay = async () => {
    setApplePayLoadingState('initializing');

    try {
      const customerData = await provideCustomer();

      cbInstance.load('apple-pay').then((applePayHandler: any) => {
        createIntent(0, undefined, 'apple_pay')
          .then(async (payment_intent) => {
            applePayHandler.setPaymentIntent(payment_intent);

            const applePayButton = await applePayHandler.mountPaymentButton(
              '#apple-pay-button',
            );

            setApplePayLoadingState('finished');

            return applePayButton;
          })
          .then(() => {
            return applePayHandler.handlePayment({
              success: function (result: any) {
                // result.paymentIntent contains payment intent
                // result.paymentData contains card details like last4, brand
                createPaymentMethod(
                  customerData?.id!,
                  result?.paymentIntent?.id,
                );
              },
              error: function (error: any) {
                console.log('error', error);
              },
            });
          })
          .then(() => {
            console.log('Apple Pay has been successfully added');
          })
          .catch((error) => {
            console.error('Error occured while adding the Apple Pay', error);
            setApplePayLoadingState('finished');
          });
      });
    } catch (error: any) {
      console.error('Error occured while initializing the Google Pay', error);
      setApplePayLoadingState('finished');
    }
  };

  const initGooglePay = async () => {
    setGooglePayLoadingState('initializing');

    try {
      const customerData = await provideCustomer();

      cbInstance.load('google-pay').then((gpayHandler: any) => {
        createIntent(0, undefined, 'google_pay')
          .then(async (payment_intent) => {
            gpayHandler.setPaymentIntent(payment_intent);

            const gpayButton = await gpayHandler.mountPaymentButton(
              '#gpay-button',
            );

            setGooglePayLoadingState('finished');

            return gpayButton;
          })
          .then(() => gpayHandler.handlePayment())
          .then((result) =>
            createPaymentMethod(customerData?.id!, result?.paymentIntent?.id),
          )
          .then(() => {
            console.log('Google Pay has been successfully added');
          })
          .catch((error) => {
            console.error('Error occured while adding the Google Pay', error);
            setGooglePayLoadingState('finished');
          });
      });
    } catch (error: any) {
      console.error('Error occured while initializing the Google Pay', error);
      setGooglePayLoadingState('finished');
    }
  };

  return {
    applePayLoadingState,
    googlePayLoadingState,

    initApplePay,
    initGooglePay,
  };
};
