import { ReactNode } from 'react';
import { styles } from './Badge.styles';

type Props = {
  children?: ReactNode;
};
export function Badge({ children }: Props) {
  return <span css={styles.badge}>{children}</span>;
}
