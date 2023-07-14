import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from './BillingContacts.styles';
import {
  BillingContactsList,
  BillingContactForm,
  useBillingContacts,
  checkIfBillingContactExists,
} from '@modules/billing';
import { Button, TableSkeleton } from '@shared/components';

export const BillingContacts = () => {
  const {
    billingContacts,
    billingContactsLoadingState,
    addBillingContact,
    removeBillingContact,
    getBillingContacts,
  } = useBillingContacts();

  const [activeView, setActiveView] = useState<'list' | 'action'>('list');

  const handleAdding = () => setActiveView('action');
  const handleCancel = () => setActiveView('list');

  const handleNewBillingContact = async (contact: IBillingContact) => {
    const isAdded = checkIfBillingContactExists(
      billingContacts,
      contact?.email,
    );

    if (isAdded) {
      toast.error(
        `${contact?.email?.toLowerCase()} is already added as a Billing Contact`,
      );
      return;
    }

    await addBillingContact(contact);
    setActiveView('list');
  };

  useEffect(() => {
    getBillingContacts();
  }, []);

  const actions: BillingContactsActions = {
    add: handleNewBillingContact,
    cancel: handleCancel,
  };

  return billingContactsLoadingState !== 'finished' ? (
    <TableSkeleton />
  ) : activeView === 'list' ? (
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
