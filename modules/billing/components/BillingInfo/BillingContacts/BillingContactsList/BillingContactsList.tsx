import { Table } from '@shared/index';
import { BILLING_CONTACTS } from '@modules/billing/mocks/billingContact';
import { mapBillingContactsToRows } from '@modules/billing/';

export const BillingContactsList = () => {
  const handleRemove = () => {
    () => console.log('REMOVED');
  };

  const { headers, rows } = mapBillingContactsToRows(
    BILLING_CONTACTS,
    handleRemove,
  );

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
