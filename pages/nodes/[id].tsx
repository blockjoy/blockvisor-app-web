import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node/';

const Node = () => <NodeView />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default Node;
