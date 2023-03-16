import { useEffect, useState } from 'react';
import { CreditCard, PaymentPreview, useCreditCard } from '@modules/billing';
import { Button } from '@shared/index';
import { styles } from './PaymentMethod.styles';
import { useRecoilValue } from 'recoil';
import { billingSelectors } from '@modules/billing/store/billingSelectors';

export const PaymentMethod = () => {
  const { creditCard, getCard } = useCreditCard();
  const isAdded = useRecoilValue(billingSelectors.isAddedCreditCard);

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  useEffect(() => {
    // getCard('card_1MlrZFB5ce1jJsfTsRthNrQW');
  }, []);

  return !isAdding ? (
    !isAdded ? (
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
    <CreditCard handleCancel={handleCancel} />
  );
};
