import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  BillingContactsList,
  BillingContactForm,
  useBillingContacts,
  checkIfBillingContactExists,
} from '@modules/billing';
import { Button, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

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

  if (billingContactsLoadingState !== 'finished') return <TableSkeleton />;

  return activeView === 'list' ? (
    <>
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

      <Button
        onClick={handleAdding}
        size="small"
        style="outline"
        customCss={[spacing.top.medium]}
      >
        Add Billing Contact
      </Button>
    </>
  ) : (
    <BillingContactForm actions={actions} />
  );
};
