import { Table } from '@shared/index';
import {
  BillingContactDialog,
  mapBillingContactsToRows,
} from '@modules/billing';
import { useState } from 'react';
import { Contact } from 'chargebee-typescript/lib/resources';

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

  const onConfirm = (contact: Contact) => handleRemove(contact?.id);
  const onHide = () => setActiveView('list');

  const { headers, rows } = mapBillingContactsToRows(
    billingContacts,
    handleRemoveAction,
  );

  return (
    <>
      <Table isLoading={'finished'} headers={headers} rows={rows} />
      {activeView === 'dialog' && activeContact && (
        <BillingContactDialog
          activeContact={activeContact}
          onConfirm={onConfirm}
          onHide={onHide}
        />
      )}
    </>
  );
};
