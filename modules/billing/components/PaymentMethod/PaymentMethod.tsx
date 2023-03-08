import { useState } from 'react';
import { CreditCard, PaymentPreview } from '@modules/billing';
import {
  CREDIT_CARD,
  CREDIT_CARD_DEFAULT,
} from '@modules/billing/mocks/creditCard';
import { Button } from '@shared/index';
import { styles } from './PaymentMethod.styles';

export const PaymentMethod = () => {
  const isAdded = false;
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = (isAdding: boolean) => {
    setIsAdding(isAdding);
  };

  const handleUpdate = () => {
    console.log('Update');
  };

  return !isAdded ? (
    <>
      {!isAdding ? (
        <div>
          <p css={styles.text}>
            You have not yet added any cards. Click the button below to add one.
          </p>
          <Button onClick={() => handleAdding(true)} style="primary">
            Add a new Card
          </Button>
        </div>
      ) : (
        <CreditCard handleAdding={handleAdding} card={CREDIT_CARD_DEFAULT} />
      )}
    </>
  ) : (
    <div css={styles.preview}>
      <PaymentPreview cardNumber={CREDIT_CARD.cardnumber} />
      <Button onClick={() => handleUpdate()} style="outline">
        Update Card
      </Button>
    </div>
  );
};
