import { DetailsView, TableSkeleton } from '@shared/components';
import {
  BillingAddress,
  BillingContacts,
  useBillingAddress,
  useBillingContacts,
} from '@modules/billing';
import { useEffect } from 'react';

export const BillingInfo = () => {
  const { billingAddress, billingAddressLoadingState } = useBillingAddress();
  const { getBillingContacts, billingContactsLoadingState } =
    useBillingContacts();

  useEffect(() => {
    getBillingContacts();
  }, []);

  return (
    <>
      {billingAddressLoadingState !== 'finished' ||
      billingContactsLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <div>
          <DetailsView headline="Billing Address">
            <BillingAddress />
          </DetailsView>
          <DetailsView headline="Billing Contacts">
            <BillingContacts />
          </DetailsView>
        </div>
      )}
    </>
  );
};
