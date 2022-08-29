import { FC } from 'react';
import { grid } from 'styles/grid.styles';
import { styles } from './LayoutSingleColumn.styles';

export const LayoutSingleColumn: FC = ({}) => {
  return (
    <section css={[grid.spacing, styles.base]}>
      <slot />
    </section>
  );
};
