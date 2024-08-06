import { mapInvoiceLineItemsToRows } from '@modules/billing';
import { Table } from '@shared/components';

export type InvoiceLineItemsProps = {
  items: any[];
};

export const InvoiceLineItems = ({ items }: InvoiceLineItemsProps) => {
  const { headers, rows } = mapInvoiceLineItemsToRows(items);

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
