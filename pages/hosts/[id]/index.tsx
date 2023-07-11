import { AppLayout } from '@modules/layout';
import { HostView, HostViewDetails } from '@modules/host';

const Host = () => <HostViewDetails />;

Host.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <HostView>{page}</HostView>
    </AppLayout>
  );
};

export default Host;
