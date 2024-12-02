import { useMemo } from 'react';
import { Discount } from '@modules/grpc/library/blockjoy/v1/org';
import { formatters } from '@shared/index';
import { styles } from './InvoiceTotal.styles';

export type InvoiceTotalProps = {
  total?: number;
  subtotal?: number;
  discounts?: Discount[];
};

export const InvoiceTotal = ({
  total,
  subtotal,
  discounts,
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
    ],
    [total, subtotal],
  );

  discounts?.forEach((discount) =>
    items.splice(1, 0, {
      title: `Discount (${discount.name!})`,
      data: `- ${formatters.formatCurrency(
        discount.amount?.amountMinorUnits!,
      )}`,
    }),
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
