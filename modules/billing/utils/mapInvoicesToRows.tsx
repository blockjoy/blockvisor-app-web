import { Badge } from '@shared/components';
import { formatters } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { typo } from 'styles/utils.typography.styles';
import { InvoiceDownloadPDF } from '@modules/billing';
import { Invoice } from 'chargebee-typescript/lib/resources';

export const mapInvoicesToRows = (invoices?: Invoice[]) => {
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

  const rows: Row[] =
    invoices?.map((invoice: Invoice) => ({
      key: invoice.id,
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
              <p>{formatters.formatDate(invoice?.date!)}</p>
            </>
          ),
        },
        {
          key: '3',
          component: (
            <>
              <p>{formatters.formatCurrency(invoice?.total!)}</p>
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
                <InvoiceDownloadPDF invoice={invoice} />
              </div>
            </>
          ),
        },
      ],
    })) ?? [];

  return {
    rows,
    headers,
  };
};
