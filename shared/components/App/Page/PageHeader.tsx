import { FC, PropsWithChildren } from 'react';
import { styles } from './PageHeader.styles';

export const PageHeader: FC<PropsWithChildren> = ({ children }) => (
  <h2 css={[styles.h2]}>{children}</h2>
);
