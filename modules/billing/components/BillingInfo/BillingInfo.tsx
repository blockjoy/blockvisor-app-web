import { DetailsView, TableSkeleton } from '@shared/components';
import {
  BillingAddress,
  BillingContacts,
  useBillingAddress,
  useBillingContacts,
} from '@modules/billing';
import { useEffect } from 'react';

export const BillingInfo = () => {
  const { billingAddressLoadingState } = useBillingAddress();
  const { getBillingContacts, billingContactsLoadingState } =
    useBillingContacts();

  useEffect(() => {
    getBillingContacts();
  }, []);

  return (
    <>
      {billingAddressLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <div>
          <DetailsView headline="Billing Address">
            <BillingAddress />
          </DetailsView>
          <DetailsView headline="Billing Contacts">
            {billingContactsLoadingState !== 'finished' ? (
              <TableSkeleton />
            ) : (
              <BillingContacts />
            )}
          </DetailsView>
        </div>
      )}
    </>
  );
};
