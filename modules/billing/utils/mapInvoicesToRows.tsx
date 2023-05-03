import { Badge } from '@shared/components';
import { formatCurrency, formatDate } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { typo } from 'styles/utils.typography.styles';
import { InvoiceDownload } from '@modules/billing';

export const mapInvoicesToRows = (invoices?: IInvoice[]) => {
  const headers: TableHeader[] = [
    {
      name: 'ID',
      key: '1',
      width: '200px',
    },
    {
      name: 'Date',
      key: '2',
      width: '200px',
    },
    {
      name: 'Amount',
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
      width: '150px',
    },
  ];

  const rows: TableRow[] = invoices!.map((invoice: any, idx: any) => ({
    key: invoice.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p css={typo.ellipsis} style={{ maxWidth: '90%' }}>
              {invoice.id}
            </p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{formatDate(invoice.date)}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{formatCurrency(invoice.total)}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <Badge
              color={`${invoice.status === 'paid' ? 'primary' : 'note'}`}
              style="outline"
            >
              {invoice.status}
            </Badge>
          </>
        ),
      },
      {
        key: '5',
        component: (
          <>
            <div css={[flex.display.flex]}>
              <InvoiceDownload invoice={invoice} />
            </div>
          </>
        ),
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
