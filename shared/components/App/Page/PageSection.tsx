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
  <div css={[wrapper.main]}>
    <section
      css={[
        styles.section,
        bottomBorder && styles.sectionBorder,
        !topPadding && styles.sectionNoTopPadding,
      ]}
    >
      {children}
    </section>
  </div>
);
