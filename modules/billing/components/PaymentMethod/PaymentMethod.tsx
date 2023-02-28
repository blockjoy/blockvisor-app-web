import { CreditCard } from '@modules/billing';
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
        <p css={styles.text}>
          {!isAdded ? (
            <>
              You have not yet added any cards. Click the button below to add
              one.
            </>
          ) : (
            <>
              <b>MasterCard</b> ending in <b>1234</b>
            </>
          )}
        </p>
        {!isAdding && (
          <Button onClick={() => handleAdding(true)}>
            {!isAdded ? 'Add a new Card' : 'Update Card'}
          </Button>
        )}
      </div>

      <div>{isAdding && <CreditCard handleAdding={handleAdding} />}</div>
    </>
  );
};
