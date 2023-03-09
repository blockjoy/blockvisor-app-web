import { BillingContactsList, BillingContactForm } from '@modules/billing';
import { styles } from './BillingContacts.styles';
import { BILLING_CONTACT_DEFAULT } from '@modules/billing/mocks/billingContact';
import { Button } from '@shared/components';
import { useState } from 'react';

const isAdded = true; /** REMOVE, TESTING PURPOSES */

export const BillingContacts = () => {
  const [billingContact, setBillingContact] = useState<BillingContactForm>(
    BILLING_CONTACT_DEFAULT,
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdding = () => {
    setIsAdding(true);
    setBillingContact(BILLING_CONTACT_DEFAULT);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return !isAdding ? (
    <div css={styles.wrapper}>
      {!isAdded ? (
        <p>
          You have not yet added any billing contacts. Click the button below to
          add one.
        </p>
      ) : (
        <BillingContactsList />
      )}
      <Button onClick={handleAdding} style="outline">
        Add a new Billing Contact
      </Button>
    </div>
  ) : (
    <BillingContactForm
      handleCancel={handleCancel}
      billingContact={billingContact}
    />
  );
};
