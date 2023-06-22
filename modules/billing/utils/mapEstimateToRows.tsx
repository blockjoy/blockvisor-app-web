import { formatters } from '@shared/index';
import { InvoiceEstimateLineItem } from 'chargebee-typescript/lib/resources';
import { typo } from 'styles/utils.typography.styles';

export const mapEstimateItemsToRows = (
  items?: InvoiceEstimateLineItem[],
  total?: number,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '200px',
    },
    {
      name: 'Quantity',
      key: '2',
      width: '100px',
    },
    {
      name: 'Unit price',
      key: '3',
      width: '150px',
    },
    {
      name: 'Total price',
      key: '4',
      width: '150px',
    },
  ];

  const rows: Row[] =
    items?.map((item: InvoiceEstimateLineItem) => ({
      key: item?.id!,
      cells: [
        {
          key: '1',
          component: (
            <>
              <p css={typo.ellipsis} style={{ maxWidth: '90%' }}>
                {item?.description}
              </p>
            </>
          ),
        },
        {
          key: '2',
          component: (
            <>
              <p>{item?.quantity}</p>
            </>
          ),
        },
        {
          key: '3',
          component: (
            <>
              <p>{formatters.formatCurrency(item?.unit_amount!)}</p>
            </>
          ),
        },
        {
          key: '4',
          component: (
            <>
              <p>{formatters.formatCurrency(item?.amount!)}</p>
            </>
          ),
        },
      ],
    })) ?? [];

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
