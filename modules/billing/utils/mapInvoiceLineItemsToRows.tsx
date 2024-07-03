import { css } from '@emotion/react';
import { formatters } from '@shared/index';
import { Badge } from '@shared/components';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import { typo } from 'styles/utils.typography.styles';

const styles = {
  nickname: (theme: ITheme) => css`
    display: block;
    color: ${theme.colorPlaceholder};
    margin-top: 2px;
    font-size: 15px;
  `,
  period: css`
    gap: 3px;
  `,
  periodEnd: (theme: ITheme) => css`
    color: ${theme.colorPlaceholder};
  `,
  amountWrapper: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  `,
  badge: css`
    margin-right: 5px;
  `,
};

export const mapInvoiceLineItemsToRows = (items?: any[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Service Name',
      key: '1',
      width: '350px',
    },
    {
      name: 'Period',
      key: '2',
      width: '200px',
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
      width: '100px',
      textAlign: 'right',
    },
    {
      name: 'Total price',
      key: '5',
      width: '180px',
      textAlign: 'right',
    },
  ];

  const rows: Row[] =
    items?.map((item: any) => ({
      key: item?.id!,
      cells: [
        {
          key: '1',
          component: (
            <span css={typo.ellipsis} style={{ maxWidth: '90%' }}>
              {item.description}
              <span css={styles.nickname}>{item.plan?.nickname}</span>
            </span>
          ),
        },
        {
          key: '2',
          component: (
            <div
              css={[styles.period, flex.display.flex, flex.direction.column]}
            >
              <span>{formatters.formatTimestamp(item?.period?.start)}</span>
              <span css={styles.periodEnd}>
                {formatters.formatTimestamp(item?.period?.end)}
              </span>
            </div>
          ),
        },
        {
          key: '3',
          component: <span>{item.quantity}</span>,
        },

        {
          key: '4',
          component: (
            <span>{formatters.formatCurrency(item?.price?.unit_amount!)}</span>
          ),
        },
        {
          key: '5',
          component: (
            <div css={styles.amountWrapper}>
              <Badge color="default" style="outline" customCss={[styles.badge]}>
                prorated
              </Badge>
              {formatters.formatCurrency(item?.amount!)}
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
