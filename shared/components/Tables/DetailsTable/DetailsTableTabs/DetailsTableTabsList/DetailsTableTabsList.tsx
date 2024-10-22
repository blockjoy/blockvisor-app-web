import { PropsWithChildren } from 'react';
import { styles } from './DetailsTableTabsList.styles';

export const DetailsTableTabsList = ({ children }: PropsWithChildren) => (
  <ol css={styles.list}>{children}</ol>
);
