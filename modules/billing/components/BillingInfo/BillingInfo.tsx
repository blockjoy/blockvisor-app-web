import { DetailsView } from '@shared/components';
import { BillingAddress, BillingContacts } from '@modules/billing';

export const BillingInfo = () => {
  return (
    <div>
      <DetailsView headline="Billing Address">
        <BillingAddress />
      </DetailsView>
      <DetailsView headline="Billing Contacts">
        <BillingContacts />
      </DetailsView>
    </div>
  );
};
