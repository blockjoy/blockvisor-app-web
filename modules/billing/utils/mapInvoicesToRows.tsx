import { Badge, Button } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';
import IconDownload from '@public/assets/icons/download-12.svg';

export const mapInvoicesToRows = (invoices?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'ID',
      key: '1',
      width: '200px',
    },
    {
      name: 'Date',
      key: '2',
      width: '300px',
    },
    {
      name: 'Amount',
      key: '3',
      width: '300px',
    },
    {
      name: 'Status',
      key: '4',
      width: '300px',
    },
    {
      name: '',
      key: '5',
    },
  ];

  const rows: any = invoices?.map((invoice: any, idx: any) => ({
    key: invoice.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{invoice.id}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{invoice.amount}</p>
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
              <Button style="outline" size="small">
                <IconDownload />
                <span>Download</span>
              </Button>
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
