import { FC, PropsWithChildren } from 'react';
import { styles } from './Badge.styles';

export const Badge: FC<PropsWithChildren> = ({ children }) => {
  return <span css={styles.badge}>{children}</span>;
};
