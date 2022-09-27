import React from 'react';
import { styles } from './PageSection.styles';
import { wrapper } from 'styles/wrapper.styles';

export const PageSection: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <section css={[styles.section]}>
    <div css={wrapper.main}>{children}</div>
  </section>
);
