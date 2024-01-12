import { css } from '@emotion/react';
import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewSidePanel } from '@modules/node';
import { breakpoints } from 'styles/variables.styles';

const styles = {
  wrapper: css`
    @media ${breakpoints.fromMed} {
      min-width: 500px;
      max-width: 50%;
    }

    @media ${breakpoints.fromLrg} {
      min-width: 500px;
      max-width: 600px;
    }
  `,
};

const Component = () => (
  <section css={styles.wrapper}>
    <NodeViewSidePanel />
  </section>
);

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
