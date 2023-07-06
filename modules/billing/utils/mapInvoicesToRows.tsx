import { Badge, TableBlock } from '@shared/components';
import { formatters } from '@shared/index';
import { InvoiceDownloadPDF } from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';

export const mapInvoicesToRows = (invoices?: Invoice[]) => {
  const headers: TableHeader[] = [
    {
      name: 'ID',
      key: '1',
      width: '100px',
    },
    {
      name: 'Info',
      key: '2',
      width: '300px',
    },
    {
      name: 'Amount',
      key: '3',
      width: '150px',
    },
    {
      name: 'Due date',
      key: '4',
      width: '100px',
    },
    {
      name: 'Status',
      key: '5',
      width: '100px',
    },
    {
      name: '',
      key: '6',
      width: '80px',
    },
  ];

  const rows: Row[] =
    invoices?.map((invoice: Invoice) => ({
      key: invoice.id,
      cells: [
        {
          key: '1',
          component: <p>#{invoice.id}</p>,
        },
        {
          key: '2',
          component: (
            <TableBlock
              name={invoice?.line_items?.[0].description!}
              address={
                <p>
                  {`${formatters.formatDate(
                    invoice?.line_items?.[0].date_from!,
                  )} - ${formatters.formatDate(
                    invoice?.line_items?.[0].date_to!,
                  )}`}
                </p>
              }
            />
          ),
        },
        {
          key: '3',
          component: <p>{formatters.formatCurrency(invoice?.total!)}</p>,
        },
        {
          key: '4',
          component: <p>{formatters.formatDate(invoice?.due_date!)}</p>,
        },
        {
          key: '5',
          component: (
            <Badge
              color={`${invoice.status === 'paid' ? 'primary' : 'note'}`}
              style="outline"
            >
              {invoice.status}
            </Badge>
          ),
        },
        {
          key: '6',
          component: <InvoiceDownloadPDF invoice={invoice} />,
        },
      ],
    })) ?? [];

  return {
    rows,
    headers,
  };
};
