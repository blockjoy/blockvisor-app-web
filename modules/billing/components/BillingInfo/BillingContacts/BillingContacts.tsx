import { BillingContactsList, BillingContactForm } from '@modules/billing';
import { styles } from './BillingContacts.styles';
import { Button } from '@shared/components';
import { useEffect, useState } from 'react';
import { useBillingContacts } from '@modules/billing/hooks/useBillingContacts';

export const BillingContacts = () => {
  const {
    getBillingContacts,
    billingContacts,
    addBillingContact,
    removeBillingContact,
  } = useBillingContacts();

  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    // getBillingContacts('contact_1MlrZFB5ce1jJsfTsRthNrQW');
  }, []);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const actions: BillingContactsActions = {
    add: addBillingContact,
    cancel: handleCancel,
  };

  return !isAdding ? (
    <div css={styles.wrapper}>
      {!billingContacts.length ? (
        <p>
          You have not yet added any billing contacts. Click the button below to
          add one.
        </p>
      ) : (
        <BillingContactsList
          billingContacts={billingContacts}
          handleRemove={removeBillingContact}
        />
      )}
      <Button onClick={handleAdding} size="small" style="outline">
        Add Billing Contact
      </Button>
    </div>
  ) : (
    <BillingContactForm actions={actions} />
  );
};
