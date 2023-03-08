import { useState } from 'react';
import { CreditCard, PaymentPreview } from '@modules/billing';
import {
  CREDIT_CARD,
  CREDIT_CARD_DEFAULT,
} from '@modules/billing/mocks/creditCard';
import { Button } from '@shared/index';
import { styles } from './PaymentMethod.styles';

const isAdded = false; /** REMOVE, TESTING PURPOSES */

export const PaymentMethod = () => {
  const [creditCard, setCreditCard] =
    useState<CreditCardForm>(CREDIT_CARD_DEFAULT);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = () => {
    setIsAdding(true);
    setCreditCard(CREDIT_CARD_DEFAULT);
  };

  const handleUpdate = () => {
    setIsAdding(true);
    setCreditCard(CREDIT_CARD);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return !isAdding ? (
    !isAdded ? (
      <div>
        <p css={styles.text}>
          You have not yet added any cards. Click the button below to add one.
        </p>
        <Button onClick={handleAdding} style="primary">
          Add a new Card
        </Button>
      </div>
    ) : (
      <div css={styles.preview}>
        <PaymentPreview cardNumber={CREDIT_CARD.cardnumber} />
        <Button onClick={handleUpdate} style="outline">
          Update Card
        </Button>
      </div>
    )
  ) : (
    <CreditCard handleCancel={handleCancel} card={creditCard} />
  );
};
