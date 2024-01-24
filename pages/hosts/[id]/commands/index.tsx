import { AppLayout } from '@modules/layout';
import {
  HostView,
  HostCommands,
  HostWrapper,
  HostViewTitle,
} from '@modules/host';

const Component = () => <HostCommands />;

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
