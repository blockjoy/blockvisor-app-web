import { AppLayout } from '@modules/layout';
import { HostView, HostViewNodes } from '@modules/host';

const Component = () => <HostViewNodes />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <HostView>{page}</HostView>
    </AppLayout>
  );
};

export default Component;
