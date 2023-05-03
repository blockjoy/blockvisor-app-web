import { formatCurrency } from '@shared/index';
import { typo } from 'styles/utils.typography.styles';

export const mapServicesToRows = (services?: any[], total?: number) => {
  const headers: TableHeader[] = [
    {
      name: 'Service Name',
      key: '1',
      width: '200px',
    },
    {
      name: 'Quantity',
      key: '2',
      width: '100px',
    },
    {
      name: 'Price',
      key: '3',
      width: '150px',
    },
    {
      name: 'Total',
      key: '4',
      width: '200px',
    },
  ];

  const rows: TableRow[] = services!.map((service: any, idx: any) => ({
    key: service.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p css={typo.ellipsis} style={{ maxWidth: '90%' }}>
              {service.description}
            </p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{service.quantity}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{formatCurrency(service.amount)}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <p>{formatCurrency(service.amount)}</p>
          </>
        ),
      },
    ],
  }));

  const totalRow = {
    key: 'total',
    cells: [
      {
        key: '1',
        component: null,
      },
      {
        key: '2',
        component: null,
      },
      {
        key: '3',
        component: (
          <>
            <p
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Grand Total
            </p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <p
              style={{
                fontSize: '20px',
                width: '100%',
              }}
            >
              {formatCurrency(total!)}
            </p>
          </>
        ),
      },
    ],
  };

  rows.push(totalRow);

  return {
    rows,
    headers,
  };
};
