import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BillingAddressForm, billingAtoms } from '@modules/billing';
import { Button, TableSkeleton, Unauthorized } from '@shared/components';
import { authSelectors } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';

export const BillingAddress = () => {
  const billingAddress = useRecoilValue(billingAtoms.billingAddress);
  const billingAddressLoadingState = useRecoilValue(
    billingAtoms.billingAddressLoadingState,
  );
  const canCreateBillingAddress = useRecoilValue(
    authSelectors.hasPermission('org-address-get'),
  );

  const [isAdding, setIsAdding] = useState<boolean>(!!billingAddress);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  if (!canCreateBillingAddress)
    return (
      <Unauthorized>
        You don't have permission to create a billing address for the current
        organization! Try switching the organization or contact your
        administrator.
      </Unauthorized>
    );

  if (billingAddressLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <>
      {!billingAddress && !isAdding ? (
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
