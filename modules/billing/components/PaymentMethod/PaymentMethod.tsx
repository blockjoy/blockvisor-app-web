import { CreditCard } from '@modules/billing';
import { CREDIT_CARD } from '@modules/billing/mocks/creditCard';
import { Button } from '@shared/index';
import { useState } from 'react';
import { styles } from './PaymentMethod.styles';

export const PaymentMethod = () => {
  const isAdded = false;
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = (isAdding: boolean) => {
    setIsAdding(isAdding);
  };

  return (
    <>
      <div>
        {!isAdding && (
          <>
            <p css={styles.text}>
              {!isAdded ? (
                <>
                  You have not yet added any cards. Click the button below to
                  add one.
                </>
              ) : (
                <>
                  <b>MasterCard</b> ending in <b>1234</b>
                </>
              )}
            </p>
            <Button
              onClick={() => handleAdding(true)}
              style={!isAdded ? 'primary' : 'outline'}
            >
              {!isAdded ? 'Add a new Card' : 'Update Card'}
            </Button>
          </>
        )}
      </div>

      <div>
        {isAdding && (
          <CreditCard handleAdding={handleAdding} card={CREDIT_CARD} />
        )}
      </div>
    </>
  );
};
