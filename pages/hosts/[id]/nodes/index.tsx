import { AppLayout } from '@modules/layout';
import {
  HostView,
  HostWrapper,
  HostViewNodes,
  HostViewTitle,
} from '@modules/host';

const Component = () => <HostViewNodes />;

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
