import { TableSkeleton } from '@shared/components';
import { BillingAddress, billingAtoms } from '@modules/billing';
import { useRecoilValue } from 'recoil';

export const BillingInfo = () => {
  const billingAddressLoadingState = useRecoilValue(
    billingAtoms.billingAddressLoadingState,
  );

  return (
    <>
      {billingAddressLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <BillingAddress />
      )}
    </>
  );
};
