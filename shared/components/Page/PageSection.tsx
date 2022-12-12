import React from 'react';
import { styles } from './PageSection.styles';
import { wrapper } from 'styles/wrapper.styles';

type Props = {
  bottomBorder?: boolean;
  topPadding?: boolean;
};
export const PageSection: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  bottomBorder = true,
  topPadding = true,
}) => (
  <section
    css={[
      styles.section,
      bottomBorder && styles.sectionBorder,
      !topPadding && styles.sectionNoTopPadding,
    ]}
  >
    <div css={wrapper.main}>{children}</div>
  </section>
);
