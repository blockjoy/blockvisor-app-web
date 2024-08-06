import { useState } from 'react';

import { ConfirmDialog, Table } from '@shared/components';
import { billingAtoms, mapBillingContactsToRows } from '@modules/billing';
import { useRecoilValue } from 'recoil';

export type BillingContactsListProps = {
  billingContacts: any[];
  handleRemove: (id: string) => Promise<void>;
};

export const BillingContactsList = ({
  billingContacts,
  handleRemove,
}: BillingContactsListProps) => {
  const subscription = useRecoilValue(billingAtoms.subscription);

  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');

  const [activeContact, setActiveContact] = useState<any | null>(null);

  const handleRemoveAction = (contact: any) => {
    setActiveContact(contact);
    setActiveView('dialog');
  };

  const onConfirm = async () => await handleRemove(activeContact?.id!);

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
