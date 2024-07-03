import { css } from '@emotion/react';
import { formatters } from '@shared/index';
import { Badge } from '@shared/components';
import { calcDiscount } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';

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
  amount: css`
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    gap: 5px;
    align-items: flex-end;
  `,
  discountedPrice: (theme: ITheme) => css`
    color: ${theme.colorPlaceholder};
    text-decoration: line-through;
    font-size: 14px;
  `,
  total: css`
    font-weight: 700;
    font-size: 20px;
    texttransform: uppercase;
  `,
  totalLabel: css`
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    vertical-align: bottom;
  `,
};

export const mapEstimatesToRows = (items?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '350px',
    },
    {
      name: 'Quantity',
      key: '2',
      width: '90px',
      textAlign: 'center',
    },
    {
      name: 'Unit price',
      key: '3',
      width: '180px',
      textAlign: 'right',
    },
    {
      name: 'Total price',
      key: '4',
      width: '200px',
      textAlign: 'right',
    },
  ];

  const rows: Row[] =
    items?.map((item) => {
      const totalAmount = item?.discount_amounts.length
        ? item?.amount - calcDiscount(item?.discount_amounts)
        : item?.amount;

      return {
        key: item?.id!,
        isClickable: false,
        cells: [
          {
            key: '1',
            component: (
              <div css={styles.description}>
                <span css={typo.ellipsis} style={{ maxWidth: '90%' }}>
                  {item?.description}
                  <span css={styles.nickname}>{item.plan?.nickname}</span>
                </span>
                {item?.discount_amounts.length ? (
                  <span css={styles.discounts}>
                    {item?.discount_amounts.map((discountAmount: any) => (
                      <Badge
                        key={discountAmount.discount?.id}
                        color="primary"
                        style="outline"
                      >
                        {discountAmount.discount?.coupon?.name}
                      </Badge>
                    ))}
                  </span>
                ) : null}
              </div>
            ),
          },
          {
            key: '2',
            component: <span>{item?.quantity}</span>,
          },
          {
            key: '3',
            component: (
              <span>
                {formatters.formatCurrency(item?.price?.unit_amount!)}
              </span>
            ),
          },
          {
            key: '4',
            component: (
              <div css={styles.amount}>
                <span
                  {...(item?.amount !== totalAmount && {
                    css: styles.discountedPrice,
                  })}
                >
                  {formatters.formatCurrency(item?.amount!)}
                </span>
                {item?.amount !== totalAmount && (
                  <span>{formatters.formatCurrency(totalAmount)}</span>
                )}
              </div>
            ),
          },
        ],
      };
    }) ?? [];

  const total =
    items?.reduce((acc: number, item) => {
      const discountAmount = calcDiscount(item?.discount_amounts);

      return acc + (item?.amount - discountAmount);
    }, 0) ?? 0;

  const totalRow: Row = {
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
        component: <span css={styles.totalLabel}>Grand Total</span>,
      },
      {
        key: '4',
        component: (
          <span css={styles.total}>{formatters.formatCurrency(total)}</span>
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
