import { BillingAddress } from '@modules/billing';
import { Button } from '@shared/index';
import { useState } from 'react';
import { styles } from './BIllingInfo.styles';

export const BillingInfo = () => {
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
              You have not yet added any billing addresses. Click the button
              below to add one.
            </>
          ) : (
            <>
              <span>Mark Mryant</span>
              <span>Grounded Skynet LTD.</span>
              <span>8625 South Drive</span>
              <span>Buffalo, NY 14224</span>
              <span>USA</span>
              <span>VAT: 12345678912345</span>
            </>
          )}
        </p>
        {!isAdding && (
          <Button onClick={() => handleAdding(true)}>
            {!isAdded ? 'Add a new Billing Address' : 'Edit Billing Address'}
          </Button>
        )}
      </div>

      <div>{isAdding && <BillingAddress handleAdding={handleAdding} />}</div>
    </>
  );
};
