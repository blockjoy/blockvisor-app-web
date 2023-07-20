import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './BillingAddress.styles';
import { BillingAddressForm, billingSelectors } from '@modules/billing';
import { Button } from '@shared/components';

export const BillingAddress = () => {
  const hasBillingAddress = useRecoilValue(billingSelectors.hasBillingAddress);
  const [isAdding, setIsAdding] = useState<boolean>(hasBillingAddress);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  return (
    <>
      {!isAdding ? (
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
        <BillingAddressForm handleCancel={handleCancel} />
      )}
    </>
  );
};
