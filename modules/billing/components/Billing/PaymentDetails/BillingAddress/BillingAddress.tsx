import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  BillingAddressForm,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { Button, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export const BillingAddress = () => {
  const billingAddressLoadingState = useRecoilValue(
    billingAtoms.billingAddressLoadingState,
  );

  const hasBillingAddress = useRecoilValue(billingSelectors.hasBillingAddress);
  const [isAdding, setIsAdding] = useState<boolean>(hasBillingAddress);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  if (billingAddressLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <>
      {!isAdding ? (
        <div>
          <p css={spacing.bottom.medium}>
            You have not yet added a billing address. Click the button below to
            add one.
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
