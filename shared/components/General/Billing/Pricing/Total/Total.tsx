import { formatters } from '@shared/index';
import { styles } from './Total.styles';

type TotalProps = {
  total: number;
};

export const Total = ({ total }: TotalProps) => {
  return (
    <div css={styles.wrapper}>
      <p css={styles.title}>Total</p>
      <p css={styles.totalPrice}>{formatters.formatCurrency(total)}</p>
    </div>
  );
};
