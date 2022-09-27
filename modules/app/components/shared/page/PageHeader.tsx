import React from 'react';
import { styles } from './PageHeader.styles';

export const PageHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <header css={[styles.header]}>{children}</header>
);
