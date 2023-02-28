import { Badge, Button } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';

export const mapInvoicesToRows = (invoices?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Date',
      key: '1',
      width: '300px',
    },
    {
      name: 'Amount',
      key: '2',
      width: '300px',
    },
    {
      name: 'Status',
      key: '3',
      width: '300px',
    },
    {
      name: '',
      key: '4',
    },
  ];

  const rows: any = invoices?.map((invoice: any, idx: any) => ({
    key: invoice.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{invoice.amount}</p>
          </>
        ),
      },
      {
        key: '3',
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
        key: '4',
        component: (
          <>
            <div css={[flex.display.flex]}>
              <Button style="outline" size="small">
                {`${invoice.status === 'paid' ? 'View' : 'Manage'}`}
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
