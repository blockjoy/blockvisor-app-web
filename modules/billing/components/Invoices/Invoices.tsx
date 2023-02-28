import { INVOICES } from '@modules/billing/mocks/invoices';
import { mapInvoicesToRows } from '@modules/billing/utils/mapInvoicesToRows';
import { Table } from '@shared/index';

export const Invoices = () => {
  const { headers, rows } = mapInvoicesToRows(INVOICES);

  const handleInvoiceClicked = () => {
    console.log('INVOICE');
  };
  return (
    <Table
      isLoading={'finished'}
      headers={headers}
      rows={rows}
      onRowClick={handleInvoiceClicked}
    />
  );
};
