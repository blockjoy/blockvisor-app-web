import { BillingAddress, BillingPreview } from '@modules/billing';
import {
  BILLING_ADDRESS,
  BILLING_ADDRESS_DEFAULT,
} from '@modules/billing/mocks/billingAddress';
import { Button } from '@shared/index';
import { useState } from 'react';
import { styles } from './BillingInfo.styles';

const isAdded = false; /** REMOVE, TESTING PURPOSES */

export const BillingInfo = () => {
  const [billingAddress, setBillingAddress] = useState<BillingAddressForm>(
    BILLING_ADDRESS_DEFAULT,
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = () => {
    setIsAdding(true);
    setBillingAddress(BILLING_ADDRESS_DEFAULT);
  };

  const handleUpdate = () => {
    setIsAdding(true);
    setBillingAddress(BILLING_ADDRESS);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return !isAdding ? (
    !isAdded ? (
      <div>
        <p css={styles.text}>
          You have not yet added any billing addresses. Click the button below
          to add one.
        </p>
        <Button onClick={handleAdding} style="primary">
          Add a new Billing Address
        </Button>
      </div>
    ) : (
      <div css={styles.preview}>
        <BillingPreview billingAddress={BILLING_ADDRESS} />
        <Button onClick={handleUpdate} style="outline">
          Update Billing Address
        </Button>
      </div>
    )
  ) : (
    <BillingAddress
      handleCancel={handleCancel}
      billingAddress={billingAddress}
    />
  );
};
