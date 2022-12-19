import { AppLayout } from '@modules/layout';
import { NodeLauncher } from '@modules/node/';

const Node = () => <NodeLauncher />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout isPageFlex>{page}</AppLayout>;
};

export default Node;
