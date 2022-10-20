import { FC } from 'react';
import { styles } from './DataRow.styles';

interface Props {
  label: string;
  children: React.ReactNode;
}

export const DataRow: FC<Props> = ({ label, children }) => {
  return (
    <tr css={styles.base}>
      <th css={[styles.column, styles.heading]}>{label}</th>
      <td css={styles.column}>{children}</td>
    </tr>
  );
};
