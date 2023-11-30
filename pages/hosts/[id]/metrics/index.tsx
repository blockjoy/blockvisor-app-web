import { css } from '@emotion/react';
import { AppLayout } from '@modules/layout';
import { HostView, HostWrapper, HostViewTitle } from '@modules/host';
import { HostViewSidePanel } from '@modules/host/components/HostView/HostViewSidePanel/HostViewSidePanel';
import { breakpoints } from 'styles/variables.styles';

const styles = {
  wrapper: css`
    @media ${breakpoints.fromMed} {
      max-width: 400px;
    }
  `,
};

const Component = () => (
  <section css={styles.wrapper}>
    <HostViewSidePanel />
  </section>
);

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <HostWrapper title={<HostViewTitle />}>
        <HostView>{page}</HostView>
      </HostWrapper>
    </AppLayout>
  );
};

export default Component;
