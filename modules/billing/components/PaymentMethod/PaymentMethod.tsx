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

  return (
    <>
      {!isAdding ? (
        <>
          <p css={styles.text}>
            {!isAdded ? (
              <>
                You have not yet added any cards. Click the button below to add
                one.
              </>
            ) : (
              <PaymentPreview cardNumber={CREDIT_CARD.cardnumber} />
            )}
          </p>
          <Button
            onClick={() => handleAdding(true)}
            style={!isAdded ? 'primary' : 'outline'}
          >
            {!isAdded ? 'Add a new Card' : 'Update Card'}
          </Button>
        </>
      ) : (
        <CreditCard handleAdding={handleAdding} card={CREDIT_CARD_DEFAULT} />
      )}
    </>
  );
};
