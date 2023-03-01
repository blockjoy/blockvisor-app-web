import { BillingAddress, BillingPreview } from '@modules/billing';
import {
  BILLING_ADDRESS,
  BILLING_ADDRESS_DEFAULT,
} from '@modules/billing/mocks/billingAddress';
import { Button } from '@shared/index';
import { useState } from 'react';
import { styles } from './BillingInfo.styles';

export const BillingInfo = () => {
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
                You have not yet added any billing addresses. Click the button
                below to add one.
              </>
            ) : (
              <BillingPreview billingAddress={BILLING_ADDRESS} />
            )}
          </p>{' '}
          <Button
            onClick={() => handleAdding(true)}
            style={!isAdded ? 'primary' : 'outline'}
          >
            {!isAdded ? 'Add a new Billing Address' : 'Edit Billing Address'}
          </Button>
        </>
      ) : (
        <BillingAddress
          handleAdding={handleAdding}
          billingAddress={BILLING_ADDRESS_DEFAULT}
        />
      )}
    </>
  );
};
