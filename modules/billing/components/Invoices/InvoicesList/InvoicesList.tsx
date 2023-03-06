import { INVOICES } from '@modules/billing/mocks/invoices';
import { mapInvoicesToRows } from '@modules/billing/';
import { ROUTES, Table } from '@shared/index';
import { useRouter } from 'next/router';

export const InvoicesTable = () => {
  const router = useRouter();
  const { headers, rows } = mapInvoicesToRows(INVOICES);

  const handleRowClicked = (id: any) => {
    router.push(ROUTES.INVOICE(id.key));
  };

  return (
    <Table
      isLoading={'finished'}
      onRowClick={handleRowClicked}
      headers={headers}
      rows={rows}
    />
  );
};
