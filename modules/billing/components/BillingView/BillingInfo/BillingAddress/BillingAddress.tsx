import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BillingAddressForm, billingSelectors } from '@modules/billing';
import { Button } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export const BillingAddress = () => {
  const hasBillingAddress = useRecoilValue(billingSelectors.hasBillingAddress);
  const [isAdding, setIsAdding] = useState<boolean>(hasBillingAddress);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  return (
    <>
      {!isAdding ? (
        <div>
          <p css={spacing.bottom.medium}>
            You have not yet added any customer information. Click the button
            below to add one.
          </p>
          <Button onClick={handleAdding} size="small" style="primary">
            Add Customer Information
          </Button>
        </div>
      ) : (
        <BillingAddressForm handleCancel={handleCancel} />
      )}
    </>
  );
};
