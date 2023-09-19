import { useState } from 'react';
import { Contact } from 'chargebee-typescript/lib/resources';
import { ConfirmDialog, Table } from '@shared/components';
import { billingSelectors, mapBillingContactsToRows } from '@modules/billing';
import { useRecoilValue } from 'recoil';

export type BillingContactsListProps = {
  billingContacts: Contact[];
  handleRemove: (id: string) => void;
};

export const BillingContactsList = ({
  billingContacts,
  handleRemove,
}: BillingContactsListProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');

  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  const handleRemoveAction = (contact: Contact) => {
    setActiveContact(contact);
    setActiveView('dialog');
  };

  const onConfirm = () => handleRemove(activeContact?.id!);
  const onHide = () => setActiveView('list');

  const { headers, rows } = mapBillingContactsToRows(
    billingContacts,
    handleRemoveAction,
    subscription?.status,
  );

  return (
    <>
      <Table isLoading={'finished'} headers={headers} rows={rows} />
      {activeView === 'dialog' &&
        activeContact &&
        subscription?.status === 'active' && (
          <ConfirmDialog
            title="Remove Billing Contact"
            message={`You are removing ${activeContact?.email} from Billing Contacts list.`}
            handleConfirm={onConfirm}
            onHide={onHide}
          />
        )}
    </>
  );
};
