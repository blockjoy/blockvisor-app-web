import React from 'react';
import { styles } from './PageSection.styles';
import { wrapper } from 'styles/wrapper.styles';

type Props = {
  bottomBorder?: boolean;
};
export const PageSection: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  bottomBorder = true,
}) => (
  <section css={[styles.section, bottomBorder && styles.sectionBorder]}>
    <div css={wrapper.main}>{children}</div>
  </section>
);
