import { formatters } from '@shared/index';
import { InvoiceLineItem } from 'chargebee-typescript/lib/resources';
import { typo } from 'styles/utils.typography.styles';

export const mapServicesToRows = (
  services?: InvoiceLineItem[],
  total?: number,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Service Name',
      key: '1',
      width: '150px',
    },
    {
      name: 'Period',
      key: '2',
      width: '150px',
    },
    {
      name: 'Quantity',
      key: '3',
      width: '100px',
    },
    {
      name: 'Price',
      key: '4',
      width: '150px',
    },
  ];

  const rows: Row[] = services!.map((service: InvoiceLineItem) => ({
    key: service?.id!,
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
            <p>{`${formatters.formatDate(
              service?.date_from!,
            )} - ${formatters.formatDate(service?.date_to!)}`}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{service.quantity}</p>
          </>
        ),
      },

      {
        key: '4',
        component: (
          <>
            <p>{formatters.formatCurrency(service?.amount!)}</p>
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
              {formatters.formatCurrency(total!)}
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
