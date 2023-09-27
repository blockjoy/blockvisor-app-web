import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import {
  BillingContactsList,
  BillingContactForm,
  useBillingContacts,
  checkIfBillingContactExists,
  billingSelectors,
  billingAtoms,
} from '@modules/billing';
import { Button, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export const BillingContacts = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const {
    billingContacts,
    billingContactsLoadingState,
    addBillingContact,
    removeBillingContact,
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

  const actions: BillingContactsActions = {
    add: handleNewBillingContact,
    cancel: handleCancel,
  };

  if (
    billingContactsLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return activeView === 'list' ? (
    <>
      <div css={spacing.bottom.medium}>
        {!billingContacts?.length ? (
          <p>
            You have not yet added any billing contacts. Click the button below
            to add one.
          </p>
        ) : (
          <BillingContactsList
            billingContacts={billingContacts}
            handleRemove={removeBillingContact}
          />
        )}
      </div>
      {subscription?.status === 'active' && (
        <Button onClick={handleAdding} size="small" style="outline">
          Add Billing Contact
        </Button>
      )}
    </>
  ) : (
    <BillingContactForm actions={actions} />
  );
};
