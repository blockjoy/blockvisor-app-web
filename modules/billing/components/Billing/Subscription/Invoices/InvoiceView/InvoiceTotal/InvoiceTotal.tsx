import { formatters } from '@shared/index';
import { useMemo } from 'react';
import { styles } from './InvoiceTotal.styles';

export type InvoiceTotalProps = {
  total: number;
  subtotal: number;
  amountDue: number;
};

export const InvoiceTotal = ({
  total,
  subtotal,
  amountDue,
}: InvoiceTotalProps) => {
  const items = useMemo(
    () => [
      {
        title: 'Subtotal',
        data: formatters.formatCurrency(subtotal!),
      },
      {
        title: 'Total',
        data: formatters.formatCurrency(total!),
      },
      {
        title: 'Amount due',
        data: formatters.formatCurrency(amountDue!),
      },
    ],
    [total, subtotal, amountDue],
  );

  return (
    <div css={styles.wrapper}>
      {items.map((item) => (
        <div key={item.title} css={styles.item}>
          <span css={styles.itemTitle}>{item.title}</span>
          <span css={styles.itemData}>{item.data}</span>
        </div>
      ))}
    </div>
  );
};
