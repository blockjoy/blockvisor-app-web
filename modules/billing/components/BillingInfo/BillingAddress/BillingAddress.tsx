import { useState } from 'react';
import { styles } from './BillingAddress.styles';
import { BillingAddressPreview, BillingAddressForm } from '@modules/billing';
import {
  BILLING_ADDRESS,
  BILLING_ADDRESS_DEFAULT,
} from '@modules/billing/mocks/billingAddress';
import { Button } from '@shared/components';

const isAdded = true; /** REMOVE, TESTING PURPOSES */

export const BillingAddress = () => {
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
        <Button onClick={handleAdding} size="small" style="primary">
          Add Billing Address
        </Button>
      </div>
    ) : (
      <div css={styles.preview}>
        <BillingAddressPreview billingAddress={BILLING_ADDRESS} />
        <Button onClick={handleUpdate} size="small" style="outline">
          Update Billing Address
        </Button>
      </div>
    )
  ) : (
    <BillingAddressForm
      handleCancel={handleCancel}
      billingAddress={billingAddress}
    />
  );
};
