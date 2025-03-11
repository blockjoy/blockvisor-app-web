import { AppLayout } from '@modules/layout';
import { NodeLauncher } from '@modules/node-launcher';

const Component = () => <NodeLauncher />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout pageTitle="Node Launcher" isPageFlex>
      {page}
    </AppLayout>
  );
};

export default Component;
