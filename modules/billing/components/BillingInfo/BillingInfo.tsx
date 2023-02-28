import { BillingAddress } from '@modules/billing';
import { BILLING_ADDRESS } from '@modules/billing/mocks/billingAddress';
import { Button } from '@shared/index';
import { useState } from 'react';
import { styles } from './BIllingInfo.styles';

export const BillingInfo = () => {
  const isAdded = false;
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = (isAdding: boolean) => {
    setIsAdding(isAdding);
  };

  const billingAddress = BILLING_ADDRESS;

  return (
    <>
      <div>
        {!isAdding && (
          <>
            <p css={styles.text}>
              {!isAdded ? (
                <>
                  You have not yet added any billing addresses. Click the button
                  below to add one.
                </>
              ) : (
                <div css={styles.address}>
                  <span>Mark Mryant</span>
                  <span>Grounded Skynet LTD.</span>
                  <span>8625 South Drive</span>
                  <span>Buffalo, NY 14224</span>
                  <span>USA</span>
                  <span>VAT: 12345678912345</span>
                </div>
              )}
            </p>{' '}
            <Button
              onClick={() => handleAdding(true)}
              style={!isAdded ? 'primary' : 'outline'}
            >
              {!isAdded ? 'Add a new Billing Address' : 'Edit Billing Address'}
            </Button>
          </>
        )}
      </div>

      <div>
        {isAdding && (
          <BillingAddress
            handleAdding={handleAdding}
            billingAddress={billingAddress}
          />
        )}
      </div>
    </>
  );
};
