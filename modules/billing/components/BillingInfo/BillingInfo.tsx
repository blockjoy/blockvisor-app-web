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

  const handleUpdate = () => {
    console.log('Update');
  };

  return !isAdded ? (
    <>
      {!isAdding ? (
        <>
          <p css={styles.text}>
            You have not yet added any billing addresses. Click the button below
            to add one.
          </p>
          <Button onClick={() => handleAdding(true)} style="primary">
            Add a new Billing Address
          </Button>
        </>
      ) : (
        <BillingAddress
          handleAdding={handleAdding}
          billingAddress={BILLING_ADDRESS_DEFAULT}
        />
      )}
    </>
  ) : (
    <div css={styles.preview}>
      <BillingPreview billingAddress={BILLING_ADDRESS} />
      <Button onClick={() => handleUpdate()} style="outline">
        Update Billing Address
      </Button>
    </div>
  );
};
