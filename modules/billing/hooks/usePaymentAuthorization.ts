import { useRecoilValue } from 'recoil';
import { cbInstance, billingSelectors, usePayment } from '@modules/billing';

export const usePaymentAuthorization = () => {
  const pricing = useRecoilValue(billingSelectors.pricing);
  const customer = useRecoilValue(billingSelectors.customer);
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionPaymentMethod = useRecoilValue(
    billingSelectors.paymentMethodById(subscription?.payment_source_id!),
  );

  const { createIntent } = usePayment();

  const referenceId = subscriptionPaymentMethod
    ? subscriptionPaymentMethod?.reference_id
    : customer?.payment_method?.reference_id;

  const authorizePayment = async (onSuccess: any) => {
    try {
      const { total } = pricing;
      const intent = await createIntent(total, referenceId);

      cbInstance.load('3ds-handler').then(() => {
        let threeDSHandler = cbInstance.create3DSHandler();
        threeDSHandler.setPaymentIntent(intent);

        threeDSHandler
          .handleCardPayment()
          .then((paymentIntent: any) => {
            onSuccess();
          })
          .catch((err: any) => {
            console.log('Error occured during payment authorization', err);
          });
      });
    } catch (err: any) {
      console.log('Error occured during authorization', err);
    }
  };

  return {
    authorizePayment,
  };
};
