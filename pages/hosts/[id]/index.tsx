import { AppLayout } from '@modules/layout';
import { HostView, HostViewDashboard } from '@modules/host';

const Host = () => <HostViewDashboard />;

Host.getLayout = function getLayout() {
  return (
    <AppLayout isPageFlex>
      <HostView>
        <HostViewDashboard />
      </HostView>
    </AppLayout>
  );
};

export default Host;
