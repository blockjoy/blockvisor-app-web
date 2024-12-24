import { css } from '@emotion/react';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';
import { Badge } from '@shared/components';
import { formatters } from '@shared/index';
import {
  getInvoiceStatusColor,
  getInvoiceStatusText,
  InvoiceDownload,
} from '@modules/billing';

export const mapInvoicesToRows = (invoices: Invoice[]) => {
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

  const rows: TableRow[] =
    invoices?.map((invoice) => ({
      key: invoice?.number!,
      cells: [
        {
          key: '1',
          component: (
            <span
              css={css`
                white-space: nowrap;
              `}
            >
              {invoice?.number}
            </span>
          ),
        },
        {
          key: '2',
          component: invoice?.total ? (
            <span>{formatters.formatCurrency(invoice.total)}</span>
          ) : (
            '-'
          ),
        },
        {
          key: '3',
          component: invoice?.createdAt ? (
            <span>{formatters.formatDate(invoice.createdAt!)}</span>
          ) : (
            '-'
          ),
        },
        {
          key: '5',
          component: (
            <Badge
              color={getInvoiceStatusColor(invoice?.status)}
              style="outline"
            >
              {getInvoiceStatusText(invoice?.status)}
            </Badge>
          ),
        },
        {
          key: '6',
          component: invoice?.pdfUrl ? (
            <InvoiceDownload invoicePdf={invoice.pdfUrl} />
          ) : (
            '-'
          ),
        },
      ],
    })) ?? [];

  return {
    rows,
    headers,
  };
};
