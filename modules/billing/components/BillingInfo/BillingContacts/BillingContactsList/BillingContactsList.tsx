import { Table } from '@shared/index';
import {
  BillingContactDialog,
  mapBillingContactsToRows,
} from '@modules/billing/';
import { useState } from 'react';

export type BillingContactsListProps = {
  billingContacts: IBillingContact[];
  handleRemove: (id: string) => void;
};

export const BillingContactsList = ({
  billingContacts,
  handleRemove,
}: BillingContactsListProps) => {
  const [activeView, setActiveView] =
    useState<string | 'list' | 'action'>('list');

  const [activeContact, setActiveContact] = useState<any>(null);

  const handleRemoveAction = (contact: any) => {
    setActiveContact(contact);
    setActiveView('action');
  };
  const onHide = () => setActiveView('list');

  const { headers, rows } = mapBillingContactsToRows(
    billingContacts,
    handleRemoveAction,
  );

  return (
    <>
      <Table isLoading={'finished'} headers={headers} rows={rows} />
      {activeView === 'action' && (
        <BillingContactDialog
          activeContact={activeContact}
          handleRemove={handleRemove}
          onHide={onHide}
        />
      )}
    </>
  );
};
