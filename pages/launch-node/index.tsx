import { AppLayout } from '@modules/layout';
import { NodeLauncherWithGuard } from '@modules/node';

const Node = () => <NodeLauncherWithGuard />;

Node.getLayout = function getLayout(page: any) {
  return (
    <AppLayout pageTitle="Launch Node" isPageFlex>
      {page}
    </AppLayout>
  );
};

export default Node;
