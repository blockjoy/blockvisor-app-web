import { Table } from '@shared/index';
import {
  BillingContactDialog,
  mapBillingContactsToRows,
} from '@modules/billing';
import { useState } from 'react';
import { Contact } from 'chargebee-typescript/lib/resources/customer';

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

  const [activeContact, setActiveContact] = useState<any>(null);

  const handleRemoveAction = (contact: any) => {
    setActiveContact(contact);
    setActiveView('dialog');
  };

  const onCofirm = (id: string) => handleRemove(id);
  const onHide = () => setActiveView('list');

  const { headers, rows } = mapBillingContactsToRows(
    billingContacts,
    handleRemoveAction,
  );

  return (
    <>
      <Table isLoading={'finished'} headers={headers} rows={rows} />
      {activeView === 'dialog' && (
        <BillingContactDialog
          activeContact={activeContact}
          onCofirm={onCofirm}
          onHide={onHide}
        />
      )}
    </>
  );
};
