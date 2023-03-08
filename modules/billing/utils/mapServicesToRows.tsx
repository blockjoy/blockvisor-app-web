import { styles } from '../components/Invoices/InvoiceView/Services/Services.styles';

export const mapServicesToRows = (services?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Service Name',
      key: '1',
      width: '300px',
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
      width: '150px',
    },
  ];

  const rows: any = services?.map((service: any, idx: any) => ({
    key: service.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{service.title}</p>
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
            <p>{service.price}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <p>{service.totalPrice}</p>
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
            <p css={styles.totalTitle}>Grand Total</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <p css={styles.totalPrice}>$160.00</p>
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
