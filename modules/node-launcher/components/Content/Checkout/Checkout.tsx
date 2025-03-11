import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  billingSelectors,
  PaymentMethodsListItem,
  PaymentRequired,
} from '@modules/billing';
import { Button } from '@shared/components';
import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';

export const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultPaymentMethod = useRecoilValue(
    billingSelectors.defaultPaymentMethod,
  );

  const setError = useSetRecoilState(nodeLauncherAtoms.error);

  useEffect(() => {
    setError((prevError) => ({
      ...prevError,
      BILLING_NO_PAYMENT_METHOD: !Boolean(defaultPaymentMethod),
    }));
  }, [defaultPaymentMethod]);

  return (
    <>
      <PaymentRequired
        isOpen={isOpen}
        warningMessage={`Launching a Node requires a payment method.`}
        handleCancel={() => setIsOpen(false)}
      />

      {defaultPaymentMethod ? (
        <PaymentMethodsListItem paymentMethod={defaultPaymentMethod!} />
      ) : (
        <Button style="secondary" size="small" onClick={() => setIsOpen(true)}>
          Add payment method
        </Button>
      )}
    </>
  );
};
