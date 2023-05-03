import { useEffect, useState } from 'react';
import {
  CreditCard,
  PaymentPreview,
  useCreditCard,
  useCustomer,
  usePaymentMethods,
} from '@modules/billing';
import { Button, TableSkeleton } from '@shared/index';
import { styles } from './PaymentMethod.styles';

// TODO: rename to PaymentMethods
export const PaymentMethod = () => {
  const { creditCard, getCard, addCard } = useCreditCard();
  const { customer } = useCustomer();
  const { paymentMethods, getPaymentMethods, paymentMethodsLoadingState } =
    usePaymentMethods();

  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    getPaymentMethods(customer.id);
  }, []);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  return paymentMethodsLoadingState !== 'finished' ? (
    <TableSkeleton />
  ) : !isAdding ? (
    !paymentMethods || !paymentMethods?.length ? (
      <div>
        <p css={styles.text}>
          You have not yet added any cards. Click the button below to add one.
        </p>
        <Button onClick={handleAdding} style="primary">
          Add Credit Card
        </Button>
      </div>
    ) : (
      <div css={styles.preview}>
        <PaymentPreview items={paymentMethods} />
      </div>
    )
  ) : (
    <>
      <CreditCard handleCancel={handleCancel} />
    </>
  );
};
