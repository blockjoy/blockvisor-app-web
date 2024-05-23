import { styles } from './DataRow.styles';

type Props = {
  label: React.ReactNode | string;
  children: React.ReactNode;
};

export const DataRow = ({ label, children }: Props) => {
  return (
    <tr css={styles.base}>
      <th css={[styles.column, styles.heading]}>{label}</th>
      <td css={styles.column}>{children}</td>
    </tr>
  );
};
