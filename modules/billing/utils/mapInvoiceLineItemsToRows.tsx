import { css } from '@emotion/react';
import { LineItem } from '@modules/grpc/library/blockjoy/v1/org';
import { formatters } from '@shared/index';
import { Badge } from '@shared/components';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import { typo } from 'styles/utils.typography.styles';

const styles = {
  description: css`
    display: inline-flex;
    flex-flow: row nowrap;
    gap: 5px;
    align-items: flex-start;
    width: 100%;
  `,
  nickname: (theme: ITheme) => css`
    display: block;
    color: ${theme.colorPlaceholder};
    margin-top: 2px;
    font-size: 15px;
  `,
  discounts: css`
    display: inline-flex;
    flex-flow: row wrap;
    gap: 5px;
  `,
  period: css`
    gap: 3px;
  `,
  periodEnd: (theme: ITheme) => css`
    color: ${theme.colorPlaceholder};
  `,
  amount: css`
    display: inline-flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    gap: 5px;
    align-items: flex-end;
  `,
  discountedPrice: (theme: ITheme) => css`
    color: ${theme.colorPlaceholder};
    text-decoration: line-through;
    font-size: 14px;
  `,
};

export const mapInvoiceLineItemsToRows = (items?: LineItem[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Service Name',
      key: '1',
      width: '350px',
    },
    {
      name: 'Period',
      key: '2',
      width: '100px',
    },
    {
      name: 'Qty',
      key: '3',
      width: '50px',
      textAlign: 'center',
    },
    {
      name: 'Unit price',
      key: '4',
      width: '150px',
      textAlign: 'right',
    },
    {
      name: 'Total price',
      key: '5',
      width: '180px',
      textAlign: 'right',
    },
  ];

  const rows: TableRow[] =
    items?.map((item, i) => ({
      key: `${i}`,
      cells: [
        {
          key: '1',
          component: (
            <div css={styles.description}>
              <span css={typo.ellipsis} style={{ maxWidth: '90%' }}>
                {item.description}
                <span css={styles.nickname}>{item.plan}</span>
              </span>
              {item?.discounts.length ? (
                <span css={styles.discounts}>
                  {item?.discounts.map((discountAmount, i) => (
                    <Badge key={i} color="primary" style="outline">
                      {discountAmount.name}
                    </Badge>
                  ))}
                </span>
              ) : null}
            </div>
          ),
        },
        {
          key: '2',
          component:
            item?.start && item.end ? (
              <div
                css={[styles.period, flex.display.flex, flex.direction.column]}
              >
                <span>{formatters.formatTimestamp(item?.start!)}</span>
                <span css={styles.periodEnd}>
                  {formatters.formatTimestamp(item?.end!)}
                </span>
              </div>
            ) : (
              '-'
            ),
        },
        {
          key: '3',
          component: <span>{item.quantity}</span>,
        },
        {
          key: '4',
          component: (
            <span>{formatters.formatCurrency(item?.unitAmount!)}</span>
          ),
        },
        {
          key: '5',
          component: (
            <div css={styles.amount}>
              <span
                {...(item?.subtotal !== item?.total && {
                  css: styles.discountedPrice,
                })}
              >
                {formatters.formatCurrency(item?.subtotal!)}
              </span>
              {item?.subtotal !== item?.total && (
                <span>{formatters.formatCurrency(item.total!)}</span>
              )}
            </div>
          ),
        },
      ],
    })) ?? [];

  return {
    rows,
    headers,
  };
};
