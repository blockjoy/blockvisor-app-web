import { useState } from 'react';
import { styles } from './BillingAddress.styles';
import {
  BillingAddressPreview,
  BillingAddressForm,
  useBillingAddress,
} from '@modules/billing';
import { Button } from '@shared/components';

export const BillingAddress = () => {
  const { billingAddress, addBillingAddress } = useBillingAddress();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const actions: BillingAddressActions = {
    add: addBillingAddress,
    cancel: handleCancel,
  };

  return !isAdding ? (
    !billingAddress ? (
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
        <BillingAddressPreview billingAddress={billingAddress} />
        <Button onClick={handleAdding} size="small" style="outline">
          Update Billing Address
        </Button>
      </div>
    )
  ) : (
    <BillingAddressForm actions={actions} billingAddress={billingAddress} />
  );
};
