import { PropsWithChildren } from 'react';
import { styles } from './PageHeader.styles';

export const PageHeader = ({ children }: PropsWithChildren) => (
  <h2 css={[styles.h2]}>{children}</h2>
);
