import { useState } from 'react';
import { Contact } from 'chargebee-typescript/lib/resources';
import { ConfirmDialog, Table } from '@shared/components';
import { mapBillingContactsToRows } from '@modules/billing';

export type BillingContactsListProps = {
  billingContacts: Contact[];
  handleRemove: (id: string) => void;
};

export const BillingContactsList = ({
  billingContacts,
  handleRemove,
}: BillingContactsListProps) => {
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
  );

  return (
    <>
      <Table isLoading={'finished'} headers={headers} rows={rows} />
      {activeView === 'dialog' && activeContact && (
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
