import { Badge } from '@shared/components';
import { formatters } from '@shared/index';
import {
  getInvoiceStatusColor,
  getInvoiceStatusText,
  InvoiceDownload,
} from '@modules/billing';

export const mapInvoicesToRows = (invoices?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Invoice number',
      key: '1',
      width: '250px',
    },
    {
      name: 'Amount',
      key: '2',
      width: '180px',
    },
    {
      name: 'Date',
      key: '3',
      width: '150px',
    },
    {
      name: 'Status',
      key: '4',
      width: '100px',
    },
    {
      name: '',
      key: '5',
      width: '80px',
      textAlign: 'right',
    },
  ];

  const rows: Row[] =
    invoices?.map((invoice: any) => ({
      key: invoice.id,
      cells: [
        {
          key: '1',
          component: <span>{invoice.id}</span>,
        },
        {
          key: '2',
          component: <span>{formatters.formatCurrency(invoice?.total!)}</span>,
        },
        {
          key: '3',
          component: <span>{formatters.formatTimestamp(invoice.created)}</span>,
        },
        {
          key: '5',
          component: (
            <Badge
              color={getInvoiceStatusColor(invoice.status)}
              style="outline"
            >
              {getInvoiceStatusText(invoice.status)}
            </Badge>
          ),
        },
        {
          key: '6',
          component: <InvoiceDownload invoicePdf={invoice.invoice_pdf} />,
        },
      ],
    })) ?? [];

  return {
    rows,
    headers,
  };
};
