import { AppLayout } from '@modules/layout';
import { HostView, HostViewDetails } from '@modules/host';

const Component = () => <HostViewDetails />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <HostView>{page}</HostView>
    </AppLayout>
  );
};

export default Component;
