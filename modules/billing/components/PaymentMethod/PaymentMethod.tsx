import { useEffect, useState } from 'react';
import { CreditCard, PaymentPreview, useCreditCard } from '@modules/billing';
import { Button } from '@shared/index';
import { styles } from './PaymentMethod.styles';

export const PaymentMethod = () => {
  const { creditCard, getCard, addCard } = useCreditCard();

  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    // getCard('card_1MlrZFB5ce1jJsfTsRthNrQW');
  }, []);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const actions: CreditCardActions = {
    add: addCard,
    cancel: handleCancel,
  };

  return !isAdding ? (
    !creditCard ? (
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
        <PaymentPreview card={creditCard} />
        <Button onClick={handleAdding} size="small" style="outline">
          Update Card
        </Button>
      </div>
    )
  ) : (
    <CreditCard actions={actions} />
  );
};
