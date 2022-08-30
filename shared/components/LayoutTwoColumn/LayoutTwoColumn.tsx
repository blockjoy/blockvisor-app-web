import { FC } from 'react';
import { grid } from 'styles/grid.styles';
import { SkipToContent } from '..';
import { styles } from './LayoutTwoColumn.styles';

export const LayoutTwoColumn: FC = ({}) => {
  return (
    <div css={styles.base}>
      <aside css={[styles.sidebar, grid.spacing]}>
        <SkipToContent target="main-content">
          Skip to the next section
        </SkipToContent>
        <slot name="sidebar" />
      </aside>

      <section id="main-content" tabIndex={0} css={styles.content}>
        <slot />
      </section>
    </div>
  );
};
