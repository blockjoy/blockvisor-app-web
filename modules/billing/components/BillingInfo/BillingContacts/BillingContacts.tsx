import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from './BillingContacts.styles';
import {
  BillingContactsList,
  BillingContactForm,
  useBillingContacts,
  checkIfExists,
} from '@modules/billing';
import { Button } from '@shared/components';

export const BillingContacts = () => {
  const {
    getBillingContacts,
    billingContacts,
    addBillingContact,
    removeBillingContact,
  } = useBillingContacts();

  const [activeView, setActiveView] = useState<'list' | 'action'>('list');

  useEffect(() => {
    // getBillingContacts('contact_1MlrZFB5ce1jJsfTsRthNrQW');
  }, []);

  const handleAdding = () => setActiveView('action');
  const handleCancel = () => setActiveView('list');

  const handleNewBillingContact = async (contact: IBillingContact) => {
    const isAdded = checkIfExists(billingContacts, contact?.email);

    if (isAdded) {
      toast.error(`${contact?.email} is already added as a Billing Contact`);
      return;
    }

    await addBillingContact(contact);
    setActiveView('list');
  };

  const actions: BillingContactsActions = {
    add: handleNewBillingContact,
    cancel: handleCancel,
  };

  return activeView === 'list' ? (
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
