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
import { Alert, Button, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';

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

  const handleNew = async (contact: IBillingContact) => {
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

    toast.success('Billing Contact added');

    setActiveView('list');
  };

  const handleRemove = async (id: string) => {
    await removeBillingContact(id);

    toast.success('Billing Contact removed');
  };

  const actions: BillingContactsActions = {
    add: handleNew,
    cancel: handleCancel,
  };

  if (
    billingContactsLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  if (!(subscription?.status === 'active'))
    return (
      <div css={containers.medium}>
        <Alert>
          Unlock the full potential of our platform by ensuring your
          subscription is active. Only then can you view billing contacts.
        </Alert>
      </div>
    );

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
            handleRemove={handleRemove}
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
